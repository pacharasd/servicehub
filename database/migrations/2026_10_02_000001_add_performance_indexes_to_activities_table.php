<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private const TABLES = [
        'road_washings', 'waterway_cleanings', 'road_sweepings',
        'outsourced_cleanings', 'waste_collections', 'drain_cleanings',
        'septic_pumpings', 'septic_treatments', 'waste_management_projects',
    ];

    public function up(): void
    {
        foreach (self::TABLES as $table) {
            Schema::table($table, function (Blueprint $blueprint) use ($table) {
                $blueprint->index(['service_date', 'deleted_at'], "{$table}_date_del_idx");
            });
        }
    }

    public function down(): void
    {
        foreach (self::TABLES as $table) {
            Schema::table($table, function (Blueprint $blueprint) use ($table) {
                $blueprint->dropIndex("{$table}_date_del_idx");
            });
        }
    }
};
