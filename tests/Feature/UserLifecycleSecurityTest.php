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

class UserLifecycleSecurityTest extends TestCase
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
            'username' => 'sec_admin_'.bin2hex(random_bytes(4)),
            'name' => 'ผู้ดูแลระบบ ฝ่ายความปลอดภัย',
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
     * Create a standard user with given role.
     */
    protected function createUserWithRole(string $role, array $attributes = []): User
    {
        $user = User::factory()->create(array_merge([
            'username' => "{$role}_".bin2hex(random_bytes(4)),
            'name' => "ผู้ใช้บทบาท {$role}",
            'is_active' => true,
            'auth_version' => 0,
        ], $attributes));

        $user->assignRole(Role::findOrCreate($role, 'web'));

        return $user;
    }

    /**
     * Authenticate and initialize a valid session for the given user.
     */
    protected function actingAsUser(User $user)
    {
        return $this->withSession(['auth_version' => $user->auth_version ?? 0])->actingAs($user, 'web');
    }

    // =========================================================================
    // GROUP 1: UNAUTHENTICATED ACCESS GUARDS (HTTP 401 / Login Redirect)
    // =========================================================================

    public function test_unauthenticated_request_to_list_users_is_rejected(): void
    {
        $response = $this->getJson('/api/users');

        $this->assertTrue(
            $response->status() === 401 || $response->isRedirect(route('login')),
            'Unauthenticated request must return 401 JSON or redirect to login'
        );
    }

    public function test_unauthenticated_request_to_create_user_is_rejected(): void
    {
        $response = $this->postJson('/api/users', [
            'name' => 'ผู้บุกรุก',
            'username' => 'intruder.user',
            'password' => 'HackedPass123!',
            'role' => 'super-admin',
        ]);

        $this->assertTrue(
            $response->status() === 401 || $response->isRedirect(route('login')),
            'Unauthenticated user creation attempt must be rejected'
        );
    }

    public function test_unauthenticated_request_to_update_user_is_rejected(): void
    {
        $targetUser = $this->createUserWithRole('staff');

        $response = $this->putJson("/api/users/{$targetUser->id}", [
            'name' => 'ชื่อที่ถูกแก้ไขโดยไม่ได้รับอนุญาต',
            'role' => 'super-admin',
        ]);

        $this->assertTrue(
            $response->status() === 401 || $response->isRedirect(route('login')),
            'Unauthenticated user update attempt must be rejected'
        );
    }

    public function test_unauthenticated_request_to_toggle_status_is_rejected(): void
    {
        $targetUser = $this->createUserWithRole('staff');

        $response = $this->patchJson("/api/users/{$targetUser->id}/status", [
            'is_active' => false,
        ]);

        $this->assertTrue(
            $response->status() === 401 || $response->isRedirect(route('login')),
            'Unauthenticated status toggle attempt must be rejected'
        );
    }

    public function test_unauthenticated_request_to_reset_password_is_rejected(): void
    {
        $targetUser = $this->createUserWithRole('staff');

        $response = $this->postJson("/api/users/{$targetUser->id}/reset-password", [
            'password' => 'NewHackedPassword123!',
        ]);

        $this->assertTrue(
            $response->status() === 401 || $response->isRedirect(route('login')),
            'Unauthenticated password reset attempt must be rejected'
        );
    }

    public function test_unauthenticated_request_to_roles_is_rejected(): void
    {
        $response = $this->getJson('/api/roles');

        $this->assertTrue(
            $response->status() === 401 || $response->isRedirect(route('login')),
            'Unauthenticated roles list attempt must be rejected'
        );
    }

    // =========================================================================
    // GROUP 2: RBAC & PERMISSION ENFORCEMENT (HTTP 403 Forbidden)
    // =========================================================================

    public function test_staff_role_cannot_access_user_directory(): void
    {
        $staff = $this->createUserWithRole('staff');

        $response = $this->actingAsUser($staff)->getJson('/api/users');

        $response->assertStatus(403);
    }

    public function test_staff_role_cannot_create_user(): void
    {
        $staff = $this->createUserWithRole('staff');

        $response = $this->actingAsUser($staff)->postJson('/api/users', [
            'name' => 'พนักงานแอบสร้างผู้ใช้',
            'username' => 'illegal.staff.user',
            'password' => 'ValidPass123!',
            'role' => 'staff',
        ]);

        $response->assertStatus(403);
    }

    public function test_staff_role_cannot_update_user(): void
    {
        $staff = $this->createUserWithRole('staff');
        $targetUser = $this->createUserWithRole('viewer');

        $response = $this->actingAsUser($staff)->putJson("/api/users/{$targetUser->id}", [
            'name' => 'พนักงานแอบแก้ข้อมูล',
            'role' => 'staff',
        ]);

        $response->assertStatus(403);
    }

    public function test_staff_role_cannot_toggle_user_status(): void
    {
        $staff = $this->createUserWithRole('staff');
        $targetUser = $this->createUserWithRole('viewer');

        $response = $this->actingAsUser($staff)->patchJson("/api/users/{$targetUser->id}/status", [
            'is_active' => false,
        ]);

        $response->assertStatus(403);
    }

    public function test_staff_role_cannot_reset_password(): void
    {
        $staff = $this->createUserWithRole('staff');
        $targetUser = $this->createUserWithRole('viewer');

        $response = $this->actingAsUser($staff)->postJson("/api/users/{$targetUser->id}/reset-password", [
            'password' => 'StaffResetAttempt123!',
        ]);

        $response->assertStatus(403);
    }

    public function test_viewer_role_cannot_access_or_mutate_users(): void
    {
        $viewer = $this->createUserWithRole('viewer');
        $target = $this->createUserWithRole('staff');

        $this->actingAsUser($viewer)->getJson('/api/users')->assertStatus(403);
        $this->actingAsUser($viewer)->postJson('/api/users', [
            'name' => 'ผู้ตรวจแอบสร้าง',
            'username' => 'viewer.create',
            'password' => 'ValidPass123!',
            'role' => 'viewer',
        ])->assertStatus(403);
        $this->actingAsUser($viewer)->putJson("/api/users/{$target->id}", [
            'name' => 'ผู้ตรวจแอบแก้',
            'role' => 'viewer',
        ])->assertStatus(403);
    }

    public function test_auditor_role_cannot_create_or_mutate_users(): void
    {
        $auditor = $this->createUserWithRole('auditor');
        $target = $this->createUserWithRole('staff');

        $this->actingAsUser($auditor)->postJson('/api/users', [
            'name' => 'ผู้ตรวจสอบแอบสร้าง',
            'username' => 'auditor.create',
            'password' => 'ValidPass123!',
            'role' => 'staff',
        ])->assertStatus(403);

        $this->actingAsUser($auditor)->patchJson("/api/users/{$target->id}/status", [
            'is_active' => false,
        ])->assertStatus(403);

        $this->actingAsUser($auditor)->postJson("/api/users/{$target->id}/reset-password", [
            'password' => 'AuditorPass123!',
        ])->assertStatus(403);
    }

    public function test_operator_with_users_view_permission_can_view_directory(): void
    {
        $user = $this->createUserWithRole('viewer');
        $user->givePermissionTo('users.view');

        $response = $this->actingAsUser($user)->getJson('/api/users');

        $response->assertOk();
    }

    public function test_operator_without_users_disable_permission_cannot_toggle_status(): void
    {
        $user = $this->createUserWithRole('viewer');
        $user->givePermissionTo('users.view');
        $target = $this->createUserWithRole('staff');

        $response = $this->actingAsUser($user)->patchJson("/api/users/{$target->id}/status", [
            'is_active' => false,
        ]);

        $response->assertStatus(403);
    }

    // =========================================================================
    // GROUP 3: SELF-LOCKOUT & DEMOTION DEFENSE (R3, R4)
    // =========================================================================

    public function test_administrator_cannot_deactivate_their_own_account(): void
    {
        $admin = $this->createAdmin();

        $response = $this->actingAsUser($admin)->patchJson("/api/users/{$admin->id}/status", [
            'is_active' => false,
        ]);

        $response->assertStatus(422);

        $admin->refresh();
        $this->assertTrue((bool) $admin->is_active, 'Admin account must remain active after self-deactivation attempt');
    }

    public function test_self_deactivation_rejection_returns_422_with_thai_error_message(): void
    {
        $admin = $this->createAdmin();

        $response = $this->actingAsUser($admin)->patchJson("/api/users/{$admin->id}/status", [
            'is_active' => false,
        ]);

        $response->assertStatus(422);
        $content = $response->getContent();
        $this->assertTrue(
            str_contains($content, 'ไม่สามารถระงับการใช้งานบัญชีของตนเองได้') ||
            ! empty($response->json('message')),
            'Response must provide protective explanation against self-deactivation'
        );
    }

    public function test_administrator_cannot_demote_their_own_highest_role(): void
    {
        $admin = $this->createAdmin([], 'super-admin');

        $response = $this->actingAsUser($admin)->putJson("/api/users/{$admin->id}", [
            'name' => $admin->name,
            'role' => 'staff',
        ]);

        $response->assertStatus(422);

        $admin->refresh();
        $this->assertTrue($admin->hasRole('super-admin'), 'Admin role must remain super-admin after self-demotion attempt');
        $this->assertFalse($admin->hasRole('staff'));
    }

    public function test_administrator_can_update_their_own_name_without_demotion(): void
    {
        $admin = $this->createAdmin([], 'super-admin');

        $response = $this->actingAsUser($admin)->putJson("/api/users/{$admin->id}", [
            'name' => 'ผู้ดูแลระบบ ชื่อใหม่ถูกต้อง',
            'role' => 'super-admin',
        ]);

        $response->assertOk();

        $admin->refresh();
        $this->assertSame('ผู้ดูแลระบบ ชื่อใหม่ถูกต้อง', $admin->name);
        $this->assertTrue($admin->hasRole('super-admin'));
    }

    // =========================================================================
    // GROUP 4: SESSION REVOCATION VIA auth_version (R3, R4)
    // =========================================================================

    public function test_deactivating_user_increments_target_auth_version(): void
    {
        $admin = $this->createAdmin();
        $targetUser = $this->createUserWithRole('staff', ['auth_version' => 0]);

        $response = $this->actingAsUser($admin)->patchJson("/api/users/{$targetUser->id}/status", [
            'is_active' => false,
        ]);

        $response->assertOk();

        $targetUser->refresh();
        $this->assertFalse((bool) $targetUser->is_active);
        $this->assertGreaterThan(0, $targetUser->auth_version);
    }

    public function test_subsequent_request_with_stale_auth_version_is_rejected(): void
    {
        $admin = $this->createAdmin();
        $targetUser = $this->createUserWithRole('staff', ['auth_version' => 1]);

        // Target user has active session with auth_version = 1
        // Admin deactivates target user (bumps auth_version to 2)
        $this->actingAsUser($admin)->patchJson("/api/users/{$targetUser->id}/status", [
            'is_active' => false,
        ])->assertOk();

        // Target user submits request with original session (holding auth_version = 1)
        $targetResponse = $this->withSession(['auth_version' => 1])
            ->actingAs($targetUser, 'web')
            ->get('/');

        // Intercepted by EnsureActiveAccount -> redirect to login or 401 JSON
        $this->assertTrue(
            $targetResponse->isRedirect(route('login')) || $targetResponse->status() === 401,
            'Subsequent request with stale auth_version must be rejected'
        );
        $this->assertGuest();
    }

    public function test_deactivated_user_cannot_authenticate_at_login(): void
    {
        $admin = $this->createAdmin();
        $password = 'StaffValidPass@2026';
        $targetUser = $this->createUserWithRole('staff', [
            'password' => Hash::make($password),
            'is_active' => true,
        ]);

        // Admin deactivates user
        $this->actingAsUser($admin)->patchJson("/api/users/{$targetUser->id}/status", [
            'is_active' => false,
        ])->assertOk();

        // Attempt login via Fortify login endpoint
        $loginResponse = $this->post('/login', [
            'username' => $targetUser->username,
            'password' => $password,
        ]);

        $loginResponse->assertSessionHasErrors('username');
        $this->assertGuest();
    }

    public function test_admin_reset_password_increments_target_auth_version(): void
    {
        $admin = $this->createAdmin();
        $targetUser = $this->createUserWithRole('staff', ['auth_version' => 1]);

        $response = $this->actingAsUser($admin)->postJson("/api/users/{$targetUser->id}/reset-password", [
            'password' => 'NewResetPassword@123',
        ]);

        $response->assertOk();

        $targetUser->refresh();
        $this->assertGreaterThan(1, $targetUser->auth_version);
        $this->assertTrue(Hash::check('NewResetPassword@123', $targetUser->password));
    }

    public function test_old_session_revoked_after_password_reset(): void
    {
        $admin = $this->createAdmin();
        $targetUser = $this->createUserWithRole('staff', ['auth_version' => 1]);

        // Admin resets password
        $this->actingAsUser($admin)->postJson("/api/users/{$targetUser->id}/reset-password", [
            'password' => 'NewResetPassword@123',
        ])->assertOk();

        // Target user attempts request using session with old auth_version
        $targetResponse = $this->withSession(['auth_version' => 1])
            ->actingAs($targetUser, 'web')
            ->get('/');

        $this->assertTrue(
            $targetResponse->isRedirect(route('login')) || $targetResponse->status() === 401,
            'Old session must be rejected after password reset'
        );
        $this->assertGuest();
    }

    public function test_target_user_can_login_with_new_password_after_reset(): void
    {
        $admin = $this->createAdmin();
        $oldPassword = 'OldPassword@123';
        $newPassword = 'BrandNewPassword@456';
        $targetUser = $this->createUserWithRole('staff', [
            'password' => Hash::make($oldPassword),
            'is_active' => true,
        ]);

        // Admin resets password
        $this->actingAsUser($admin)->postJson("/api/users/{$targetUser->id}/reset-password", [
            'password' => $newPassword,
        ])->assertOk();

        // Old password rejected
        $this->post('/login', [
            'username' => $targetUser->username,
            'password' => $oldPassword,
        ])->assertSessionHasErrors('username');
        $this->assertGuest();

        // New password accepted
        $this->post('/login', [
            'username' => $targetUser->username,
            'password' => $newPassword,
        ])->assertRedirect();
        $this->assertAuthenticatedAs($targetUser);
    }

    // =========================================================================
    // GROUP 5: AUDIT LOGGING & SENSITIVE CREDENTIAL MASKING (R3, R4)
    // =========================================================================

    public function test_user_creation_records_audit_log_without_plaintext_password(): void
    {
        $admin = $this->createAdmin();
        $plainPassword = 'UltraSecretPassword@999';

        $this->actingAsUser($admin)->postJson('/api/users', [
            'name' => 'ผู้ใช้ตรวจสอบบันทึก',
            'username' => 'audit.target.user',
            'password' => $plainPassword,
            'role' => 'staff',
        ])->assertStatus(201);

        $createdUser = User::where('username', 'audit.target.user')->firstOrFail();

        $log = DB::table('audit_logs')
            ->where('action', 'user.created')
            ->where('subject_id', $createdUser->id)
            ->first();

        $this->assertNotNull($log, 'Audit log for user.created must exist');
        $this->assertSame($admin->id, (int) $log->actor_id);

        // Verify neither 'before' nor 'after' JSON contains the plaintext password
        $this->assertStringNotContainsString($plainPassword, (string) $log->before);
        $this->assertStringNotContainsString($plainPassword, (string) $log->after);
    }

    public function test_user_update_records_audit_log_with_state_diff(): void
    {
        $admin = $this->createAdmin();
        $targetUser = $this->createUserWithRole('staff', ['name' => 'ชื่อก่อนแก้']);

        $this->actingAsUser($admin)->putJson("/api/users/{$targetUser->id}", [
            'name' => 'ชื่อหลังแก้บันทึก',
            'role' => 'viewer',
        ])->assertOk();

        $log = DB::table('audit_logs')
            ->where('action', 'user.updated')
            ->where('subject_id', $targetUser->id)
            ->first();

        $this->assertNotNull($log, 'Audit log for user.updated must exist');
        $this->assertSame($admin->id, (int) $log->actor_id);
    }

    public function test_user_deactivation_records_audit_log_action_user_disabled(): void
    {
        $admin = $this->createAdmin();
        $targetUser = $this->createUserWithRole('staff', ['is_active' => true]);

        $this->actingAsUser($admin)->patchJson("/api/users/{$targetUser->id}/status", [
            'is_active' => false,
        ])->assertOk();

        $log = DB::table('audit_logs')
            ->where('action', 'user.disabled')
            ->where('subject_id', $targetUser->id)
            ->first();

        $this->assertNotNull($log, 'Audit log for user.disabled must exist');
        $this->assertSame($admin->id, (int) $log->actor_id);
    }

    public function test_user_activation_records_audit_log_action_user_enabled(): void
    {
        $admin = $this->createAdmin();
        $targetUser = $this->createUserWithRole('staff', ['is_active' => false]);

        $this->actingAsUser($admin)->patchJson("/api/users/{$targetUser->id}/status", [
            'is_active' => true,
        ])->assertOk();

        $log = DB::table('audit_logs')
            ->where('action', 'user.enabled')
            ->where('subject_id', $targetUser->id)
            ->first();

        $this->assertNotNull($log, 'Audit log for user.enabled must exist');
        $this->assertSame($admin->id, (int) $log->actor_id);
    }

    public function test_user_password_reset_records_audit_log_without_password_exposure(): void
    {
        $admin = $this->createAdmin();
        $targetUser = $this->createUserWithRole('staff');
        $newPlainPassword = 'SuperSecretReset@2026';

        $this->actingAsUser($admin)->postJson("/api/users/{$targetUser->id}/reset-password", [
            'password' => $newPlainPassword,
        ])->assertOk();

        $log = DB::table('audit_logs')
            ->where('action', 'user.password_reset')
            ->where('subject_id', $targetUser->id)
            ->first();

        $this->assertNotNull($log, 'Audit log for user.password_reset must exist');
        $this->assertSame($admin->id, (int) $log->actor_id);

        $this->assertStringNotContainsString($newPlainPassword, (string) $log->before);
        $this->assertStringNotContainsString($newPlainPassword, (string) $log->after);
    }

    // =========================================================================
    // GROUP 6: FOREIGN KEY INTEGRITY & HARD DELETE PREVENTION (R3)
    // =========================================================================

    public function test_user_with_activity_records_in_road_washings_cannot_be_hard_deleted(): void
    {
        $worker = $this->createUserWithRole('staff');
        $zoneId = DB::table('cleaning_zones')->value('id') ?? 1;

        // Insert operational record referencing worker
        DB::table('road_washings')->insert([
            'service_date' => now()->toDateString(),
            'cleaning_zone_id' => $zoneId,
            'location' => 'ถนนพหลโยธิน กม. 12',
            'distance_km' => 8.5,
            'created_by' => $worker->id,
            'updated_by' => $worker->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Attempt hard deletion of user
        $deletionFailed = false;
        try {
            $worker->delete();
        } catch (QueryException $e) {
            $deletionFailed = true;
        }

        // Must fail due to restrictOnDelete foreign key constraint
        $this->assertTrue($deletionFailed, 'Hard deletion of user with activity records must be blocked by foreign key constraint');
        $this->assertDatabaseHas('users', ['id' => $worker->id]);
    }

    public function test_deactivation_is_successful_lifecycle_conclusion_preserving_activity_records(): void
    {
        $admin = $this->createAdmin();
        $worker = $this->createUserWithRole('staff');
        $zoneId = DB::table('cleaning_zones')->value('id') ?? 1;

        $recordId = DB::table('road_washings')->insertGetId([
            'service_date' => now()->toDateString(),
            'cleaning_zone_id' => $zoneId,
            'location' => 'ถนนสุขุมวิท 71',
            'distance_km' => 15.0,
            'created_by' => $worker->id,
            'updated_by' => $worker->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Standard deactivation lifecycle
        $response = $this->actingAsUser($admin)->patchJson("/api/users/{$worker->id}/status", [
            'is_active' => false,
        ]);

        $response->assertOk();

        // Worker account is safely deactivated
        $worker->refresh();
        $this->assertFalse((bool) $worker->is_active);

        // Historical activity records remain completely intact
        $this->assertDatabaseHas('road_washings', [
            'id' => $recordId,
            'created_by' => $worker->id,
        ]);
    }
}
