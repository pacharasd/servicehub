<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class ReferenceDataSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        $zones = ['เขต 1', 'เขต 2', 'เขต 3', 'เขต 4', 'เขต 5', 'เขต 6'];
        foreach ($zones as $index => $name) {
            DB::table('cleaning_zones')->updateOrInsert(
                ['code' => sprintf('ZONE-%03d', $index + 1)],
                ['name' => $name, 'updated_at' => $now, 'created_at' => $now],
            );
        }

        $types = ['ขยะทั่วไป', 'ขยะเปียก/อินทรีย์', 'ขยะรีไซเคิล', 'ขยะอันตราย', 'ขยะติดเชื้อ'];
        foreach ($types as $index => $name) {
            DB::table('waste_types')->updateOrInsert(
                ['code' => sprintf('WASTE-%03d', $index + 1)],
                ['name' => $name, 'updated_at' => $now, 'created_at' => $now],
            );
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $modules = [
            'road-washings', 'waterway-cleanings', 'road-sweepings',
            'outsourced-cleanings', 'waste-collections', 'drain-cleanings',
            'septic-pumpings', 'septic-treatments', 'waste-management-projects',
            'cleaning-zones', 'waste-types',
        ];

        foreach ($modules as $module) {
            foreach (['view', 'create', 'update', 'delete', 'export'] as $action) {
                Permission::findOrCreate("$module.$action", 'web');
            }
        }

        foreach (['users.view', 'users.create', 'users.update', 'users.disable', 'roles.view', 'roles.manage', 'audit-logs.view'] as $permission) {
            Permission::findOrCreate($permission, 'web');
        }

        foreach (['super-admin', 'admin', 'staff', 'viewer', 'auditor'] as $name) {
            Role::findOrCreate($name, 'web');
        }

        Role::findByName('super-admin', 'web')->syncPermissions(Permission::all());
        Role::findByName('admin', 'web')->syncPermissions(Permission::whereIn('name', array_merge(
            array_map(fn ($module) => "$module.view", $modules),
            array_map(fn ($module) => "$module.create", $modules),
            array_map(fn ($module) => "$module.update", $modules),
            array_map(fn ($module) => "$module.delete", $modules),
            array_map(fn ($module) => "$module.export", $modules),
            ['users.view', 'users.create', 'users.update', 'users.disable', 'roles.view']
        ))->get());
        Role::findByName('staff', 'web')->syncPermissions(Permission::whereIn('name', array_merge(
            array_map(fn ($module) => "$module.view", $modules),
            array_map(fn ($module) => "$module.create", $modules),
            array_map(fn ($module) => "$module.update", $modules),
        ))->get());
        Role::findByName('viewer', 'web')->syncPermissions(Permission::whereIn('name', array_map(fn ($module) => "$module.view", $modules))->get());
        Role::findByName('auditor', 'web')->syncPermissions(Permission::whereIn('name', array_merge(
            array_map(fn ($module) => "$module.view", $modules),
            ['audit-logs.view'],
        ))->get());

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
}
