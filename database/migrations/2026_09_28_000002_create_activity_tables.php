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
        foreach (self::TABLES as $name) {
            Schema::create($name, function (Blueprint $table) use ($name) {
                $table->id();
                $table->date('service_date')->index();
                $this->fields($name, $table);
                $table->foreignId('created_by')->nullable()->constrained('users')->restrictOnDelete();
                $table->foreignId('updated_by')->nullable()->constrained('users')->restrictOnDelete();
                $table->timestamps();
                $table->softDeletes();
            });
        }
    }

    private function fields(string $name, Blueprint $table): void
    {
        switch ($name) {
            case 'road_washings':
                $table->foreignId('cleaning_zone_id')->constrained('cleaning_zones')->restrictOnDelete();
                $table->string('location', 500);
                $table->decimal('distance_km', 10, 2);
                break;
            case 'waterway_cleanings':
                $table->string('waterway_name', 255);
                $table->decimal('distance_km', 10, 2);
                $table->decimal('quantity', 14, 3);
                $table->foreignId('quantity_unit_id')->nullable()->constrained('measurement_units')->restrictOnDelete();
                break;
            case 'road_sweepings':
                $table->string('road', 255);
                $table->string('storage_location', 500);
                $table->decimal('distance_km', 10, 2);
                break;
            case 'outsourced_cleanings':
                $table->string('location', 500);
                $table->decimal('distance_km', 10, 2);
                $table->string('community', 255);
                $table->foreignId('community_id')->nullable()->constrained('communities')->restrictOnDelete();
                break;
            case 'waste_collections':
                $table->string('source', 500);
                $table->foreignId('waste_type_id')->constrained('waste_types')->restrictOnDelete();
                $table->string('waste_name', 255);
                $table->decimal('weight', 14, 3);
                $table->string('unit', 100);
                $table->foreignId('weight_unit_id')->nullable()->constrained('measurement_units')->restrictOnDelete();
                break;
            case 'drain_cleanings':
                $table->string('location', 500);
                $table->decimal('distance_km', 10, 2);
                $table->decimal('sediment_quantity', 14, 3);
                $table->foreignId('sediment_unit_id')->nullable()->constrained('measurement_units')->restrictOnDelete();
                break;
            case 'septic_pumpings':
                $table->string('location', 500);
                $table->decimal('volume', 14, 3);
                $table->foreignId('volume_unit_id')->nullable()->constrained('measurement_units')->restrictOnDelete();
                $table->decimal('fee_amount', 12, 2);
                break;
            case 'septic_treatments':
                $table->decimal('sludge_quantity', 14, 3);
                $table->foreignId('sludge_unit_id')->nullable()->constrained('measurement_units')->restrictOnDelete();
                $table->decimal('fertilizer_remaining', 14, 3);
                $table->foreignId('fertilizer_unit_id')->nullable()->constrained('measurement_units')->restrictOnDelete();
                $table->text('microbial_note');
                break;
            case 'waste_management_projects':
                $table->string('project_name', 500);
                $table->unsignedInteger('communities_count');
                $table->unsignedInteger('participants_count');
                break;
        }
    }

    public function down(): void
    {
        foreach (array_reverse(self::TABLES) as $name) {
            Schema::dropIfExists($name);
        }
    }
};
