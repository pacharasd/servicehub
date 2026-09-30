<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        foreach (['cleaning_zones', 'waste_types', 'measurement_units', 'communities', 'locations'] as $table) {
            Schema::table($table, function (Blueprint $blueprint) {
                $blueprint->boolean('is_active')->default(true)->index();
            });
        }

        foreach ([
            'road_washings' => 'location_id',
            'outsourced_cleanings' => 'location_id',
            'road_sweepings' => 'storage_location_id',
            'waste_collections' => 'source_location_id',
            'drain_cleanings' => 'location_id',
            'septic_pumpings' => 'location_id',
        ] as $table => $column) {
            Schema::table($table, function (Blueprint $blueprint) use ($column) {
                $blueprint->foreignId($column)->nullable()->constrained('locations')->restrictOnDelete();
            });
        }

        $exampleIds = DB::table('cleaning_zones')->whereIn('name', ['เขตตัวอย่าง 1', 'เขตตัวอย่าง 2'])->pluck('id');
        foreach ($exampleIds as $id) {
            if (! DB::table('road_washings')->where('cleaning_zone_id', $id)->exists()) {
                DB::table('cleaning_zones')->where('id', $id)->delete();
            }
        }
    }

    public function down(): void
    {
        foreach ([
            'road_washings' => 'location_id',
            'outsourced_cleanings' => 'location_id',
            'road_sweepings' => 'storage_location_id',
            'waste_collections' => 'source_location_id',
            'drain_cleanings' => 'location_id',
            'septic_pumpings' => 'location_id',
        ] as $table => $column) {
            Schema::table($table, fn (Blueprint $blueprint) => $blueprint->dropConstrainedForeignId($column));
        }

        foreach (['cleaning_zones', 'waste_types', 'measurement_units', 'communities', 'locations'] as $table) {
            Schema::table($table, fn (Blueprint $blueprint) => $blueprint->dropColumn('is_active'));
        }
    }
};
