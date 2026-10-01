<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $staffRole = Role::findOrCreate('staff', 'web');
        $superAdminRole = Role::findOrCreate('super-admin', 'web');

        $staff = User::firstOrCreate(
            ['username' => 'staff'],
            [
                'name' => 'เจ้าหน้าที่ทดสอบระบบ',
                'password' => Hash::make('Staff@ServiceHub2026'),
                'is_active' => true,
            ]
        );
        if (! $staff->hasRole('staff')) {
            $staff->assignRole($staffRole);
        }

        $admin = User::firstOrCreate(
            ['username' => 'admin'],
            [
                'name' => 'ผู้ดูแลระบบฝ่ายบริการ',
                'password' => Hash::make('Admin@ServiceHub2026'),
                'is_active' => true,
            ]
        );
        if (! $admin->hasRole('super-admin')) {
            $admin->assignRole($superAdminRole);
        }
    }
}
