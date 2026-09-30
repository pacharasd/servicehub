<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\ReferenceDataSeeder;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class SecurityChallengerM1Test extends TestCase
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

    protected function createSuperAdmin(): User
    {
        $user = User::factory()->create([
            'username' => 'sadmin_'.bin2hex(random_bytes(4)),
            'name' => 'ซูเปอร์แอดมิน สูงสุด',
            'is_active' => true,
            'auth_version' => 0,
        ]);
        $user->assignRole(Role::findOrCreate('super-admin', 'web'));

        return $user;
    }

    protected function createAdmin(): User
    {
        $user = User::factory()->create([
            'username' => 'admin_'.bin2hex(random_bytes(4)),
            'name' => 'ผู้ดูแลระบบ ระดับกลาง',
            'is_active' => true,
            'auth_version' => 0,
        ]);
        $user->assignRole(Role::findOrCreate('admin', 'web'));

        $permissions = ['users.view', 'users.create', 'users.update', 'users.disable', 'roles.view'];
        foreach ($permissions as $perm) {
            Permission::findOrCreate($perm, 'web');
        }
        $user->givePermissionTo($permissions);

        return $user;
    }

    protected function createStaff(): User
    {
        $user = User::factory()->create([
            'username' => 'staff_'.bin2hex(random_bytes(4)),
            'name' => 'เจ้าหน้าที่ ปฏิบัติการ',
            'is_active' => true,
            'auth_version' => 0,
        ]);
        $user->assignRole(Role::findOrCreate('staff', 'web'));

        return $user;
    }

    protected function actingAsUser(User $user)
    {
        return $this->withSession(['auth_version' => $user->auth_version ?? 0])->actingAs($user, 'web');
    }

    // =========================================================================
    // 1. PRIVILEGE ESCALATION PROBES
    // =========================================================================

    public function test_admin_cannot_create_super_admin(): void
    {
        $admin = $this->createAdmin();

        $response = $this->actingAsUser($admin)->postJson('/api/users', [
            'name' => 'แอบสร้างซูเปอร์แอดมิน',
            'username' => 'escalated.superadmin',
            'password' => 'Password123!',
            'role' => 'super-admin',
        ]);

        $response->assertStatus(403);
        $this->assertDatabaseMissing('users', ['username' => 'escalated.superadmin']);
    }

    public function test_admin_cannot_promote_existing_user_to_super_admin(): void
    {
        $admin = $this->createAdmin();
        $staff = $this->createStaff();

        $response = $this->actingAsUser($admin)->putJson("/api/users/{$staff->id}", [
            'name' => $staff->name,
            'role' => 'super-admin',
        ]);

        $response->assertStatus(403);
        $staff->refresh();
        $this->assertFalse($staff->hasRole('super-admin'));
        $this->assertTrue($staff->hasRole('staff'));
    }

    public function test_admin_cannot_promote_self_to_super_admin(): void
    {
        $admin = $this->createAdmin();

        $response = $this->actingAsUser($admin)->putJson("/api/users/{$admin->id}", [
            'name' => $admin->name,
            'role' => 'super-admin',
        ]);

        $response->assertStatus(403);
        $admin->refresh();
        $this->assertFalse($admin->hasRole('super-admin'));
        $this->assertTrue($admin->hasRole('admin'));
    }

    public function test_admin_cannot_update_super_admin_account(): void
    {
        $admin = $this->createAdmin();
        $superAdmin = $this->createSuperAdmin();

        $response = $this->actingAsUser($admin)->putJson("/api/users/{$superAdmin->id}", [
            'name' => 'แอดมินแอบเปลี่ยนชื่อซูเปอร์แอดมิน',
            'role' => 'admin',
        ]);

        $response->assertStatus(403);
        $superAdmin->refresh();
        $this->assertNotSame('แอดมินแอบเปลี่ยนชื่อซูเปอร์แอดมิน', $superAdmin->name);
        $this->assertTrue($superAdmin->hasRole('super-admin'));
    }

    public function test_admin_cannot_deactivate_super_admin_account(): void
    {
        $admin = $this->createAdmin();
        $superAdmin = $this->createSuperAdmin();

        $response = $this->actingAsUser($admin)->patchJson("/api/users/{$superAdmin->id}/status", [
            'is_active' => false,
        ]);

        $response->assertStatus(403);
        $superAdmin->refresh();
        $this->assertTrue((bool) $superAdmin->is_active);
    }

    public function test_admin_cannot_reset_password_of_super_admin(): void
    {
        $admin = $this->createAdmin();
        $superAdmin = $this->createSuperAdmin();

        $response = $this->actingAsUser($admin)->postJson("/api/users/{$superAdmin->id}/reset-password", [
            'password' => 'HackedSuperAdmin123!',
        ]);

        $response->assertStatus(403);
    }

    // =========================================================================
    // 2. SELF-LOCKOUT & SELF-DEMOTION ADVERSARIAL PROBES
    // =========================================================================

    public function test_super_admin_cannot_demote_self_to_admin(): void
    {
        $superAdmin = $this->createSuperAdmin();

        $response = $this->actingAsUser($superAdmin)->putJson("/api/users/{$superAdmin->id}", [
            'name' => $superAdmin->name,
            'role' => 'admin',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['role']);
        $this->assertSame(
            'ไม่สามารถลดระดับสิทธิ์บัญชีของตนเองได้',
            $response->json('errors.role.0')
        );

        $superAdmin->refresh();
        $this->assertTrue($superAdmin->hasRole('super-admin'));
    }

    public function test_admin_cannot_demote_self_to_staff_or_viewer(): void
    {
        $admin = $this->createAdmin();

        foreach (['staff', 'viewer', 'auditor'] as $demotedRole) {
            $response = $this->actingAsUser($admin)->putJson("/api/users/{$admin->id}", [
                'name' => $admin->name,
                'role' => $demotedRole,
            ]);

            $response->assertStatus(422);
            $response->assertJsonValidationErrors(['role']);
            $this->assertSame(
                'ไม่สามารถลดระดับสิทธิ์บัญชีของตนเองได้',
                $response->json('errors.role.0')
            );

            $admin->refresh();
            $this->assertTrue($admin->hasRole('admin'));
            $this->assertFalse($admin->hasRole($demotedRole));
        }
    }

    public function test_self_deactivation_blocked_with_integer_zero_and_string_false(): void
    {
        $admin = $this->createAdmin();

        // Test with integer 0
        $resp1 = $this->actingAsUser($admin)->patchJson("/api/users/{$admin->id}/status", [
            'is_active' => 0,
        ]);
        $resp1->assertStatus(422);
        $this->assertSame('ไม่สามารถระงับการใช้งานบัญชีของตนเองได้', $resp1->json('errors.is_active.0'));

        // Test with string "false" / "0"
        $resp2 = $this->actingAsUser($admin)->patchJson("/api/users/{$admin->id}/status", [
            'is_active' => '0',
        ]);
        $resp2->assertStatus(422);
        $this->assertSame('ไม่สามารถระงับการใช้งานบัญชีของตนเองได้', $resp2->json('errors.is_active.0'));

        $admin->refresh();
        $this->assertTrue((bool) $admin->is_active);
    }

    // =========================================================================
    // 3. HARD DELETE PROTECTION PROBES
    // =========================================================================

    public function test_http_delete_route_does_not_exist(): void
    {
        $superAdmin = $this->createSuperAdmin();
        $staff = $this->createStaff();

        $response = $this->actingAsUser($superAdmin)->deleteJson("/api/users/{$staff->id}");

        // Endpoint must not support DELETE method (404 or 405)
        $this->assertContains($response->status(), [404, 405]);
    }

    public function test_foreign_key_restricts_delete_across_operational_tables(): void
    {
        $worker = $this->createStaff();
        $zoneId = DB::table('cleaning_zones')->value('id') ?? 1;

        // Insert operational record in road_washings
        DB::table('road_washings')->insert([
            'service_date' => now()->toDateString(),
            'cleaning_zone_id' => $zoneId,
            'location' => 'ถนนงามวงศ์วาน',
            'distance_km' => 10.0,
            'created_by' => $worker->id,
            'updated_by' => $worker->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $blocked = false;
        try {
            $worker->delete();
        } catch (QueryException $e) {
            $blocked = true;
        }

        $this->assertTrue($blocked, 'Foreign key restrictOnDelete in operational tables must block hard delete');
        $this->assertDatabaseHas('users', ['id' => $worker->id]);
    }

    // =========================================================================
    // 4. STALE auth_version REJECTION ON API ENDPOINTS
    // =========================================================================

    public function test_api_returns_401_json_with_thai_message_on_stale_auth_version(): void
    {
        $admin = $this->createAdmin();
        $staff = $this->createStaff();

        // Staff has active session with auth_version = 0
        // Admin bumps staff auth_version to 1
        $adminResp = $this->actingAsUser($admin)->patchJson("/api/users/{$staff->id}/status", [
            'is_active' => true,
        ]);
        $adminResp->assertOk();

        $staff->refresh();
        $this->assertSame(1, (int) $staff->auth_version);

        // Staff attempts API request with stale session holding auth_version = 0
        $staleResponse = $this->withSession(['auth_version' => 0])
            ->actingAs($staff, 'web')
            ->getJson('/api/roles');

        $staleResponse->assertStatus(401);
        $staleResponse->assertJson([
            'message' => 'บัญชีผู้ใช้ถูกระงับการใช้งานหรือเซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่',
        ]);
        $this->assertGuest('web');
    }

    public function test_api_rejects_session_with_null_auth_version(): void
    {
        $staff = $this->createStaff();
        $staff->auth_version = 1;
        $staff->save();

        // Session does not have auth_version set (null)
        $response = $this->withSession([])
            ->actingAs($staff, 'web')
            ->getJson('/api/roles');

        $response->assertStatus(401);
        $this->assertGuest('web');
    }

    // =========================================================================
    // 5. AUDIT LOG CREDENTIAL PROTECTION PROBES
    // =========================================================================

    public function test_audit_logs_contain_no_plaintext_passwords_across_all_mutations(): void
    {
        $admin = $this->createAdmin();
        $secretKey = 'VerySecretTestingKey999!';

        // 1. Create
        $this->actingAsUser($admin)->postJson('/api/users', [
            'name' => 'ผู้ใช้ทดสอบ ออดิท',
            'username' => 'audit_test_usr',
            'password' => $secretKey,
            'role' => 'staff',
        ])->assertStatus(201);

        $created = User::where('username', 'audit_test_usr')->firstOrFail();

        // 2. Reset password
        $newSecretKey = 'AnotherUltraSecretKey111!';
        $this->actingAsUser($admin)->postJson("/api/users/{$created->id}/reset-password", [
            'password' => $newSecretKey,
        ])->assertOk();

        // Verify all audit logs for this user
        $logs = DB::table('audit_logs')->where('subject_id', $created->id)->get();
        $this->assertNotEmpty($logs);

        foreach ($logs as $log) {
            $rawBefore = (string) $log->before;
            $rawAfter = (string) $log->after;

            $this->assertStringNotContainsString($secretKey, $rawBefore);
            $this->assertStringNotContainsString($secretKey, $rawAfter);
            $this->assertStringNotContainsString($newSecretKey, $rawBefore);
            $this->assertStringNotContainsString($newSecretKey, $rawAfter);
        }
    }

    // =========================================================================
    // 6. PARAMETER TAMPERING & MULTI-SESSION PROBES
    // =========================================================================

    public function test_parameter_tampering_on_put_user_does_not_modify_protected_fields(): void
    {
        $admin = $this->createAdmin();
        $target = $this->createStaff();
        $originalAuthVersion = $target->auth_version;
        $originalPasswordHash = $target->password;

        $response = $this->actingAsUser($admin)->putJson("/api/users/{$target->id}", [
            'name' => 'ชื่อที่ถูกแก้ไขถูกต้อง',
            'role' => 'staff',
            'is_active' => false,
            'auth_version' => 9999,
            'password' => 'InjectedPassword@123',
        ]);

        $response->assertOk();

        $target->refresh();
        $this->assertSame('ชื่อที่ถูกแก้ไขถูกต้อง', $target->name);
        $this->assertTrue((bool) $target->is_active);
        $this->assertSame($originalAuthVersion, $target->auth_version);
        $this->assertSame($originalPasswordHash, $target->password);
    }

    public function test_concurrent_sessions_both_revoked_on_status_deactivation(): void
    {
        $admin = $this->createAdmin();
        $staff = $this->createStaff();
        $initialAuthVersion = $staff->auth_version;

        // Session A & Session B both established with initial auth_version
        // Admin deactivates staff member
        $this->actingAsUser($admin)->patchJson("/api/users/{$staff->id}/status", [
            'is_active' => false,
        ])->assertOk();

        $staff->refresh();
        $this->assertGreaterThan($initialAuthVersion, $staff->auth_version);

        // Session A (e.g. mobile app / API)
        $respA = $this->withSession(['auth_version' => $initialAuthVersion])
            ->actingAs($staff, 'web')
            ->getJson('/api/roles');
        $respA->assertStatus(401);

        // Session B (e.g. desktop browser)
        $respB = $this->withSession(['auth_version' => $initialAuthVersion])
            ->actingAs($staff, 'web')
            ->get('/');
        $this->assertTrue($respB->isRedirect(route('login')) || $respB->status() === 401);
    }

    public function test_self_password_reset_invalidates_current_session(): void
    {
        $admin = $this->createAdmin();
        $initialAuthVersion = $admin->auth_version;

        $resp = $this->actingAsUser($admin)->postJson("/api/users/{$admin->id}/reset-password", [
            'password' => 'BrandNewAdminPassword@123',
        ]);
        $resp->assertOk();

        $admin->refresh();
        $this->assertGreaterThan($initialAuthVersion, $admin->auth_version);

        // Next request with prior session (auth_version = initial) must be rejected
        $subsequentResp = $this->withSession(['auth_version' => $initialAuthVersion])
            ->actingAs($admin, 'web')
            ->getJson('/api/users');

        $subsequentResp->assertStatus(401);
    }
}
