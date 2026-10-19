<?php

namespace App\Support;

class ReportCatalog
{
    public static function module(string $module): array
    {
        $catalog = json_decode(file_get_contents(resource_path('report-catalog.json')), true, flags: JSON_THROW_ON_ERROR);

        return collect($catalog['modules'])->firstWhere('id', $module);
    }
}
