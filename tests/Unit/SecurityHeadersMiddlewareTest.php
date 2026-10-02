<?php

namespace Tests\Unit;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Tests\TestCase;

/**
 * Unit test for App\Http\Middleware\SecurityHeaders.
 * Validates middleware behavior, CSP directive construction, and response passthrough.
 */
class SecurityHeadersMiddlewareTest extends TestCase
{
    private function middlewareClass(): string
    {
        return 'App\\Http\\Middleware\\SecurityHeaders';
    }

    /**
     * Verify that the SecurityHeaders middleware class exists.
     */
    public function test_security_headers_middleware_class_exists(): void
    {
        $this->assertTrue(
            class_exists($this->middlewareClass()),
            "Middleware class {$this->middlewareClass()} must exist in the application."
        );
    }

    /**
     * Verify that the middleware attaches all 5 required security headers to standard HTTP responses.
     */
    public function test_middleware_attaches_all_five_owasp_security_headers(): void
    {
        $class = $this->middlewareClass();
        if (! class_exists($class)) {
            $this->markTestIncomplete("Class {$class} not yet implemented.");
        }

        $middleware = new $class;
        $request = Request::create('/test-endpoint', 'GET');

        /** @var Response $response */
        $response = $middleware->handle($request, function ($req) {
            return new Response('Content body', 200);
        });

        $this->assertSame('SAMEORIGIN', $response->headers->get('X-Frame-Options'));
        $this->assertSame('nosniff', $response->headers->get('X-Content-Type-Options'));
        $this->assertSame('strict-origin-when-cross-origin', $response->headers->get('Referrer-Policy'));
        $this->assertSame('geolocation=(), camera=(), microphone=()', $response->headers->get('Permissions-Policy'));
        $this->assertNotEmpty($response->headers->get('Content-Security-Policy'));
    }

    /**
     * Verify Content-Security-Policy contains required directives for ServiceHub.
     */
    public function test_middleware_csp_policy_contains_required_directives(): void
    {
        $class = $this->middlewareClass();
        if (! class_exists($class)) {
            $this->markTestIncomplete("Class {$class} not yet implemented.");
        }

        $middleware = new $class;
        $request = Request::create('/', 'GET');

        /** @var Response $response */
        $response = $middleware->handle($request, fn () => new Response('Shell', 200));
        $csp = (string) $response->headers->get('Content-Security-Policy');

        $requiredDirectives = [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline'",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com data:",
            "img-src 'self' data:",
            "connect-src 'self'",
            "frame-ancestors 'self'",
        ];

        foreach ($requiredDirectives as $directive) {
            $this->assertStringContainsString(
                $directive,
                $csp,
                "CSP policy must contain directive: {$directive}"
            );
        }
    }

    /**
     * Verify that the middleware attaches headers to JSON responses and preserves status code and payload.
     */
    public function test_middleware_preserves_json_payload_and_attaches_headers(): void
    {
        $class = $this->middlewareClass();
        if (! class_exists($class)) {
            $this->markTestIncomplete("Class {$class} not yet implemented.");
        }

        $middleware = new $class;
        $request = Request::create('/api/data', 'GET');

        /** @var JsonResponse $response */
        $response = $middleware->handle($request, function ($req) {
            return new JsonResponse(['status' => 'success', 'count' => 42], 201);
        });

        $this->assertSame(201, $response->getStatusCode());
        $this->assertSame('{"status":"success","count":42}', $response->getContent());
        $this->assertSame('SAMEORIGIN', $response->headers->get('X-Frame-Options'));
        $this->assertSame('nosniff', $response->headers->get('X-Content-Type-Options'));
        $this->assertSame('strict-origin-when-cross-origin', $response->headers->get('Referrer-Policy'));
    }
}
