<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('waste_collections', 'waste_name')) {
            Schema::table('waste_collections', function (Blueprint $table) {
                $table->dropColumn('waste_name');
            });
        }
    }

    public function down(): void
    {
        if (! Schema::hasColumn('waste_collections', 'waste_name')) {
            Schema::table('waste_collections', function (Blueprint $table) {
                // Removed names cannot be recovered by rolling back the schema.
                $table->string('waste_name', 255)->nullable();
            });
        }
    }
};
