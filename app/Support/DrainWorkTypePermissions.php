<?php

namespace App\Support;

use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class DrainWorkTypePermissions
{
    public static function install(): void
    {
        foreach (['view', 'create', 'update', 'delete', 'export'] as $action) {
            Permission::findOrCreate('drain-work-types.'.$action, 'web');
        }
        foreach (['super-admin', 'admin', 'staff', 'viewer', 'auditor'] as $name) {
            $actions = match ($name) {
                'super-admin', 'admin' => ['view', 'create', 'update', 'delete', 'export'],
                'staff' => ['view', 'create', 'update'],
                default => ['view'],
            };
            $role = Role::findOrCreate($name, 'web');
            $role->givePermissionTo(array_map(fn ($action) => 'drain-work-types.'.$action, $actions));
        }
        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
}
