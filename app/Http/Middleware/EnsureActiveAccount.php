<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureActiveAccount
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->is('login') && $request->isMethod('post') && Auth::check()) {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }

        if (Auth::check()) {
            $user = Auth::user()->fresh();

            if (! $user || ! $user->is_active || $request->session()->get('auth_version') !== $user->auth_version) {
                Auth::logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();

                if ($request->expectsJson() || $request->is('api/*')) {
                    return response()->json([
                        'message' => 'บัญชีผู้ใช้ถูกระงับการใช้งานหรือเซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่',
                    ], 401);
                }

                return redirect()->route('login');
            }
        }

        return $next($request);
    }
}
