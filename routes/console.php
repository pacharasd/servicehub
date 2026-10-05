<?php

use App\Models\User;
use Database\Seeders\ReferenceDataSeeder;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('servicehub:admin:create', function () {
    if (User::role('super-admin')->exists()) {
        $this->error('A super-admin already exists.');

        return 1;
    }

    $username = mb_strtolower(trim((string) $this->ask('Username')));
    $name = trim((string) $this->ask('Display name'));
    $password = (string) $this->secret('Password (at least 15 characters)');
    $confirmation = (string) $this->secret('Confirm password');
    if (! preg_match('/^[a-z0-9._-]{3,100}$/', $username) || $name === ''
        || mb_strlen($password) < 15 || mb_strlen($password) > 128
        || ! hash_equals($password, $confirmation) || User::where('username', $username)->exists()) {
        $this->error('Invalid username, display name, or password. No account was created.');

        return 1;
    }

    DB::transaction(function () use ($username, $name, $password) {
        $user = User::create([
            'username' => $username,
            'name' => $name,
            'password' => Hash::make($password),
            'is_active' => true,
        ]);
        $user->assignRole(Role::findByName('super-admin', 'web'));
        DB::table('audit_logs')->insert([
            'actor_id' => null, 'action' => 'auth.admin_created',
            'subject_type' => 'user', 'subject_id' => $user->id, 'created_at' => now(),
        ]);
    });

    $this->info('Super-admin created. Sign in with the username and password.');

    return 0;
})->purpose('Create the first super-admin interactively');

Artisan::command('servicehub:admin:recover {username}', function () {
    $user = User::where('username', mb_strtolower((string) $this->argument('username')))->first();
    if (! $user || ! $user->hasAnyRole(['super-admin', 'admin'])) {
        $this->error('Administrator account not found.');

        return 1;
    }

    $password = (string) $this->secret('New password (at least 15 characters)');
    $confirmation = (string) $this->secret('Confirm password');
    if (mb_strlen($password) < 15 || mb_strlen($password) > 128 || ! hash_equals($password, $confirmation)) {
        $this->error('Password was not changed.');

        return 1;
    }

    DB::transaction(function () use ($user, $password) {
        $user->forceFill([
            'password' => Hash::make($password),
            'auth_version' => $user->auth_version + 1,
        ])->save();
        DB::table('audit_logs')->insert([
            'actor_id' => null, 'action' => 'auth.admin_recovered',
            'subject_type' => 'user', 'subject_id' => $user->id, 'created_at' => now(),
        ]);
    });

    $this->info('Credentials reset. Existing sessions will be rejected on their next request.');

    return 0;
})->purpose('Reset an administrator password with local console access');

Artisan::command('servicehub:permissions:sync', function () {
    (new ReferenceDataSeeder)->run();
    $this->info('All system permissions, roles, reference data, and caches have been synced successfully.');

    return 0;
})->purpose('Synchronize all system permissions, roles, and reference catalogs');
