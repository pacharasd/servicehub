<?php

namespace App\Providers;

use App\Support\SecurityAudit;
use Illuminate\Auth\Events\Failed;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Logout;
use Illuminate\Support\Facades\Event;
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
