<?php

namespace App\Support;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class SecurityAudit
{
    public static function record(string $action, ?User $user = null): void
    {
        DB::table('audit_logs')->insert([
            'actor_id' => $user?->id,
            'action' => $action,
            'subject_type' => $user ? 'user' : null,
            'subject_id' => $user?->id,
            'ip_address' => request()->ip(),
            'user_agent' => mb_substr((string) request()->userAgent(), 0, 1000),
            'created_at' => now(),
        ]);
    }
}
