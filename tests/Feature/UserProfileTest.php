<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\ReferenceDataSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UserProfileTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(ReferenceDataSeeder::class);
    }

    private function createStaff(string $password = 'OriginalPassword123!'): User
    {
        $user = User::factory()->create([
            'username' => 'staff_test',
            'name' => 'เจ้าหน้าที่ ทดสอบ',
            'password' => Hash::make($password),
            'is_active' => true,
            'auth_version' => 1,
        ]);
        $user->assignRole('staff');

        return $user;
    }

    public function test_unauthenticated_request_to_profile_is_rejected(): void
    {
        $this->getJson('/api/profile')->assertUnauthorized();
        $this->putJson('/api/profile', ['name' => 'ชื่อใหม่'])->assertUnauthorized();
        $this->putJson('/api/profile/password', [
            'current_password' => 'OldPassword123!',
            'password' => 'NewPassword12345!',
            'password_confirmation' => 'NewPassword12345!',
        ])->assertUnauthorized();
    }

    public function test_authenticated_user_can_view_own_profile(): void
    {
        $user = $this->createStaff();

        $response = $this->withSession(['auth_version' => $user->auth_version])
            ->actingAs($user, 'web')
            ->getJson('/api/profile');

        $response->assertOk()
            ->assertJsonPath('data.id', $user->id)
            ->assertJsonPath('data.username', 'staff_test')
            ->assertJsonPath('data.name', 'เจ้าหน้าที่ ทดสอบ')
            ->assertJsonPath('data.roles', ['staff'])
            ->assertJsonPath('data.is_active', true);
    }

    public function test_authenticated_user_can_update_own_display_name(): void
    {
        $user = $this->createStaff();

        $response = $this->withSession(['auth_version' => $user->auth_version])
            ->actingAs($user, 'web')
            ->putJson('/api/profile', [
                'name' => 'นายสมชาย ใจดี',
            ]);

        $response->assertOk()
            ->assertJsonPath('data.name', 'นายสมชาย ใจดี')
            ->assertJsonPath('message', 'บันทึกข้อมูลชื่อเรียบร้อยแล้ว');

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'นายสมชาย ใจดี',
        ]);

        $this->assertDatabaseHas('audit_logs', [
            'action' => 'profile.updated',
            'subject_id' => $user->id,
            'actor_id' => $user->id,
        ]);
    }

    public function test_update_profile_validation_rejects_empty_or_excessive_name(): void
    {
        $user = $this->createStaff();

        $session = ['auth_version' => $user->auth_version];

        $this->withSession($session)
            ->actingAs($user, 'web')
            ->putJson('/api/profile', ['name' => ''])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('name');

        $this->withSession($session)
            ->actingAs($user, 'web')
            ->putJson('/api/profile', ['name' => str_repeat('ก', 256)])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('name');
    }

    public function test_authenticated_user_can_change_own_password_and_stays_authenticated(): void
    {
        $user = $this->createStaff('OriginalPassword123!');
        $oldAuthVersion = $user->auth_version;

        $response = $this->withSession(['auth_version' => $oldAuthVersion])
            ->actingAs($user, 'web')
            ->putJson('/api/profile/password', [
                'current_password' => 'OriginalPassword123!',
                'password' => 'NewSecurePassword2026!',
                'password_confirmation' => 'NewSecurePassword2026!',
            ]);

        $response->assertOk()
            ->assertJsonPath('message', 'เปลี่ยนรหัสผ่านเรียบร้อยแล้ว เซสชันในอุปกรณ์อื่นถูกยกเลิกแล้ว');

        $user->refresh();
        $this->assertGreaterThan($oldAuthVersion, $user->auth_version);
        $this->assertTrue(Hash::check('NewSecurePassword2026!', $user->password));

        // The current session should have been updated so subsequent requests succeed
        $subsequent = $this->actingAs($user, 'web')
            ->getJson('/api/profile');
        $subsequent->assertOk();

        // Audit log recorded
        $this->assertDatabaseHas('audit_logs', [
            'action' => 'profile.password_changed',
            'subject_id' => $user->id,
            'actor_id' => $user->id,
        ]);
    }

    public function test_change_password_rejects_incorrect_current_password(): void
    {
        $user = $this->createStaff('OriginalPassword123!');

        $this->withSession(['auth_version' => $user->auth_version])
            ->actingAs($user, 'web')
            ->putJson('/api/profile/password', [
                'current_password' => 'WrongPassword999!',
                'password' => 'NewSecurePassword2026!',
                'password_confirmation' => 'NewSecurePassword2026!',
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('current_password');
    }

    public function test_change_password_rejects_password_less_than_15_characters(): void
    {
        $user = $this->createStaff('OriginalPassword123!');

        $this->withSession(['auth_version' => $user->auth_version])
            ->actingAs($user, 'web')
            ->putJson('/api/profile/password', [
                'current_password' => 'OriginalPassword123!',
                'password' => 'ShortPass1234!', // 14 chars
                'password_confirmation' => 'ShortPass1234!',
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('password');
    }

    public function test_change_password_rejects_unconfirmed_password(): void
    {
        $user = $this->createStaff('OriginalPassword123!');

        $this->withSession(['auth_version' => $user->auth_version])
            ->actingAs($user, 'web')
            ->putJson('/api/profile/password', [
                'current_password' => 'OriginalPassword123!',
                'password' => 'NewSecurePassword2026!',
                'password_confirmation' => 'DifferentPassword2026!',
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('password');
    }

    public function test_change_password_rejects_same_as_current_password(): void
    {
        $user = $this->createStaff('OriginalPassword123!');

        $this->withSession(['auth_version' => $user->auth_version])
            ->actingAs($user, 'web')
            ->putJson('/api/profile/password', [
                'current_password' => 'OriginalPassword123!',
                'password' => 'OriginalPassword123!',
                'password_confirmation' => 'OriginalPassword123!',
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('password');
    }

    public function test_changing_password_invalidates_concurrent_session_with_old_auth_version(): void
    {
        $user = $this->createStaff('OriginalPassword123!');
        $oldAuthVersion = $user->auth_version;

        // User changes password in Session 1
        $this->withSession(['auth_version' => $oldAuthVersion])
            ->actingAs($user, 'web')
            ->putJson('/api/profile/password', [
                'current_password' => 'OriginalPassword123!',
                'password' => 'BrandNewPassword2026!',
                'password_confirmation' => 'BrandNewPassword2026!',
            ])
            ->assertOk();

        // Session 2 on another device still holding old auth_version
        $this->withSession(['auth_version' => $oldAuthVersion])
            ->actingAs($user, 'web')
            ->getJson('/api/profile')
            ->assertUnauthorized()
            ->assertJsonPath('message', 'บัญชีผู้ใช้ถูกระงับการใช้งานหรือเซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่');
    }

    public function test_user_can_login_with_new_password_after_profile_password_change(): void
    {
        $user = $this->createStaff('OriginalPassword123!');

        $this->withSession(['auth_version' => $user->auth_version])
            ->actingAs($user, 'web')
            ->putJson('/api/profile/password', [
                'current_password' => 'OriginalPassword123!',
                'password' => 'BrandNewPassword2026!',
                'password_confirmation' => 'BrandNewPassword2026!',
            ])
            ->assertOk();

        // Old password fails
        $this->post('/login', [
            'username' => $user->username,
            'password' => 'OriginalPassword123!',
        ])->assertSessionHasErrors();

        // New password succeeds
        $this->post('/login', [
            'username' => $user->username,
            'password' => 'BrandNewPassword2026!',
        ])->assertRedirect('/');
    }
}
