<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('waste_collections', 'end_date')) {
            Schema::table('waste_collections', function (Blueprint $table) {
                $table->date('end_date')->nullable();
            });
        }
        DB::table('waste_collections')->whereNull('end_date')->update(['end_date' => DB::raw('service_date')]);
        Schema::table('waste_collections', function (Blueprint $table) {
            $table->date('end_date')->nullable(false)->change();
        });
    }

    public function down(): void
    {
        Schema::table('waste_collections', function (Blueprint $table) {
            $table->dropColumn('end_date');
        });
    }
};
