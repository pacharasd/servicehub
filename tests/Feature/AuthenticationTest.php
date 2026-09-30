<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    private const PASSWORD = 'a-long-passphrase-for-tests';

    private function user(bool $admin = false): User
    {
        $user = User::factory()->create([
            'username' => $admin ? 'chief' : 'staff',
            'password' => Hash::make(self::PASSWORD),
        ]);
        if ($admin) {
            $user->assignRole(Role::findOrCreate('super-admin', 'web'));
        }

        return $user;
    }

    public function test_guests_cannot_open_the_application_or_static_html(): void
    {
        $this->get('/')->assertRedirect(route('login'));
        $this->get('/login')->assertOk()->assertSee('ชื่อผู้ใช้');
        $this->get('/dist/index.html')->assertNotFound();
        $this->assertFileDoesNotExist(public_path('dist/index.html'));
        $this->get('/register')->assertNotFound();
        $this->get('/forgot-password')->assertNotFound();
    }

    public function test_staff_can_login_and_logout_with_a_server_session(): void
    {
        $this->user();
        $this->post('/login', ['username' => 'staff', 'password' => self::PASSWORD])->assertRedirect(route('dashboard'));
        $this->assertAuthenticated();
        $this->get('/')->assertOk()->assertSee('ServiceHub')->assertSee('apiUsers');
        $this->post('/logout')->assertRedirect(route('login'));
        $this->assertGuest();
        $this->get('/')->assertRedirect(route('login'));
        $this->assertDatabaseHas('audit_logs', ['action' => 'auth.login']);
        $this->assertDatabaseHas('audit_logs', ['action' => 'auth.logout']);
    }

    public function test_bad_credentials_and_disabled_accounts_use_the_same_failure(): void
    {
        $user = $this->user();
        $this->post('/login', ['username' => 'staff', 'password' => 'wrong'])->assertSessionHasErrors('username');
        $this->post('/login', ['username' => 'missing', 'password' => 'wrong'])->assertSessionHasErrors('username');
        $user->update(['is_active' => false]);
        $this->post('/login', ['username' => 'staff', 'password' => self::PASSWORD])->assertSessionHasErrors('username');
        $this->assertGuest();
    }

    public function test_login_attempts_are_throttled(): void
    {
        for ($attempt = 0; $attempt < 5; $attempt++) {
            $this->post('/login', ['username' => 'unknown', 'password' => 'wrong'])->assertSessionHasErrors('username');
        }
        $this->post('/login', ['username' => 'unknown', 'password' => 'wrong'])->assertStatus(429);
    }

    public function test_administrator_can_login_without_authenticator_and_old_routes_are_gone(): void
    {
        $this->user(admin: true);
        $this->post('/login', ['username' => 'chief', 'password' => self::PASSWORD])->assertRedirect(route('dashboard'));
        $this->assertAuthenticated();
        $this->get('/')->assertOk();
        $this->get('/security/two-factor')->assertNotFound();
        $this->post('/security/two-factor/recovery-acknowledgement')->assertNotFound();
        $this->get('/two-factor-challenge')->assertNotFound();
        $this->post('/two-factor-challenge', ['code' => '000000'])->assertNotFound();
        $this->post('/user/two-factor-authentication')->assertNotFound();
        $this->delete('/user/two-factor-authentication')->assertNotFound();
        $this->get('/user/two-factor-recovery-codes')->assertNotFound();
    }

    public function test_changed_auth_version_revokes_an_existing_session(): void
    {
        $user = $this->user(admin: true);
        $this->post('/login', ['username' => 'chief', 'password' => self::PASSWORD])->assertRedirect(route('dashboard'));
        $user->forceFill(['auth_version' => 1])->save();
        auth()->forgetUser();
        $this->get('/')->assertRedirect(route('login'));
        $this->assertGuest();
    }
}
