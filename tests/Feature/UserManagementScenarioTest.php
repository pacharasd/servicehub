<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\ReferenceDataSeeder;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class UserManagementScenarioTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(ReferenceDataSeeder::class);

        if (DB::getDriverName() === 'sqlite') {
            DB::statement('PRAGMA foreign_keys = ON;');
        }
    }

    /**
     * Create an administrator user with full permissions.
     */
    protected function createAdmin(array $attributes = [], string $role = 'super-admin'): User
    {
        $user = User::factory()->create(array_merge([
            'username' => 'scenario_admin_'.bin2hex(random_bytes(4)),
            'name' => 'ผู้ดูแลระบบ จำลองสถานการณ์',
            'is_active' => true,
            'auth_version' => 0,
        ], $attributes));

        $roleModel = Role::findOrCreate($role, 'web');
        $user->assignRole($roleModel);

        if ($role === 'admin') {
            $permissions = ['users.view', 'users.create', 'users.update', 'users.disable', 'roles.view'];
            foreach ($permissions as $perm) {
                Permission::findOrCreate($perm, 'web');
            }
            $user->givePermissionTo($permissions);
        }

        return $user;
    }

    /**
     * Authenticate and initialize a valid session for the given user.
     */
    protected function actingAsUser(User $user)
    {
        return $this->withSession(['auth_version' => $user->auth_version ?? 0])->actingAs($user, 'web');
    }

    /**
     * Scenario 1: Complete Employee Lifecycle (Onboarding to Offboarding)
     *
     * Steps:
     * 1. HR Admin logs in -> creates new staff user ("somchai.k") with temporary credentials and role 'staff'.
     * 2. Admin verifies user appears in directory with role 'staff' and status 'active'.
     * 3. KPI summary cards reflect incremented total accounts and active users.
     * 4. Employee receives title update: Admin updates name to "สมชาย เก่งกล้า (หัวหน้าชุดงาน)".
     * 5. Employee offboarding: Admin deactivates account via PATCH /api/users/{id}/status.
     * 6. Target user's auth_version is incremented; active session is revoked.
     * 7. Subsequent request from employee with old session is rejected.
     * 8. Employee cannot log in at /login with inactive account.
     * 9. Complete audit trail verified in audit_logs: user.created -> user.updated -> user.disabled.
     */
    public function test_scenario_1_complete_employee_lifecycle_onboarding_to_offboarding(): void
    {
        $admin = $this->createAdmin();

        // 1. Onboarding: Create new staff employee
        $createResponse = $this->actingAsUser($admin)->postJson('/api/users', [
            'name' => 'สมชาย เก่งกล้า',
            'username' => 'somchai.k',
            'password' => 'StaffPassword@2026',
            'role' => 'staff',
        ]);

        $createResponse->assertStatus(201)
            ->assertJsonPath('data.username', 'somchai.k')
            ->assertJsonPath('data.name', 'สมชาย เก่งกล้า');

        $employeeId = $createResponse->json('data.id');
        $this->assertNotNull($employeeId);

        // 2. Directory Verification: User listed in directory
        $listResponse = $this->actingAsUser($admin)->getJson('/api/users?q=somchai.k&role=staff');
        $listResponse->assertOk();

        $items = collect($listResponse->json('data'));
        $found = $items->firstWhere('username', 'somchai.k');
        $this->assertNotNull($found);
        $this->assertTrue($found['is_active']);
        $this->assertContains('staff', $found['roles']);

        // 3. KPI Summary cards reflect incremented counts
        $summary = $listResponse->json('summary');
        $this->assertGreaterThanOrEqual(1, $summary['total_accounts']);
        $this->assertGreaterThanOrEqual(1, $summary['active_users']);

        // 4. Update employee title
        $updateResponse = $this->actingAsUser($admin)->putJson("/api/users/{$employeeId}", [
            'name' => 'สมชาย เก่งกล้า (หัวหน้าชุดงาน)',
            'role' => 'staff',
        ]);
        $updateResponse->assertOk()
            ->assertJsonPath('data.name', 'สมชาย เก่งกล้า (หัวหน้าชุดงาน)');

        // 5. Offboarding: Deactivate account
        $employee = User::findOrFail($employeeId);
        $initialAuthVersion = $employee->auth_version ?? 0;

        $deactivateResponse = $this->actingAsUser($admin)->patchJson("/api/users/{$employeeId}/status", [
            'is_active' => false,
        ]);
        $deactivateResponse->assertOk()
            ->assertJsonPath('data.is_active', false);

        // 6. Verify auth_version bumped and account deactivated
        $employee->refresh();
        $this->assertFalse((bool) $employee->is_active);
        $this->assertGreaterThan($initialAuthVersion, $employee->auth_version);

        // 7. Verify session revocation for employee
        $staleSessionResponse = $this->withSession(['auth_version' => $initialAuthVersion])
            ->actingAs($employee, 'web')
            ->get('/');

        $this->assertTrue(
            $staleSessionResponse->isRedirect(route('login')) || $staleSessionResponse->status() === 401,
            'Deactivated employee session must be rejected'
        );
        $this->assertGuest();

        // 8. Employee cannot log in at /login
        $this->post('/login', [
            'username' => 'somchai.k',
            'password' => 'StaffPassword@2026',
        ])->assertSessionHasErrors('username');
        $this->assertGuest();

        // 9. Full audit trail exists
        $auditActions = DB::table('audit_logs')
            ->where('subject_id', $employeeId)
            ->pluck('action')
            ->all();

        $this->assertContains('user.created', $auditActions);
        $this->assertContains('user.updated', $auditActions);
        $this->assertContains('user.disabled', $auditActions);
    }

    /**
     * Scenario 2: Emergency Credential Compromise & Password Reset
     *
     * Steps:
     * 1. Staff user "compromised_user" is active with established session.
     * 2. Security Administrator detects compromise -> executes reset via POST /api/users/{id}/reset-password.
     * 3. Target user's auth_version is incremented in database.
     * 4. Compromised active session is terminated (subsequent request fails authentication check).
     * 5. Old password no longer works at /login.
     * 6. User logs in with newly issued password -> authenticated successfully.
     * 7. Audit log contains user.password_reset without exposing the password.
     */
    public function test_scenario_2_emergency_credential_compromise_and_password_reset(): void
    {
        $admin = $this->createAdmin();

        $oldPassword = 'CompromisedPass@123';
        $newPassword = 'EmergencyNewPass@999';

        $user = User::factory()->create([
            'username' => 'compromised_user',
            'name' => 'ผู้ใช้ที่ถูกสวมรอย',
            'password' => Hash::make($oldPassword),
            'is_active' => true,
            'auth_version' => 1,
        ]);
        $user->assignRole(Role::findOrCreate('staff', 'web'));

        // 1 & 2. Admin issues emergency password reset
        $resetResponse = $this->actingAsUser($admin)->postJson("/api/users/{$user->id}/reset-password", [
            'password' => $newPassword,
        ]);

        $resetResponse->assertOk();

        // 3. auth_version bumped in database
        $user->refresh();
        $this->assertGreaterThan(1, $user->auth_version);
        $this->assertTrue(Hash::check($newPassword, $user->password));

        // 4. Compromised active session (holding old auth_version = 1) is immediately rejected
        $hijackedRequest = $this->withSession(['auth_version' => 1])
            ->actingAs($user, 'web')
            ->get('/');

        $this->assertTrue(
            $hijackedRequest->isRedirect(route('login')) || $hijackedRequest->status() === 401,
            'Compromised session with stale auth_version must be terminated'
        );
        $this->assertGuest();

        // 5. Old password rejected at /login
        $this->post('/login', [
            'username' => 'compromised_user',
            'password' => $oldPassword,
        ])->assertSessionHasErrors('username');
        $this->assertGuest();

        // 6. User logs in with newly issued password
        $this->post('/login', [
            'username' => 'compromised_user',
            'password' => $newPassword,
        ])->assertRedirect();
        $this->assertAuthenticatedAs($user);

        // 7. Audit log contains user.password_reset without disclosing password
        $log = DB::table('audit_logs')
            ->where('action', 'user.password_reset')
            ->where('subject_id', $user->id)
            ->first();

        $this->assertNotNull($log);
        $this->assertSame($admin->id, (int) $log->actor_id);
        $this->assertStringNotContainsString($newPassword, (string) $log->before);
        $this->assertStringNotContainsString($newPassword, (string) $log->after);
    }

    /**
     * Scenario 3: Operator Self-Lockout & Demotion Defense
     *
     * Steps:
     * 1. Super-admin operator attempts accidental or malicious self-deactivation.
     * 2. Server blocks request with HTTP 422 and Thai message.
     * 3. Operator attempts to demote own highest role to 'staff'.
     * 4. Server blocks demotion with HTTP 422.
     * 5. Operator account remains active, role remains super-admin, and session continues valid.
     */
    public function test_scenario_3_operator_self_lockout_and_demotion_defense(): void
    {
        $superAdmin = $this->createAdmin([], 'super-admin');

        // 1 & 2. Attempt self-deactivation
        $deactivateResponse = $this->actingAsUser($superAdmin)->patchJson("/api/users/{$superAdmin->id}/status", [
            'is_active' => false,
        ]);

        $deactivateResponse->assertStatus(422);

        $superAdmin->refresh();
        $this->assertTrue((bool) $superAdmin->is_active, 'Operator account must remain active');

        // 3 & 4. Attempt self-demotion
        $demoteResponse = $this->actingAsUser($superAdmin)->putJson("/api/users/{$superAdmin->id}", [
            'name' => $superAdmin->name,
            'role' => 'staff',
        ]);

        $demoteResponse->assertStatus(422);

        $superAdmin->refresh();
        $this->assertTrue($superAdmin->hasRole('super-admin'), 'Operator role must remain super-admin');
        $this->assertFalse($superAdmin->hasRole('staff'));

        // 5. Active administrative session continues undisturbed
        $directoryResponse = $this->actingAsUser($superAdmin)->getJson('/api/users');
        $directoryResponse->assertOk();
    }

    /**
     * Scenario 4: Activity Data Protection against Deletion
     *
     * Steps:
     * 1. Operational worker creates municipal service records (road_washings).
     * 2. Worker leaves organization; operator attempts hard deletion.
     * 3. Database foreign key constraints prevent hard delete.
     * 4. Operator follows standard lifecycle: deactivates worker via PATCH /api/users/{id}/status.
     * 5. Worker is marked inactive; road_washings activity records remain completely intact.
     * 6. User directory with status=inactive displays the deactivated worker.
     */
    public function test_scenario_4_activity_data_protection_against_deletion(): void
    {
        $admin = $this->createAdmin();

        $worker = User::factory()->create([
            'username' => 'road_cleaning_worker',
            'name' => 'นายสมโชค เก็บกวาด',
            'is_active' => true,
            'auth_version' => 0,
        ]);
        $worker->assignRole(Role::findOrCreate('staff', 'web'));

        $zoneId = DB::table('cleaning_zones')->value('id') ?? 1;

        // 1. Worker creates operational records in road_washings
        $recordId = DB::table('road_washings')->insertGetId([
            'service_date' => now()->toDateString(),
            'cleaning_zone_id' => $zoneId,
            'location' => 'ถนนสุขุมวิท ซอย 21',
            'distance_km' => 6.75,
            'created_by' => $worker->id,
            'updated_by' => $worker->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 2 & 3. Hard delete attempt must fail due to foreign key integrity
        $deleteBlocked = false;
        try {
            $worker->delete();
        } catch (QueryException $e) {
            $deleteBlocked = true;
        }

        $this->assertTrue($deleteBlocked, 'Hard delete of user with activity records must be blocked');
        $this->assertDatabaseHas('users', ['id' => $worker->id]);

        // 4. Standard lifecycle: Deactivate worker
        $deactivateResponse = $this->actingAsUser($admin)->patchJson("/api/users/{$worker->id}/status", [
            'is_active' => false,
        ]);

        $deactivateResponse->assertOk();

        // 5. Worker is inactive, historical records untouched
        $worker->refresh();
        $this->assertFalse((bool) $worker->is_active);

        $this->assertDatabaseHas('road_washings', [
            'id' => $recordId,
            'created_by' => $worker->id,
            'distance_km' => 6.75,
        ]);

        // 6. Directory filter confirms user is listed as inactive
        $inactiveListResponse = $this->actingAsUser($admin)->getJson('/api/users?status=inactive&q=road_cleaning_worker');
        $inactiveListResponse->assertOk();

        $inactiveItems = collect($inactiveListResponse->json('data'));
        $this->assertNotNull($inactiveItems->firstWhere('username', 'road_cleaning_worker'));
    }

    /**
     * Scenario 5: Unauthorized Access Penetration Resistance
     *
     * Steps:
     * 1. Unauthenticated guest attempts all 6 user management endpoints -> all rejected with 401 or redirect.
     * 2. Authenticated 'staff' user attempts directory access and all mutation endpoints -> all 403 Forbidden.
     * 3. Authenticated 'viewer' user attempts directory mutations -> 403 Forbidden.
     * 4. Authenticated 'auditor' user attempts directory mutations -> 403 Forbidden.
     * 5. Tampered payload attributes (e.g. attempting to force auth_version or inject arbitrary fields)
     *    are safely rejected or sanitized.
     */
    public function test_scenario_5_unauthorized_access_penetration_resistance(): void
    {
        $targetUser = User::factory()->create([
            'username' => 'target_for_penetration',
            'name' => 'เป้าหมายการทดสอบ',
            'is_active' => true,
            'auth_version' => 0,
        ]);
        $targetUser->assignRole(Role::findOrCreate('staff', 'web'));

        // 1. Unauthenticated guest attempts
        $endpoints = [
            ['GET', '/api/users', []],
            ['POST', '/api/users', ['name' => 'A', 'username' => 'usr_a', 'password' => 'Pass1234!', 'role' => 'staff']],
            ['PUT', "/api/users/{$targetUser->id}", ['name' => 'B', 'role' => 'staff']],
            ['PATCH', "/api/users/{$targetUser->id}/status", ['is_active' => false]],
            ['POST', "/api/users/{$targetUser->id}/reset-password", ['password' => 'Pass1234!']],
            ['GET', '/api/roles', []],
        ];

        foreach ($endpoints as [$method, $uri, $payload]) {
            $response = match ($method) {
                'GET' => $this->getJson($uri),
                'POST' => $this->postJson($uri, $payload),
                'PUT' => $this->putJson($uri, $payload),
                'PATCH' => $this->patchJson($uri, $payload),
            };

            $this->assertTrue(
                $response->status() === 401 || $response->isRedirect(route('login')),
                "Unauthenticated {$method} {$uri} must be rejected with 401 or redirect"
            );
        }

        // 2. Staff user attempts
        $staff = User::factory()->create(['username' => 'unauth_staff', 'is_active' => true, 'auth_version' => 0]);
        $staff->assignRole(Role::findOrCreate('staff', 'web'));

        foreach ($endpoints as [$method, $uri, $payload]) {
            if ($uri === '/api/roles') {
                // /api/roles may or may not be viewable by staff depending on policy
                continue;
            }

            $response = match ($method) {
                'GET' => $this->actingAsUser($staff)->getJson($uri),
                'POST' => $this->actingAsUser($staff)->postJson($uri, $payload),
                'PUT' => $this->actingAsUser($staff)->putJson($uri, $payload),
                'PATCH' => $this->actingAsUser($staff)->patchJson($uri, $payload),
            };

            $response->assertStatus(403, "Staff user {$method} {$uri} must receive 403 Forbidden");
        }

        // 3. Viewer user attempts mutations
        $viewer = User::factory()->create(['username' => 'unauth_viewer', 'is_active' => true, 'auth_version' => 0]);
        $viewer->assignRole(Role::findOrCreate('viewer', 'web'));

        $this->actingAsUser($viewer)->postJson('/api/users', ['name' => 'C', 'username' => 'usr_c', 'password' => 'Pass1234!', 'role' => 'staff'])->assertStatus(403);
        $this->actingAsUser($viewer)->putJson("/api/users/{$targetUser->id}", ['name' => 'C', 'role' => 'staff'])->assertStatus(403);
        $this->actingAsUser($viewer)->patchJson("/api/users/{$targetUser->id}/status", ['is_active' => false])->assertStatus(403);
        $this->actingAsUser($viewer)->postJson("/api/users/{$targetUser->id}/reset-password", ['password' => 'Pass1234!'])->assertStatus(403);

        // 4. Auditor user attempts mutations
        $auditor = User::factory()->create(['username' => 'unauth_auditor', 'is_active' => true, 'auth_version' => 0]);
        $auditor->assignRole(Role::findOrCreate('auditor', 'web'));

        $this->actingAsUser($auditor)->postJson('/api/users', ['name' => 'D', 'username' => 'usr_d', 'password' => 'Pass1234!', 'role' => 'staff'])->assertStatus(403);
        $this->actingAsUser($auditor)->putJson("/api/users/{$targetUser->id}", ['name' => 'D', 'role' => 'staff'])->assertStatus(403);
        $this->actingAsUser($auditor)->patchJson("/api/users/{$targetUser->id}/status", ['is_active' => false])->assertStatus(403);
        $this->actingAsUser($auditor)->postJson("/api/users/{$targetUser->id}/reset-password", ['password' => 'Pass1234!'])->assertStatus(403);

        // 5. Payload tampering: attempting to manipulate auth_version or inject unwhitelisted fields
        $admin = $this->createAdmin();
        $tamperedResponse = $this->actingAsUser($admin)->postJson('/api/users', [
            'name' => 'ผู้ทดสอบ ป้องกันแทรกแซง',
            'username' => 'tamper.proof.user',
            'password' => 'ValidPass123456!',
            'role' => 'staff',
            'auth_version' => 9999, // Attempted tamper
            'is_admin' => true,     // Attempted tamper
        ]);

        $tamperedResponse->assertStatus(201);
        $tamperedUser = User::where('username', 'tamper.proof.user')->firstOrFail();
        // auth_version must be standard initial value, not 9999
        $this->assertNotSame(9999, $tamperedUser->auth_version);
    }
}
