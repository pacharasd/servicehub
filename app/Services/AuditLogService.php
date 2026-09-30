<?php

namespace App\Services;

use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuditLogService
{
    /**
     * Sensitive attribute names that must NEVER be logged.
     *
     * @var list<string>
     */
    private const SENSITIVE_KEYS = [
        'password',
        'password_confirmation',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
        'secret',
        'token',
    ];

    /**
     * Log user creation.
     */
    public static function logUserCreated(User $targetUser, string $role, ?User $actor = null): AuditLog
    {
        return self::record(
            action: 'user.created',
            targetUser: $targetUser,
            before: null,
            after: [
                'name' => $targetUser->name,
                'username' => $targetUser->username,
                'role' => $role,
                'is_active' => (bool) $targetUser->is_active,
            ],
            actorId: $actor?->id
        );
    }

    /**
     * Log user profile or role modification.
     *
     * @param  array<string, mixed>  $before
     * @param  array<string, mixed>  $after
     */
    public static function logUserUpdated(User $targetUser, array $before, array $after, ?User $actor = null): AuditLog
    {
        return self::record(
            action: 'user.updated',
            targetUser: $targetUser,
            before: self::sanitize($before),
            after: self::sanitize($after),
            actorId: $actor?->id
        );
    }

    /**
     * Log user activation or deactivation.
     */
    public static function logUserStatusToggled(User $targetUser, bool $isActive, ?User $actor = null): AuditLog
    {
        $action = $isActive ? 'user.enabled' : 'user.disabled';

        return self::record(
            action: $action,
            targetUser: $targetUser,
            before: ['is_active' => ! $isActive],
            after: ['is_active' => $isActive],
            actorId: $actor?->id
        );
    }

    /**
     * Log administrative password reset without exposing the password.
     */
    public static function logUserPasswordReset(User $targetUser, ?User $actor = null): AuditLog
    {
        return self::record(
            action: 'user.password_reset',
            targetUser: $targetUser,
            before: null,
            after: ['auth_version_incremented' => true],
            actorId: $actor?->id
        );
    }

    /**
     * Log user self-service profile update.
     *
     * @param  array<string, mixed>  $before
     * @param  array<string, mixed>  $after
     */
    public static function logProfileUpdated(User $user, array $before, array $after): AuditLog
    {
        return self::record(
            action: 'profile.updated',
            targetUser: $user,
            before: self::sanitize($before),
            after: self::sanitize($after),
            actorId: $user->id
        );
    }

    /**
     * Log user self-service password change.
     */
    public static function logProfilePasswordChanged(User $user): AuditLog
    {
        return self::record(
            action: 'profile.password_changed',
            targetUser: $user,
            before: null,
            after: ['auth_version_incremented' => true],
            actorId: $user->id
        );
    }

    /**
     * General record creation helper.
     *
     * @param  array<string, mixed>|null  $before
     * @param  array<string, mixed>|null  $after
     */
    public static function record(
        string $action,
        ?User $targetUser = null,
        ?array $before = null,
        ?array $after = null,
        ?int $actorId = null
    ): AuditLog {
        $actor = $actorId ?? Auth::id();
        $ip = request()?->ip();
        $userAgent = request()?->userAgent();

        return AuditLog::create([
            'actor_id' => $actor,
            'action' => $action,
            'subject_type' => $targetUser ? 'user' : null,
            'subject_id' => $targetUser?->id,
            'before' => $before !== null ? self::sanitize($before) : null,
            'after' => $after !== null ? self::sanitize($after) : null,
            'ip_address' => $ip,
            'user_agent' => $userAgent ? mb_substr((string) $userAgent, 0, 1000) : null,
            'created_at' => now(),
        ]);
    }

    /**
     * Deeply sanitize an attribute array, stripping sensitive credentials.
     *
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    public static function sanitize(array $data): array
    {
        $sanitized = [];

        foreach ($data as $key => $value) {
            if (in_array(strtolower((string) $key), self::SENSITIVE_KEYS, true)) {
                continue;
            }

            if (is_array($value)) {
                $sanitized[$key] = self::sanitize($value);
            } else {
                $sanitized[$key] = $value;
            }
        }

        return $sanitized;
    }
}
