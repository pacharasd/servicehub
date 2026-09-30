<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public const ROLE_METADATA = [
        'super-admin' => [
            'display_name' => 'ผู้ดูแลระบบสูงสุด',
            'label' => 'ผู้ดูแลระบบสูงสุด (Super Admin)',
            'description' => 'จัดการทุกระบบและสิทธิ์ทั้งหมด',
        ],
        'admin' => [
            'display_name' => 'ผู้ดูแลระบบ',
            'label' => 'ผู้ดูแลระบบ (Admin)',
            'description' => 'จัดการข้อมูลและผู้ใช้ตามสิทธิ์',
        ],
        'staff' => [
            'display_name' => 'เจ้าหน้าที่ปฏิบัติงาน',
            'label' => 'เจ้าหน้าที่ปฏิบัติงาน (Staff)',
            'description' => 'บันทึกและแก้ไขข้อมูลส่วนบริการ',
        ],
        'viewer' => [
            'display_name' => 'ผู้ดูข้อมูล',
            'label' => 'ผู้ดูข้อมูล (Viewer)',
            'description' => 'เข้าดูข้อมูลและสรุปภาพรวมเท่านั้น',
        ],
        'auditor' => [
            'display_name' => 'ผู้ตรวจสอบ',
            'label' => 'ผู้ตรวจสอบ (Auditor)',
            'description' => 'ตรวจสอบข้อมูลและ Audit Log',
        ],
    ];

    /**
     * Display a listing of available system roles.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        if (! $user || (! $user->hasRole('super-admin') && ! $user->hasRole('admin') && ! $user->can('roles.view') && ! $user->can('users.view'))) {
            abort(403, 'ไม่มีสิทธิ์เข้าถึงรายการบทบาทผู้ใช้งาน');
        }

        $roles = Role::where('guard_name', 'web')->orderBy('id')->get()->map(function ($role) {
            $meta = self::ROLE_METADATA[$role->name] ?? [];

            return [
                'id' => $role->id,
                'name' => $role->name,
                'label' => $meta['label'] ?? $role->name,
                'display_name' => $meta['display_name'] ?? $role->name,
                'description' => $meta['description'] ?? '',
            ];
        });

        return response()->json([
            'data' => $roles->values()->all(),
        ]);
    }
}
