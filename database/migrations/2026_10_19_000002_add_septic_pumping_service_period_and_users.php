<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('septic_pumpings', 'end_date')) {
            Schema::table('septic_pumpings', fn (Blueprint $table) => $table->date('end_date')->nullable());
        }
        if (! Schema::hasColumn('septic_pumpings', 'service_users_count')) {
            Schema::table('septic_pumpings', fn (Blueprint $table) => $table->unsignedInteger('service_users_count')->nullable());
        }
        DB::table('septic_pumpings')->whereNull('end_date')->update(['end_date' => DB::raw('service_date')]);
        Schema::table('septic_pumpings', fn (Blueprint $table) => $table->date('end_date')->nullable(false)->change());
    }

    public function down(): void
    {
        Schema::table('septic_pumpings', fn (Blueprint $table) => $table->dropColumn(['end_date', 'service_users_count']));
    }
};
