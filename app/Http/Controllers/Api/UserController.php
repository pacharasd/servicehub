<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResetUserPasswordRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\ToggleUserStatusRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Services\AuditLogService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Display a paginated, searchable, filterable list of users with summary KPI metrics.
     */
    public function index(Request $request): JsonResponse
    {
        Gate::authorize('viewAny', User::class);

        $query = User::with('roles');

        // Search by name or username
        if ($searchTerm = trim((string) $request->input('q', ''))) {
            $escapedSearch = str_replace(['\\', '%', '_'], ['\\\\', '\\%', '\\_'], $searchTerm);
            $query->where(function ($q) use ($searchTerm, $escapedSearch) {
                $q->where('name', 'like', "%{$searchTerm}%")
                    ->orWhere('username', 'like', "%{$searchTerm}%")
                    ->orWhere('name', 'like', "%{$escapedSearch}%")
                    ->orWhere('username', 'like', "%{$escapedSearch}%");
            });
        }

        // Filter by role
        if ($role = $request->input('role')) {
            if ($role !== 'all') {
                $query->whereHas('roles', fn ($q) => $q->where('name', $role));
            }
        }

        // Filter by account status
        $status = $request->input('status', 'all');
        if ($status === 'active') {
            $query->where('is_active', true);
        } elseif ($status === 'inactive') {
            $query->where('is_active', false);
        }

        // Whitelisted sorting
        $sort = $request->input('sort', 'created_at');
        $direction = strtolower((string) $request->input('direction', 'desc')) === 'asc' ? 'asc' : 'desc';

        if ($sort === 'role') {
            $query->leftJoin('model_has_roles', function ($join) {
                $join->on('users.id', '=', 'model_has_roles.model_id')
                    ->where('model_has_roles.model_type', '=', User::class);
            })->leftJoin('roles', 'model_has_roles.role_id', '=', 'roles.id')
                ->select('users.*')
                ->orderBy('roles.name', $direction);
        } elseif (in_array($sort, ['name', 'username', 'created_at'], true)) {
            $query->orderBy("users.{$sort}", $direction);
        } else {
            $query->orderBy('users.created_at', 'desc');
        }

        // Pagination
        $page = (int) $request->input('page', 1);
        if ($page < 1) {
            $page = 1;
        }

        $perPage = (int) $request->input('per_page', 10);
        if ($perPage < 1) {
            $perPage = 10;
        } elseif ($perPage > 100) {
            $perPage = 100;
        }

        $users = $query->paginate(perPage: $perPage, page: $page);

        // Summary KPI Metrics
        $summary = [
            'total_accounts' => User::count(),
            'active_users' => User::where('is_active', true)->count(),
            'administrators' => User::role(['super-admin', 'admin'])->count(),
        ];

        return response()->json([
            'data' => $users->getCollection()->map(fn ($user) => $this->transformUser($user))->values()->all(),
            'meta' => [
                'total' => $users->total(),
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'per_page' => $users->perPage(),
            ],
            'summary' => $summary,
        ]);
    }

    /**
     * Create a new user with role assignment and audit trail.
     */
    public function store(StoreUserRequest $request): JsonResponse
    {
        return DB::transaction(function () use ($request) {
            $user = User::create([
                'name' => $request->name,
                'username' => $request->username,
                'password' => Hash::make($request->password),
                'is_active' => true,
            ]);

            $user->auth_version = 0;
            $user->save();

            $user->assignRole($request->role);
            $user->load('roles');

            AuditLogService::logUserCreated($user, $request->role, $request->user());

            return response()->json([
                'data' => $this->transformUser($user),
                'message' => 'สร้างบัญชีผู้ใช้งานเรียบร้อยแล้ว',
            ], 201);
        });
    }

    /**
     * Update user's name and role with safeguards.
     */
    public function update(UpdateUserRequest $request, User $user): JsonResponse
    {
        if ($user->id === $request->user()->id) {
            $actor = $request->user();
            $newRole = $request->input('role');
            if (($actor->hasRole('super-admin') && $newRole !== 'super-admin')
                || ($actor->hasRole('admin') && ! $actor->hasRole('super-admin') && $newRole !== 'admin')) {
                throw ValidationException::withMessages([
                    'role' => ['ไม่สามารถลดระดับสิทธิ์บัญชีของตนเองได้'],
                ]);
            }
        }

        return DB::transaction(function () use ($request, $user) {
            $user->load('roles');
            $beforeName = $user->name;
            $beforeRole = $user->roles->first()?->name;

            $user->name = $request->name;
            $user->save();

            $user->syncRoles([$request->role]);
            $user->load('roles');

            AuditLogService::logUserUpdated(
                $user,
                ['name' => $beforeName, 'role' => $beforeRole],
                ['name' => $user->name, 'role' => $request->role],
                $request->user()
            );

            return response()->json([
                'data' => $this->transformUser($user),
                'message' => 'แก้ไขข้อมูลผู้ใช้งานเรียบร้อยแล้ว',
            ]);
        });
    }

    /**
     * Toggle active status and bump auth_version for session invalidation.
     */
    public function toggleStatus(ToggleUserStatusRequest $request, User $user): JsonResponse
    {
        if ($user->id === $request->user()->id && ! $request->boolean('is_active')) {
            throw ValidationException::withMessages([
                'is_active' => ['ไม่สามารถระงับการใช้งานบัญชีของตนเองได้'],
            ]);
        }

        return DB::transaction(function () use ($request, $user) {
            $newStatus = $request->boolean('is_active');

            $user->is_active = $newStatus;
            $user->auth_version = (int) $user->auth_version + 1;
            $user->save();
            $user->load('roles');

            AuditLogService::logUserStatusToggled($user, $newStatus, $request->user());

            $message = $newStatus
                ? 'เปิดการใช้งานบัญชีผู้ใช้เรียบร้อยแล้ว'
                : 'ระงับการใช้งานบัญชีผู้ใช้เรียบร้อยแล้ว';

            return response()->json([
                'data' => $this->transformUser($user),
                'message' => $message,
            ]);
        });
    }

    /**
     * Administrative password reset with auth_version bump.
     */
    public function resetPassword(ResetUserPasswordRequest $request, User $user): JsonResponse
    {
        return DB::transaction(function () use ($request, $user) {
            $user->password = Hash::make($request->password);
            $user->auth_version = (int) $user->auth_version + 1;
            $user->save();
            $user->load('roles');

            AuditLogService::logUserPasswordReset($user, $request->user());

            return response()->json([
                'data' => $this->transformUser($user),
                'message' => 'รีเซ็ตรหัสผ่านเรียบร้อยแล้ว เซสชันเดิมของผู้ใช้จะถูกยกเลิกทันที',
            ]);
        });
    }

    /**
     * Transform a User model into the standard API DTO payload.
     *
     * @return array<string, mixed>
     */
    private function transformUser(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'username' => $user->username,
            'email' => $user->email,
            'roles' => $user->roles->pluck('name')->values()->all(),
            'is_active' => (bool) $user->is_active,
            'auth_version' => (int) $user->auth_version,
            'created_at' => $user->created_at?->toIso8601String(),
            'updated_at' => $user->updated_at?->toIso8601String(),
        ];
    }
}
