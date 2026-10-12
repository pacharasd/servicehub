<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('waste_collections', 'hazardous_waste_name')) {
            Schema::table('waste_collections', function (Blueprint $table) {
                $table->string('hazardous_waste_name', 255)->nullable();
            });
        }
    }

    public function down(): void
    {
        Schema::table('waste_collections', function (Blueprint $table) {
            $table->dropColumn('hazardous_waste_name');
        });
    }
};
