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
 * Requirement-driven opaque-box test suite for ServiceHub international standards optimization.
 * Covers Requirements R2 (Enterprise Security & Throttling) and R4 (Immutable Asset Caching).
 * Organized according to the 4-Tier Test Architecture:
 * - Tier 1: Feature Coverage (Headers, Login Throttling, API Throttling, Asset Caching)
 * - Tier 2: Boundary & Corner Cases (5th vs 6th attempt, 60th vs 61st attempt, 404 guards, traversal)
 * - Tier 3: Cross-Feature Interactions (Header parity across states, User & IP rate limit isolation)
 * - Tier 4: Real-World Scenarios (Admin lifecycle, Brute-force burst attack, Heavy polling)
 */
class SecurityHeadersAndThrottlingTest extends TestCase
{
    use RefreshDatabase;

    private const PASSWORD = 'SecureTestPassword123!';

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(ReferenceDataSeeder::class);
        Cache::flush();
    }

    protected function createSuperAdmin(string $username = 'admin_opt'): User
    {
        $user = User::factory()->create([
            'username' => $username,
            'name' => 'ผู้ดูแลระบบ ทดสอบมาตรฐาน',
            'password' => Hash::make(self::PASSWORD),
            'is_active' => true,
            'auth_version' => 0,
        ]);
        $user->assignRole(Role::findOrCreate('super-admin', 'web'));

        return $user;
    }

    protected function createStaff(string $username = 'staff_opt'): User
    {
        $user = User::factory()->create([
            'username' => $username,
            'name' => 'เจ้าหน้าที่ ทดสอบมาตรฐาน',
            'password' => Hash::make(self::PASSWORD),
            'is_active' => true,
            'auth_version' => 0,
        ]);
        $user->assignRole(Role::findOrCreate('staff', 'web'));

        return $user;
    }

    protected function actingAsUser(User $user, string $driver = 'web')
    {
        return $this->withSession(['auth_version' => $user->auth_version ?? 0])->actingAs($user, $driver);
    }

    // =========================================================================
    // TIER 1: FEATURE COVERAGE
    // =========================================================================

    /**
     * Tier 1: Verify presence of all 5 OWASP security headers on guest login page.
     */
    public function test_tier1_security_headers_present_on_login_page(): void
    {
        $response = $this->get('/login');

        $response->assertOk();
        $response->assertHeader('X-Frame-Options', 'SAMEORIGIN');
        $response->assertHeader('X-Content-Type-Options', 'nosniff');
        $response->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->assertHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');
        $this->assertTrue(
            $response->headers->has('Content-Security-Policy'),
            'Content-Security-Policy header is missing on /login response'
        );
    }

    /**
     * Tier 1: Verify presence of all 5 OWASP security headers on authenticated application shell.
     */
    public function test_tier1_security_headers_present_on_authenticated_app_shell(): void
    {
        $admin = $this->createSuperAdmin();

        $response = $this->actingAsUser($admin, 'web')->get('/');

        $response->assertOk();
        $response->assertHeader('X-Frame-Options', 'SAMEORIGIN');
        $response->assertHeader('X-Content-Type-Options', 'nosniff');
        $response->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->assertHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');
        $this->assertTrue(
            $response->headers->has('Content-Security-Policy'),
            'Content-Security-Policy header is missing on / response'
        );
    }

    /**
     * Tier 1: Verify presence of all 5 OWASP security headers on authenticated API responses.
     */
    public function test_tier1_security_headers_present_on_api_endpoints(): void
    {
        $admin = $this->createSuperAdmin();

        $response = $this->actingAsUser($admin, 'web')->getJson('/api/roles');

        $response->assertOk();
        $response->assertHeader('X-Frame-Options', 'SAMEORIGIN');
        $response->assertHeader('X-Content-Type-Options', 'nosniff');
        $response->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->assertHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');
        $this->assertTrue(
            $response->headers->has('Content-Security-Policy'),
            'Content-Security-Policy header is missing on /api/roles response'
        );
    }

    /**
     * Tier 1: Verify Content Security Policy directives permit necessary local assets and Google Fonts.
     */
    public function test_tier1_content_security_policy_directives_allow_fonts_and_inline_assets(): void
    {
        $response = $this->get('/login');
        $csp = (string) $response->headers->get('Content-Security-Policy');

        $this->assertNotEmpty($csp, 'Content-Security-Policy header must not be empty');
        $this->assertStringContainsString("default-src 'self'", $csp);
        $this->assertStringContainsString("script-src 'self' 'unsafe-inline'", $csp);
        $this->assertStringContainsString("style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", $csp);
        $this->assertStringContainsString("font-src 'self' https://fonts.gstatic.com data:", $csp);
        $this->assertStringContainsString("img-src 'self' data:", $csp);
        $this->assertStringContainsString("connect-src 'self'", $csp);
        $this->assertStringContainsString("frame-ancestors 'self'", $csp);
    }

    /**
     * Tier 1: Verify authentication throttling blocks more than 5 attempts within 1 minute.
     */
    public function test_tier1_login_rate_limit_blocks_excessive_attempts(): void
    {
        $ip = '10.10.10.10';
        for ($i = 0; $i < 5; $i++) {
            $resp = $this->withServerVariables(['REMOTE_ADDR' => $ip])
                ->post('/login', ['username' => 'test_victim', 'password' => 'wrong_password']);
            $resp->assertSessionHasErrors('username');
        }

        $blocked = $this->withServerVariables(['REMOTE_ADDR' => $ip])
            ->post('/login', ['username' => 'test_victim', 'password' => 'wrong_password']);

        $blocked->assertStatus(429);
    }

    /**
     * Tier 1: Verify API rate limiting blocks requests exceeding 60 requests per minute.
     */
    public function test_tier1_api_rate_limit_blocks_after_threshold(): void
    {
        $admin = $this->createSuperAdmin('api_quota_user');

        for ($i = 1; $i <= 60; $i++) {
            $resp = $this->actingAsUser($admin, 'web')->getJson('/api/roles');
            $resp->assertOk();
        }

        $blocked = $this->actingAsUser($admin, 'web')->getJson('/api/roles');
        $blocked->assertStatus(429);
    }

    /**
     * Tier 1: Verify static compiled assets in public/dist/assets return immutable 1-year caching header.
     */
    public function test_tier1_static_dist_assets_return_immutable_cache_header(): void
    {
        $assets = glob(public_path('dist/assets/*.*'));
        if (empty($assets)) {
            $this->markTestSkipped('No static assets found in public/dist/assets');
        }

        $assetFile = basename($assets[0]);
        $response = $this->get('/dist/assets/'.$assetFile);

        $response->assertOk();
        $cacheControl = (string) $response->headers->get('Cache-Control');
        $this->assertStringContainsString('public', $cacheControl);
        $this->assertStringContainsString('max-age=31536000', $cacheControl);
        $this->assertStringContainsString('immutable', $cacheControl);
    }

    // =========================================================================
    // TIER 2: BOUNDARY & CORNER CASES
    // =========================================================================

    /**
     * Tier 2: Exact boundary test between the 5th attempt (permitted) and 6th attempt (throttled).
     */
    public function test_tier2_exact_boundary_5th_vs_6th_login_attempt(): void
    {
        $ip = '10.20.30.40';
        $username = 'boundary_login_target';

        for ($attempt = 1; $attempt <= 4; $attempt++) {
            $resp = $this->withServerVariables(['REMOTE_ADDR' => $ip])
                ->post('/login', ['username' => $username, 'password' => 'invalid_pass']);
            $this->assertNotSame(429, $resp->status(), "Attempt {$attempt} must not receive 429");
            $resp->assertSessionHasErrors('username');
        }

        // 5th attempt is exactly on the boundary: must still process credential validation
        $resp5 = $this->withServerVariables(['REMOTE_ADDR' => $ip])
            ->post('/login', ['username' => $username, 'password' => 'invalid_pass']);
        $this->assertNotSame(429, $resp5->status(), '5th attempt must not receive 429');
        $resp5->assertSessionHasErrors('username');

        // 6th attempt is over the limit: must receive HTTP 429
        $resp6 = $this->withServerVariables(['REMOTE_ADDR' => $ip])
            ->post('/login', ['username' => $username, 'password' => 'invalid_pass']);
        $this->assertSame(429, $resp6->status(), '6th attempt must be throttled with HTTP 429');
    }

    /**
     * Tier 2: Exact boundary test between the 60th API request (permitted) and 61st request (throttled).
     */
    public function test_tier2_exact_boundary_60th_vs_61st_api_attempt(): void
    {
        $admin = $this->createSuperAdmin('boundary_api_target');

        for ($i = 1; $i <= 60; $i++) {
            $resp = $this->actingAsUser($admin, 'web')->getJson('/api/roles');
            $this->assertSame(200, $resp->status(), "API request {$i} within limit must return 200");
        }

        $resp61 = $this->actingAsUser($admin, 'web')->getJson('/api/roles');
        $this->assertSame(429, $resp61->status(), 'API request 61 must be throttled with HTTP 429');
    }

    /**
     * Tier 2: Verify throttled API 429 response structure includes Retry-After header and message payload.
     */
    public function test_tier2_api_rate_limit_429_payload_and_retry_after_header(): void
    {
        $admin = $this->createSuperAdmin('payload_api_target');

        for ($i = 1; $i <= 60; $i++) {
            $this->actingAsUser($admin, 'web')->getJson('/api/roles');
        }

        $resp = $this->actingAsUser($admin, 'web')->getJson('/api/roles');

        $this->assertSame(429, $resp->status());
        $this->assertTrue(
            $resp->headers->has('Retry-After'),
            'HTTP 429 response must provide Retry-After header'
        );
        $this->assertGreaterThan(0, (int) $resp->headers->get('Retry-After'));
        $this->assertNotEmpty($resp->json('message'), 'HTTP 429 response must provide a JSON error message');
    }

    /**
     * Tier 2: Verify security guard ensuring /dist/index.html returns 404 and does not exist.
     */
    public function test_tier2_dist_index_html_returns_404_security_guard(): void
    {
        $response = $this->get('/dist/index.html');

        $response->assertNotFound();
        $this->assertFileDoesNotExist(
            public_path('dist/index.html'),
            'public/dist/index.html must not exist on filesystem'
        );
    }

    /**
     * Tier 2: Verify directory traversal attempts on static asset endpoint return 404.
     */
    public function test_tier2_asset_path_traversal_attempts_return_404(): void
    {
        $traversalUris = [
            '/dist/assets/../index.html',
            '/dist/assets/../../routes/web.php',
            '/dist/assets/..%2f..%2f.env',
            '/dist/assets/non_existent_asset_file.js',
        ];

        foreach ($traversalUris as $uri) {
            $resp = $this->get($uri);
            $this->assertSame(404, $resp->status(), "Traversal URI {$uri} must return 404");
        }
    }

    /**
     * Tier 2: Verify special characters and SQL metacharacters in username are safely handled by rate limiter.
     */
    public function test_tier2_special_characters_in_login_throttling_key(): void
    {
        $specialUsernames = [
            "admin'--",
            'user@servicehub.local',
            'ผู้ดูแลระบบ_พิเศษ',
            'admin;DROP TABLE users;',
        ];

        foreach ($specialUsernames as $idx => $uname) {
            $ip = "192.168.200.{$idx}";
            for ($attempt = 0; $attempt < 5; $attempt++) {
                $this->withServerVariables(['REMOTE_ADDR' => $ip])
                    ->post('/login', ['username' => $uname, 'password' => 'wrong'])
                    ->assertSessionHasErrors('username');
            }
            $this->withServerVariables(['REMOTE_ADDR' => $ip])
                ->post('/login', ['username' => $uname, 'password' => 'wrong'])
                ->assertStatus(429);
        }
    }

    // =========================================================================
    // TIER 3: CROSS-FEATURE INTERACTIONS
    // =========================================================================

    /**
     * Tier 3: Verify security headers consistency across guest, authenticated, unauthorized API, and 404 states.
     */
    public function test_tier3_security_headers_consistent_across_guest_auth_and_error_states(): void
    {
        $admin = $this->createSuperAdmin('parity_admin');

        $guestResp = $this->get('/login');
        $authResp = $this->actingAsUser($admin, 'web')->get('/');
        $unauthApiResp = $this->getJson('/api/users');
        $notFoundResp = $this->get('/non-existent-testing-url-path');

        $assertHeaders = function ($resp, string $context): void {
            $resp->assertHeader('X-Frame-Options', 'SAMEORIGIN');
            $resp->assertHeader('X-Content-Type-Options', 'nosniff');
            $resp->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
            $resp->assertHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');
            $this->assertTrue($resp->headers->has('Content-Security-Policy'), "CSP missing on {$context}");
        };

        $assertHeaders($guestResp, 'Guest Login');
        $assertHeaders($authResp, 'Authenticated Shell');
        $assertHeaders($unauthApiResp, 'Unauthenticated API (401)');
        $assertHeaders($notFoundResp, 'Not Found Page (404)');
    }

    /**
     * Tier 3: Verify API rate limiting quota is strictly isolated across different authenticated users.
     */
    public function test_tier3_rate_limiting_isolated_across_different_users(): void
    {
        $userA = $this->createSuperAdmin('quota_user_alpha');
        $userB = $this->createSuperAdmin('quota_user_beta');

        // User A exhausts all 60 quota units
        for ($i = 1; $i <= 60; $i++) {
            $this->actingAsUser($userA, 'web')->getJson('/api/roles')->assertOk();
        }

        // User A is now throttled
        $this->actingAsUser($userA, 'web')->getJson('/api/roles')->assertStatus(429);

        // User B must NOT be throttled and can perform requests normally
        $this->actingAsUser($userB, 'web')->getJson('/api/roles')->assertOk();
    }

    /**
     * Tier 3: Verify login rate limiting is strictly isolated across different client IP addresses.
     */
    public function test_tier3_login_rate_limiting_isolated_across_different_ips(): void
    {
        $ipA = '172.20.1.1';
        $ipB = '172.20.1.2';
        $targetUser = 'isolated_login_target';

        // IP A exhausts 5 attempts
        for ($i = 0; $i < 5; $i++) {
            $this->withServerVariables(['REMOTE_ADDR' => $ipA])
                ->post('/login', ['username' => $targetUser, 'password' => 'wrong'])
                ->assertSessionHasErrors('username');
        }

        // IP A receives 429
        $this->withServerVariables(['REMOTE_ADDR' => $ipA])
            ->post('/login', ['username' => $targetUser, 'password' => 'wrong'])
            ->assertStatus(429);

        // IP B targeting the same or another username is NOT locked out
        $respB = $this->withServerVariables(['REMOTE_ADDR' => $ipB])
            ->post('/login', ['username' => 'another_user', 'password' => 'wrong']);
        $this->assertNotSame(429, $respB->status(), 'IP B must not be affected by IP A throttling');
        $respB->assertSessionHasErrors('username');
    }

    /**
     * Tier 3: Verify that 429 throttled responses still carry all required security headers.
     */
    public function test_tier3_throttled_429_responses_still_include_all_security_headers(): void
    {
        $admin = $this->createSuperAdmin('throttled_headers_target');

        for ($i = 1; $i <= 60; $i++) {
            $this->actingAsUser($admin, 'web')->getJson('/api/roles');
        }

        $throttled = $this->actingAsUser($admin, 'web')->getJson('/api/roles');

        $throttled->assertStatus(429);
        $throttled->assertHeader('X-Frame-Options', 'SAMEORIGIN');
        $throttled->assertHeader('X-Content-Type-Options', 'nosniff');
        $throttled->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        $throttled->assertHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');
        $this->assertTrue(
            $throttled->headers->has('Content-Security-Policy'),
            'Content-Security-Policy missing on 429 response'
        );
    }

    // =========================================================================
    // TIER 4: REAL-WORLD SCENARIOS
    // =========================================================================

    /**
     * Tier 4: Real-World Scenario: Complete admin lifecycle from login to operations and logout.
     */
    public function test_tier4_complete_admin_lifecycle_with_headers_and_sub_limit_api_calls(): void
    {
        // Step 1: Guest visits login page
        $loginPage = $this->get('/login');
        $loginPage->assertOk();
        $loginPage->assertHeader('X-Frame-Options', 'SAMEORIGIN');

        // Step 2: Administrator logs in with valid credentials
        $admin = $this->createSuperAdmin('scenario_lifecycle_admin');
        $loginPost = $this->post('/login', [
            'username' => 'scenario_lifecycle_admin',
            'password' => self::PASSWORD,
        ]);
        $loginPost->assertRedirect(route('dashboard'));

        // Step 3: Access authenticated SPA root
        $spa = $this->actingAsUser($admin, 'web')->get('/');
        $spa->assertOk();
        $spa->assertHeader('X-Frame-Options', 'SAMEORIGIN');

        // Step 4: Perform normal operational API queries (10 requests, well within 60 limit)
        for ($step = 1; $step <= 10; $step++) {
            $apiResp = $this->actingAsUser($admin, 'web')->getJson('/api/roles');
            $apiResp->assertOk();
            $this->assertNotSame(429, $apiResp->status());
        }

        // Step 5: Administrator logs out
        $logout = $this->actingAsUser($admin, 'web')->post('/logout');
        $logout->assertRedirect(route('login'));
        $this->assertGuest();
    }

    /**
     * Tier 4: Real-World Scenario: Rapid brute-force password spraying attack simulation.
     */
    public function test_tier4_rapid_brute_force_attack_simulation(): void
    {
        $attackerIp = '198.51.100.77';
        $victimUsername = 'target_admin';

        for ($attempt = 1; $attempt <= 10; $attempt++) {
            $resp = $this->withServerVariables(['REMOTE_ADDR' => $attackerIp])
                ->post('/login', [
                    'username' => $victimUsername,
                    'password' => 'SprayPassword#'.$attempt,
                ]);

            if ($attempt <= 5) {
                $this->assertNotSame(
                    429,
                    $resp->status(),
                    "Attempt {$attempt} should be processed as credential failure"
                );
                $resp->assertSessionHasErrors('username');
            } else {
                $this->assertSame(
                    429,
                    $resp->status(),
                    "Attempt {$attempt} must be actively blocked with HTTP 429"
                );
            }
        }
    }

    /**
     * Tier 4: Real-World Scenario: Heavy operational API polling simulation up to cap.
     */
    public function test_tier4_heavy_api_polling_simulation(): void
    {
        $poller = $this->createSuperAdmin('polling_operator');

        // Operator dashboard bursts 50 updates
        for ($i = 1; $i <= 50; $i++) {
            $this->actingAsUser($poller, 'web')->getJson('/api/roles')->assertOk();
        }

        // Operator completes another 10 updates to reach cap (60)
        for ($i = 51; $i <= 60; $i++) {
            $this->actingAsUser($poller, 'web')->getJson('/api/roles')->assertOk();
        }

        // 61st update exceeds quota
        $throttled = $this->actingAsUser($poller, 'web')->getJson('/api/roles');
        $throttled->assertStatus(429);
        $this->assertTrue($throttled->headers->has('Retry-After'));
    }
}
