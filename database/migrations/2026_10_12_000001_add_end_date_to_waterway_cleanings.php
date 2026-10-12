<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('waterway_cleanings', 'end_date')) {
            Schema::table('waterway_cleanings', function (Blueprint $table) {
                $table->date('end_date')->nullable();
            });
        }
        DB::table('waterway_cleanings')->whereNull('end_date')->update(['end_date' => DB::raw('service_date')]);
        Schema::table('waterway_cleanings', function (Blueprint $table) {
            $table->date('end_date')->nullable(false)->change();
        });
    }

    public function down(): void
    {
        Schema::table('waterway_cleanings', function (Blueprint $table) {
            $table->dropColumn('end_date');
        });
    }
};
