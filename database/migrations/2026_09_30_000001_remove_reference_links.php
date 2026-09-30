<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // ── Drop location FK columns ────────────────────────────────────────
        foreach ([
            'road_washings' => 'location_id',
            'outsourced_cleanings' => 'location_id',
            'road_sweepings' => 'storage_location_id',
            'waste_collections' => 'source_location_id',
            'drain_cleanings' => 'location_id',
            'septic_pumpings' => 'location_id',
        ] as $table => $column) {
            Schema::table($table, fn (Blueprint $t) => $t->dropConstrainedForeignId($column));
        }

        // ── Drop community FK column ────────────────────────────────────────
        Schema::table('outsourced_cleanings', fn (Blueprint $t) => $t->dropConstrainedForeignId('community_id'));

        // ── Drop measurement_unit FK columns ────────────────────────────────
        Schema::table('waterway_cleanings', fn (Blueprint $t) => $t->dropConstrainedForeignId('quantity_unit_id'));
        Schema::table('waste_collections', fn (Blueprint $t) => $t->dropConstrainedForeignId('weight_unit_id'));
        Schema::table('drain_cleanings', fn (Blueprint $t) => $t->dropConstrainedForeignId('sediment_unit_id'));
        Schema::table('septic_pumpings', fn (Blueprint $t) => $t->dropConstrainedForeignId('volume_unit_id'));
        Schema::table('septic_treatments', function (Blueprint $t) {
            $t->dropConstrainedForeignId('sludge_unit_id');
            $t->dropConstrainedForeignId('fertilizer_unit_id');
        });

        // ── Drop obsolete unit text column in waste_collections ─────────────
        Schema::table('waste_collections', fn (Blueprint $t) => $t->dropColumn('unit'));

        // ── Drop the three reference tables ─────────────────────────────────
        Schema::dropIfExists('communities');
        Schema::dropIfExists('locations');
        Schema::dropIfExists('measurement_units');
    }

    public function down(): void
    {
        // Recreate the three reference tables
        foreach (['communities', 'locations', 'measurement_units'] as $table) {
            Schema::create($table, function (Blueprint $t) {
                $t->id();
                $t->string('code', 50)->unique();
                $t->string('name', 255)->unique();
                $t->timestamps();
            });
        }

        // Restore is_active on remaining reference tables (already on cleaning_zones/waste_types)
        // Note: full reversal of FK columns omitted – run migrate:fresh to restore from scratch
    }
};
