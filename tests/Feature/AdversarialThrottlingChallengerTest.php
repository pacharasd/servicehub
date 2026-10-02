<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\ReferenceDataSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

/**
 * Adversarial stress test suite challenging Request Throttling and Rate Limiting implementations.
 *
 * Evaluates:
 * 1. API rate limiter threshold: exact 60 requests pass (200), 61st returns HTTP 429 with JSON payload and Retry-After header.
 * 2. Rate limit bucket isolation: User A exhaustion does not throttle User B; IP A does not throttle IP B.
 * 3. Login rate limit: 5 failed attempts permitted, 6th returns HTTP 429; IP isolation verified.
 * 4. Cache reset: Cache::flush() immediately restores access for both API and Login limiters.
 * 5. Adversarial input resilience: injection strings, unicode usernames, and security headers on 429 responses.
 */
class AdversarialThrottlingChallengerTest extends TestCase
{
    use RefreshDatabase;

    private const PASSWORD = 'SecureTestPassword123!';

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(ReferenceDataSeeder::class);
        Cache::flush();
    }

    protected function createSuperAdmin(string $username = 'admin_throttle_challenger'): User
    {
        $user = User::factory()->create([
            'username' => $username,
            'name' => 'ผู้ดูแลระบบ ทดสอบท้าทาย Throttling',
            'password' => Hash::make(self::PASSWORD),
            'is_active' => true,
            'auth_version' => 0,
        ]);
        $user->assignRole(Role::findOrCreate('super-admin', 'web'));

        return $user;
    }

    protected function actingAsUser(User $user, string $driver = 'web')
    {
        return $this->withSession(['auth_version' => $user->auth_version ?? 0])->actingAs($user, $driver);
    }

    // =========================================================================
    // 1. API RATE LIMITER THRESHOLD & PAYLOAD CHALLENGE
    // =========================================================================

    /**
     * Challenge: Verify exact 60 requests pass, 61st returns HTTP 429 with JSON payload and Retry-After header.
     */
    public function test_api_rate_limiter_exact_60_pass_61st_throttled_with_json_and_retry_after(): void
    {
        $user = $this->createSuperAdmin('api_quota_exact_user');

        // Requests 1 through 60 must all succeed with HTTP 200
        for ($i = 1; $i <= 60; $i++) {
            $resp = $this->actingAsUser($user, 'web')->getJson('/api/roles');
            $this->assertSame(200, $resp->status(), "API request {$i} within quota of 60 must return HTTP 200");
        }

        // 61st request must trigger HTTP 429 Too Many Requests
        $resp61 = $this->actingAsUser($user, 'web')->getJson('/api/roles');
        $this->assertSame(429, $resp61->status(), '61st API request must be throttled with HTTP 429');

        // Verify JSON payload format
        $this->assertNotEmpty($resp61->json('message'), 'HTTP 429 response must contain JSON message');

        // Verify Retry-After header is present and integer > 0
        $this->assertTrue($resp61->headers->has('Retry-After'), 'HTTP 429 response must provide Retry-After header');
        $retryAfter = (int) $resp61->headers->get('Retry-After');
        $this->assertGreaterThan(0, $retryAfter, 'Retry-After header value must be positive integer');
        $this->assertLessThanOrEqual(60, $retryAfter, 'Retry-After should not exceed the 60s decay window');

        // 62nd request must remain throttled
        $resp62 = $this->actingAsUser($user, 'web')->getJson('/api/roles');
        $this->assertSame(429, $resp62->status(), 'Subsequent requests after 61 must remain throttled');
    }

    /**
     * Challenge: Verify that HTTP 429 responses retain all 5 OWASP security headers.
     */
    public function test_throttled_api_429_retains_all_owasp_security_headers(): void
    {
        $user = $this->createSuperAdmin('api_headers_on_429_user');

        for ($i = 1; $i <= 60; $i++) {
            $this->actingAsUser($user, 'web')->getJson('/api/roles');
        }

        $throttled = $this->actingAsUser($user, 'web')->getJson('/api/roles');
        $this->assertSame(429, $throttled->status());

        $throttled->assertHeader('X-Frame-Options', 'SAMEORIGIN');
        $throttled->assertHeader('X-Content-Type-Options', 'nosniff');
        $throttled->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        $throttled->assertHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');
        $this->assertTrue($throttled->headers->has('Content-Security-Policy'), 'CSP header missing on 429');
    }

    // =========================================================================
    // 2. RATE LIMIT BUCKET ISOLATION CHALLENGE
    // =========================================================================

    /**
     * Challenge: User A exhausts quota (60 requests) and is throttled on 61st.
     * User B must NOT be throttled and can execute all 60 requests normally.
     */
    public function test_rate_limit_bucket_isolation_user_a_does_not_throttle_user_b(): void
    {
        $userA = $this->createSuperAdmin('quota_isolated_user_a');
        $userB = $this->createSuperAdmin('quota_isolated_user_b');

        // User A exhausts all 60 requests
        for ($i = 1; $i <= 60; $i++) {
            $respA = $this->actingAsUser($userA, 'web')->getJson('/api/roles');
            $this->assertSame(200, $respA->status());
        }

        // User A request 61 is throttled
        $throttledA = $this->actingAsUser($userA, 'web')->getJson('/api/roles');
        $this->assertSame(429, $throttledA->status(), 'User A must be throttled on 61st attempt');

        // User B must be completely unaffected and receive HTTP 200
        $respB = $this->actingAsUser($userB, 'web')->getJson('/api/roles');
        $this->assertSame(200, $respB->status(), 'User B must NOT be throttled by User A activity');

        // User B can proceed up to their own 60 request limit
        for ($j = 2; $j <= 60; $j++) {
            $this->assertSame(200, $this->actingAsUser($userB, 'web')->getJson('/api/roles')->status());
        }

        // User B request 61 is now throttled
        $this->assertSame(429, $this->actingAsUser($userB, 'web')->getJson('/api/roles')->status());

        // User A remains throttled
        $this->assertSame(429, $this->actingAsUser($userA, 'web')->getJson('/api/roles')->status());
    }

    /**
     * Challenge: Unauthenticated guest requests are isolated by IP address.
     */
    public function test_guest_api_rate_limiting_isolated_by_client_ip(): void
    {
        $ip1 = '198.51.100.10';
        $ip2 = '198.51.100.20';

        // IP 1 exhausts 60 requests to an unauthenticated route
        for ($i = 1; $i <= 60; $i++) {
            $resp1 = $this->withServerVariables(['REMOTE_ADDR' => $ip1])->getJson('/api/roles');
            // Unauthenticated receives 401, but hits the api throttle middleware
            $this->assertSame(401, $resp1->status());
        }

        // IP 1 request 61 is throttled with 429
        $throttledIp1 = $this->withServerVariables(['REMOTE_ADDR' => $ip1])->getJson('/api/roles');
        $this->assertSame(429, $throttledIp1->status(), 'IP 1 must be throttled with 429 after 60 requests');

        // IP 2 is not affected and still receives 401 (not 429)
        $respIp2 = $this->withServerVariables(['REMOTE_ADDR' => $ip2])->getJson('/api/roles');
        $this->assertSame(401, $respIp2->status(), 'IP 2 must NOT be throttled by IP 1 requests');
    }

    // =========================================================================
    // 3. LOGIN RATE LIMIT CHALLENGE
    // =========================================================================

    /**
     * Challenge: Verify exact login rate limit boundary: 5 failed attempts allowed, 6th returns HTTP 429.
     */
    public function test_login_rate_limit_5_failed_allowed_6th_throttled_with_429(): void
    {
        $ip = '10.99.88.77';
        $username = 'login_stress_target';

        // Attempts 1 to 5: must be credential failures (session error), NOT HTTP 429
        for ($attempt = 1; $attempt <= 5; $attempt++) {
            $resp = $this->withServerVariables(['REMOTE_ADDR' => $ip])
                ->post('/login', ['username' => $username, 'password' => 'WrongPass#'.$attempt]);

            $this->assertNotSame(429, $resp->status(), "Attempt {$attempt} must not receive HTTP 429");
            $resp->assertSessionHasErrors('username');
        }

        // 6th attempt: must receive HTTP 429 Too Many Requests
        $resp6 = $this->withServerVariables(['REMOTE_ADDR' => $ip])
            ->post('/login', ['username' => $username, 'password' => 'WrongPass#6']);

        $this->assertSame(429, $resp6->status(), '6th login attempt must be throttled with HTTP 429');

        // 7th attempt: must also be throttled with HTTP 429
        $resp7 = $this->withServerVariables(['REMOTE_ADDR' => $ip])
            ->post('/login', ['username' => $username, 'password' => 'WrongPass#7']);

        $this->assertSame(429, $resp7->status(), '7th login attempt must remain throttled with HTTP 429');
    }

    /**
     * Challenge: Login rate limiting is isolated across IP addresses.
     */
    public function test_login_rate_limiting_isolated_across_different_ips(): void
    {
        $attackerIp = '198.51.100.99';
        $legitIp = '198.51.100.100';
        $victim = 'shared_victim_account';

        // Attacker exhausts 5 attempts
        for ($i = 1; $i <= 5; $i++) {
            $this->withServerVariables(['REMOTE_ADDR' => $attackerIp])
                ->post('/login', ['username' => $victim, 'password' => 'attack#'.$i])
                ->assertSessionHasErrors('username');
        }

        // Attacker gets throttled on 6th attempt
        $blockedAttacker = $this->withServerVariables(['REMOTE_ADDR' => $attackerIp])
            ->post('/login', ['username' => $victim, 'password' => 'attack#6']);
        $this->assertSame(429, $blockedAttacker->status(), 'Attacker must receive HTTP 429 on 6th attempt');

        // Legitimate user from different IP can still attempt login
        $legitResp = $this->withServerVariables(['REMOTE_ADDR' => $legitIp])
            ->post('/login', ['username' => $victim, 'password' => 'wrong_pass']);
        $this->assertNotSame(429, $legitResp->status(), 'Legitimate IP must not be throttled by attacker attempts');
        $legitResp->assertSessionHasErrors('username');
    }

    /**
     * Challenge: Malicious injection payloads in username do not break throttle key derivation.
     */
    public function test_login_throttling_handles_adversarial_usernames_safely(): void
    {
        $payloads = [
            "' OR '1'='1",
            "admin'--",
            'ผู้ใช้งาน_ทดสอบ_unicode',
            '../../../etc/passwd',
            '<script>alert(1)</script>',
            str_repeat('A', 500),
        ];

        foreach ($payloads as $idx => $payload) {
            $ip = "192.0.2.{$idx}";

            // 5 attempts processed
            for ($i = 0; $i < 5; $i++) {
                $resp = $this->withServerVariables(['REMOTE_ADDR' => $ip])
                    ->post('/login', ['username' => $payload, 'password' => 'test']);
                $this->assertNotSame(429, $resp->status());
            }

            // 6th attempt throttled
            $resp6 = $this->withServerVariables(['REMOTE_ADDR' => $ip])
                ->post('/login', ['username' => $payload, 'password' => 'test']);
            $this->assertSame(429, $resp6->status(), "Username payload {$idx} must trigger 429 on 6th attempt");
        }
    }

    // =========================================================================
    // 4. CACHE RESET RESTORES ACCESS CHALLENGE
    // =========================================================================

    /**
     * Challenge: When an API user is throttled with HTTP 429, clearing cache immediately restores HTTP 200 access.
     */
    public function test_cache_reset_restores_api_access_immediately(): void
    {
        $user = $this->createSuperAdmin('cache_reset_api_user');

        // Exhaust all 60 requests
        for ($i = 1; $i <= 60; $i++) {
            $this->assertSame(200, $this->actingAsUser($user, 'web')->getJson('/api/roles')->status());
        }

        // Verify throttled state (HTTP 429)
        $this->assertSame(429, $this->actingAsUser($user, 'web')->getJson('/api/roles')->status());

        // Perform cache flush (reset)
        Cache::flush();

        // Immediately verify access is fully restored (HTTP 200)
        $restoredResp = $this->actingAsUser($user, 'web')->getJson('/api/roles');
        $this->assertSame(200, $restoredResp->status(), 'Cache::flush() must immediately restore API access to HTTP 200');

        // User can now make another 59 requests without being throttled
        for ($k = 2; $k <= 60; $k++) {
            $this->assertSame(200, $this->actingAsUser($user, 'web')->getJson('/api/roles')->status());
        }

        // 61st request after flush is throttled again
        $this->assertSame(429, $this->actingAsUser($user, 'web')->getJson('/api/roles')->status());
    }

    /**
     * Challenge: When login is throttled with HTTP 429, clearing cache immediately restores login attempts.
     */
    public function test_cache_reset_restores_login_access_immediately(): void
    {
        $ip = '10.55.44.33';
        $username = 'cache_reset_login_user';

        // Exhaust 5 failed attempts
        for ($i = 1; $i <= 5; $i++) {
            $this->withServerVariables(['REMOTE_ADDR' => $ip])
                ->post('/login', ['username' => $username, 'password' => 'wrong'])
                ->assertSessionHasErrors('username');
        }

        // 6th attempt is throttled (429)
        $this->assertSame(429, $this->withServerVariables(['REMOTE_ADDR' => $ip])
            ->post('/login', ['username' => $username, 'password' => 'wrong'])->status());

        // Flush cache
        Cache::flush();

        // Immediately retry login: must NOT be 429, must be processed as normal credential attempt
        $restoredLogin = $this->withServerVariables(['REMOTE_ADDR' => $ip])
            ->post('/login', ['username' => $username, 'password' => 'wrong']);

        $this->assertNotSame(429, $restoredLogin->status(), 'Cache::flush() must immediately restore login attempt processing');
        $restoredLogin->assertSessionHasErrors('username');

        // Login with valid credentials succeeds immediately
        $user = $this->createSuperAdmin($username);
        $validLogin = $this->withServerVariables(['REMOTE_ADDR' => $ip])
            ->post('/login', ['username' => $username, 'password' => self::PASSWORD]);

        $validLogin->assertRedirect(route('dashboard'));
    }
}
