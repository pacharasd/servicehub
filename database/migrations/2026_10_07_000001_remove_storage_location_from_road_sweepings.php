<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('road_sweepings', 'storage_location')) {
            Schema::table('road_sweepings', function (Blueprint $table) {
                $table->dropColumn('storage_location');
            });
        }
    }

    public function down(): void
    {
        if (! Schema::hasColumn('road_sweepings', 'storage_location')) {
            Schema::table('road_sweepings', function (Blueprint $table) {
                // Removed values cannot be recovered by rolling back the schema.
                $table->string('storage_location', 500)->nullable();
            });
        }
    }
};
