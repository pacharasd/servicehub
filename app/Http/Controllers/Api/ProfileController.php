<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\AuditLogService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    /**
     * Display the authenticated user's profile.
     */
    public function show(Request $request): JsonResponse
    {
        $user = $request->user()->load('roles');

        return response()->json([
            'data' => $this->transformUser($user),
        ]);
    }

    /**
     * Update the authenticated user's display name.
     */
    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ], [
            'name.required' => 'กรุณาระบุชื่อ-นามสกุล',
            'name.string' => 'ชื่อ-นามสกุลต้องเป็นข้อความ',
            'name.max' => 'ชื่อ-นามสกุลต้องมีความยาวไม่เกิน 255 ตัวอักษร',
        ]);

        $user = $request->user();
        $before = ['name' => $user->name];

        $user->name = trim($validated['name']);
        $user->save();
        $user->load('roles');

        AuditLogService::logProfileUpdated($user, $before, ['name' => $user->name]);

        return response()->json([
            'data' => $this->transformUser($user),
            'message' => 'บันทึกข้อมูลชื่อเรียบร้อยแล้ว',
        ]);
    }

    /**
     * Update the authenticated user's own password with selective session invalidation.
     */
    public function updatePassword(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'string', 'current_password'],
            'password' => ['required', 'string', 'min:15', 'max:255', 'confirmed', 'different:current_password'],
        ], [
            'current_password.required' => 'กรุณาระบุรหัสผ่านปัจจุบัน',
            'current_password.current_password' => 'รหัสผ่านปัจจุบันไม่ถูกต้อง',
            'password.required' => 'กรุณาระบุรหัสผ่านใหม่',
            'password.min' => 'รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 15 ตัวอักษร',
            'password.max' => 'รหัสผ่านใหม่ต้องมีความยาวไม่เกิน 255 ตัวอักษร',
            'password.confirmed' => 'รหัสผ่านยืนยันไม่ตรงกับรหัสผ่านใหม่',
            'password.different' => 'รหัสผ่านใหม่ต้องไม่ซ้ำกับรหัสผ่านปัจจุบัน',
        ]);

        return DB::transaction(function () use ($request, $validated) {
            $user = $request->user();

            $user->password = Hash::make($validated['password']);
            $user->auth_version = (int) $user->auth_version + 1;
            $user->save();

            // Synchronize the current session's auth_version so the current device stays logged in
            $request->session()->put('auth_version', $user->auth_version);

            AuditLogService::logProfilePasswordChanged($user);

            return response()->json([
                'data' => $this->transformUser($user->load('roles')),
                'message' => 'เปลี่ยนรหัสผ่านเรียบร้อยแล้ว เซสชันในอุปกรณ์อื่นถูกยกเลิกแล้ว',
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
