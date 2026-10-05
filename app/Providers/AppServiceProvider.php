<?php

namespace App\Providers;

use App\Support\SecurityAudit;
use Illuminate\Auth\Events\Failed;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Logout;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('api', function (Request $request) {
            $user = $request->user() ?? (auth()->guard('web')->check() ? auth()->guard('web')->user() : null);
            $key = $user?->id ?: $request->ip();

            return Limit::perMinute(60)->by($key);
        });

        Event::listen(Login::class, function (Login $event) {
            if (request()->hasSession()) {
                request()->session()->put('auth_version', $event->user->auth_version);
            }
            SecurityAudit::record('auth.login', $event->user);
        });
        Event::listen(Failed::class, fn () => SecurityAudit::record('auth.login_failed'));
        Event::listen(Logout::class, fn (Logout $event) => SecurityAudit::record('auth.logout', $event->user));
    }
}
