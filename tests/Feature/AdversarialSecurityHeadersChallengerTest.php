<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\ReferenceDataSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Role;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Tests\TestCase;

class AdversarialSecurityHeadersChallengerTest extends TestCase
{
    use RefreshDatabase;

    private const PASSWORD = 'SecureTestPassword123!';

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(ReferenceDataSeeder::class);
        Cache::flush();
    }

    protected function createSuperAdmin(string $username = 'admin_challenger'): User
    {
        $user = User::factory()->create([
            'username' => $username,
            'name' => 'ผู้ดูแลระบบ ทดสอบท้าทาย',
            'password' => Hash::make(self::PASSWORD),
            'is_active' => true,
            'auth_version' => 0,
        ]);
        $user->assignRole(Role::findOrCreate('super-admin', 'web'));

        return $user;
    }

    protected function createStaff(string $username = 'staff_challenger'): User
    {
        $user = User::factory()->create([
            'username' => $username,
            'name' => 'เจ้าหน้าที่ ทดสอบท้าทาย',
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

    /**
     * Helper to assert all 5 OWASP security headers exist on response.
     */
    protected function assertAllSecurityHeadersPresent($response, string $context = ''): void
    {
        $this->assertTrue(
            $response->headers->has('X-Frame-Options'),
            "X-Frame-Options header missing on {$context}"
        );
        $this->assertSame(
            'SAMEORIGIN',
            $response->headers->get('X-Frame-Options'),
            "X-Frame-Options must be SAMEORIGIN on {$context}"
        );

        $this->assertTrue(
            $response->headers->has('X-Content-Type-Options'),
            "X-Content-Type-Options header missing on {$context}"
        );
        $this->assertSame(
            'nosniff',
            $response->headers->get('X-Content-Type-Options'),
            "X-Content-Type-Options must be nosniff on {$context}"
        );

        $this->assertTrue(
            $response->headers->has('Referrer-Policy'),
            "Referrer-Policy header missing on {$context}"
        );
        $this->assertSame(
            'strict-origin-when-cross-origin',
            $response->headers->get('Referrer-Policy'),
            "Referrer-Policy must be strict-origin-when-cross-origin on {$context}"
        );

        $this->assertTrue(
            $response->headers->has('Permissions-Policy'),
            "Permissions-Policy header missing on {$context}"
        );
        $this->assertSame(
            'geolocation=(), camera=(), microphone=()',
            $response->headers->get('Permissions-Policy'),
            "Permissions-Policy must restrict geolocation, camera, microphone on {$context}"
        );

        $this->assertTrue(
            $response->headers->has('Content-Security-Policy'),
            "Content-Security-Policy header missing on {$context}"
        );
        $this->assertNotEmpty(
            $response->headers->get('Content-Security-Policy'),
            "Content-Security-Policy must not be empty on {$context}"
        );
    }

    // =========================================================================
    // 1. RESPONSE TYPE COVERAGE: 200, 302, 401, 403, 404, 422, 500
    // =========================================================================

    public function test_headers_present_on_200_ok(): void
    {
        $response = $this->get('/login');
        $response->assertStatus(200);
        $this->assertAllSecurityHeadersPresent($response, 'HTTP 200 /login');

        $admin = $this->createSuperAdmin();
        $apiResponse = $this->actingAsUser($admin)->getJson('/api/roles');
        $apiResponse->assertStatus(200);
        $this->assertAllSecurityHeadersPresent($apiResponse, 'HTTP 200 /api/roles');
    }

    public function test_headers_present_on_302_redirect(): void
    {
        // Unauthenticated request to / redirects to /login
        $guestRedirect = $this->get('/');
        $guestRedirect->assertStatus(302);
        $this->assertAllSecurityHeadersPresent($guestRedirect, 'HTTP 302 guest redirect to login');

        // Logout redirects to /login
        $admin = $this->createSuperAdmin();
        $logoutRedirect = $this->actingAsUser($admin)->post('/logout');
        $logoutRedirect->assertStatus(302);
        $this->assertAllSecurityHeadersPresent($logoutRedirect, 'HTTP 302 logout redirect');
    }

    public function test_headers_present_on_401_unauthorized(): void
    {
        $response = $this->getJson('/api/users');
        $response->assertStatus(401);
        $this->assertAllSecurityHeadersPresent($response, 'HTTP 401 /api/users');
    }

    public function test_headers_present_on_403_forbidden(): void
    {
        $staff = $this->createStaff();
        // Staff without users.create tries to create user
        $response = $this->actingAsUser($staff)->postJson('/api/users', [
            'name' => 'Forbidden User',
            'username' => 'forbidden.user',
            'password' => 'Password123!',
            'role' => 'staff',
        ]);
        $response->assertStatus(403);
        $this->assertAllSecurityHeadersPresent($response, 'HTTP 403 /api/users forbidden');
    }

    public function test_headers_present_on_404_not_found(): void
    {
        // Web 404
        $webNotFound = $this->get('/non-existent-web-route-'.uniqid());
        $webNotFound->assertStatus(404);
        $this->assertAllSecurityHeadersPresent($webNotFound, 'HTTP 404 web route');

        // API 404
        $apiNotFound = $this->getJson('/api/non-existent-api-route-'.uniqid());
        $apiNotFound->assertStatus(404);
        $this->assertAllSecurityHeadersPresent($apiNotFound, 'HTTP 404 API route');
    }

    public function test_headers_present_on_422_unprocessable_content(): void
    {
        $admin = $this->createSuperAdmin();
        $response = $this->actingAsUser($admin)->postJson('/api/users', []);
        $response->assertStatus(422);
        $this->assertAllSecurityHeadersPresent($response, 'HTTP 422 validation failure');
    }

    public function test_headers_present_on_500_internal_server_error(): void
    {
        Route::get('/_test_simulated_500_route', function () {
            abort(500, 'Simulated 500 error for security testing');
        });

        $response = $this->get('/_test_simulated_500_route');
        $response->assertStatus(500);
        $this->assertAllSecurityHeadersPresent($response, 'HTTP 500 internal server error');
    }

    // =========================================================================
    // 2. CSP DIRECTIVES & SYNTAX VALIDATION (ALL 9 DIRECTIVES)
    // =========================================================================

    public function test_csp_contains_all_9_required_directives_without_syntax_errors(): void
    {
        $response = $this->get('/login');
        $csp = (string) $response->headers->get('Content-Security-Policy');

        $this->assertNotEmpty($csp, 'Content-Security-Policy header must not be empty');

        // Parse directives by splitting on ';'
        $rawDirectives = array_map('trim', explode(';', $csp));
        $directives = [];
        foreach ($rawDirectives as $dir) {
            if ($dir === '') {
                continue;
            }
            $parts = preg_split('/\s+/', $dir, 2);
            $directiveName = $parts[0];
            $directiveValue = $parts[1] ?? '';
            $this->assertArrayNotHasKey(
                $directiveName,
                $directives,
                "Duplicate CSP directive detected: {$directiveName}"
            );
            $directives[$directiveName] = $directiveValue;
        }

        // Must have exactly 9 directives
        $this->assertCount(9, $directives, 'CSP must contain exactly 9 directives');

        // Directive 1: default-src
        $this->assertArrayHasKey('default-src', $directives);
        $this->assertSame("'self'", $directives['default-src']);

        // Directive 2: script-src
        $this->assertArrayHasKey('script-src', $directives);
        $this->assertSame("'self' 'unsafe-inline'", $directives['script-src']);

        // Directive 3: style-src
        $this->assertArrayHasKey('style-src', $directives);
        $this->assertSame("'self' 'unsafe-inline' https://fonts.googleapis.com", $directives['style-src']);

        // Directive 4: font-src
        $this->assertArrayHasKey('font-src', $directives);
        $this->assertSame("'self' https://fonts.gstatic.com data:", $directives['font-src']);

        // Directive 5: img-src
        $this->assertArrayHasKey('img-src', $directives);
        $this->assertSame("'self' data:", $directives['img-src']);

        // Directive 6: connect-src
        $this->assertArrayHasKey('connect-src', $directives);
        $this->assertSame("'self'", $directives['connect-src']);

        // Directive 7: frame-ancestors
        $this->assertArrayHasKey('frame-ancestors', $directives);
        $this->assertSame("'self'", $directives['frame-ancestors']);

        // Directive 8: base-uri
        $this->assertArrayHasKey('base-uri', $directives);
        $this->assertSame("'self'", $directives['base-uri']);

        // Directive 9: form-action
        $this->assertArrayHasKey('form-action', $directives);
        $this->assertSame("'self'", $directives['form-action']);

        // Syntax Checks:
        // - Keywords 'self' and 'unsafe-inline' must be single-quoted
        // - Unquoted self or unsafe-inline are invalid
        $tokens = preg_split('/\s+|;/', $csp);
        foreach ($tokens as $token) {
            $token = trim($token);
            if ($token === 'self' || $token === 'unsafe-inline' || $token === 'none') {
                $this->fail("Invalid unquoted CSP keyword detected: {$token}");
            }
        }
    }

    // =========================================================================
    // 3. ADVERSARIAL DIRECTORY TRAVERSAL PROBES ON /dist/assets/{file}
    // =========================================================================

    public function test_adversarial_directory_traversal_attempts_blocked_with_404(): void
    {
        $traversalProbes = [
            // Standard dot-dot-slash
            '/dist/assets/../../.env',
            '/dist/assets/../index.html',
            '/dist/assets/../../routes/web.php',
            '/dist/assets/../../../app/Models/User.php',
            '/dist/assets/../../database/database.sqlite',

            // URL encoded dot-dot-slash (%2F)
            '/dist/assets/..%2F..%2F.env',
            '/dist/assets/%2e%2e%2f%2e%2e%2f.env',
            '/dist/assets/..%2findex.html',

            // Windows URL-encoded backslash traversal
            '/dist/assets/..%5C..%5C.env',
            '/dist/assets/%2e%2e%5c%2e%2e%5c.env',

            // Double encoded
            '/dist/assets/..%252F..%252F.env',

            // Dot and directory probes
            '/dist/assets/.',
            '/dist/assets/..',
            '/dist/assets/...',
            '/dist/assets/....//....//.env',

            // Non-existent or probe files
            '/dist/assets/nonexistent.js',
            '/dist/assets/.git/HEAD',
            '/dist/assets/.htaccess',
        ];

        foreach ($traversalProbes as $probe) {
            $response = $this->get($probe);
            $this->assertSame(
                404,
                $response->status(),
                "Adversarial probe [{$probe}] returned status {$response->status()} instead of 404"
            );
        }
    }

    public function test_adversarial_raw_backslash_rejected_at_http_foundation_level(): void
    {
        $this->expectException(BadRequestException::class);
        $this->get('/dist/assets/..\\..\\.env');
    }

    public function test_dist_index_html_strictly_returns_404_and_does_not_exist(): void
    {
        $response = $this->get('/dist/index.html');
        $this->assertSame(404, $response->status(), '/dist/index.html must return 404');

        $this->assertFileDoesNotExist(
            public_path('dist/index.html'),
            'public/dist/index.html must not exist on the filesystem'
        );
    }

    // =========================================================================
    // 4. CACHE-CONTROL HEADER ON VALID ASSETS
    // =========================================================================

    public function test_valid_static_assets_return_immutable_cache_control_and_correct_mimes(): void
    {
        $manifestPath = public_path('dist/manifest.json');
        $this->assertFileExists($manifestPath, 'manifest.json must exist');
        $manifest = json_decode((string) file_get_contents($manifestPath), true);
        $cssFile = basename($manifest['src/auth.css']['file'] ?? '');
        $jsFile = basename($manifest['src/main.js']['file'] ?? '');
        $logoFile = basename($manifest['src/assets/nonthaburi-logo.png']['file'] ?? 'nonthaburi-logo-BxI5auOM.png');

        $assets = [
            $cssFile => 'text/css',
            $jsFile => 'application/javascript',
            $logoFile => 'image/png',
        ];

        foreach ($assets as $filename => $expectedMime) {
            $this->assertFileExists(
                public_path("dist/assets/{$filename}"),
                "Expected static asset public/dist/assets/{$filename} must exist"
            );

            $response = $this->get("/dist/assets/{$filename}");
            $response->assertStatus(200);

            // Verify Cache-Control directives: public, max-age=31536000, immutable
            $cacheControl = (string) $response->headers->get('Cache-Control');
            $this->assertStringContainsString('public', $cacheControl, "Cache-Control must contain 'public'");
            $this->assertStringContainsString('max-age=31536000', $cacheControl, "Cache-Control must contain 'max-age=31536000'");
            $this->assertStringContainsString('immutable', $cacheControl, "Cache-Control must contain 'immutable'");

            // Verify Content-Type
            $contentType = (string) $response->headers->get('Content-Type');
            $this->assertStringStartsWith(
                $expectedMime,
                $contentType,
                "Content-Type for {$filename} must start with {$expectedMime}"
            );

            // Verify security headers also present on static assets served through Laravel
            $this->assertAllSecurityHeadersPresent($response, "Asset {$filename}");
        }
    }
}
