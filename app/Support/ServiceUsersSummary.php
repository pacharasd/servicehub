<?php

namespace App\Support;

class ServiceUsersSummary
{
    public static function make(int $records, int $recorded, int $sum): array
    {
        return [
            'total' => $records > 0 && $recorded === 0 ? null : $sum,
            'coverage' => ['recorded' => $recorded, 'missing' => $records - $recorded],
        ];
    }

    public static function note(array $coverage): string
    {
        return $coverage['missing'] > 0 ? 'ยังไม่ระบุจำนวน '.$coverage['missing'].' รายการ' : '';
    }
}
