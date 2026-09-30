<?php

namespace App\Support;

use Illuminate\Support\Facades\DB;

class ServiceAudit
{
    public static function write(string $action, string $type, int $id, ?array $before, ?array $after): void
    {
        DB::table('audit_logs')->insert([
            'actor_id' => auth()->id(),
            'action' => $action,
            'subject_type' => $type,
            'subject_id' => $id,
            'before' => $before === null ? null : json_encode($before, JSON_UNESCAPED_UNICODE),
            'after' => $after === null ? null : json_encode($after, JSON_UNESCAPED_UNICODE),
            'ip_address' => request()->ip(),
            'user_agent' => mb_substr((string) request()->userAgent(), 0, 1000),
            'created_at' => now(),
        ]);
    }
}
