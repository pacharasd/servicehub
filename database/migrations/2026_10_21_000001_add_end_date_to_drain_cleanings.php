<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('drain_cleanings', 'end_date')) {
            Schema::table('drain_cleanings', fn (Blueprint $table) => $table->date('end_date')->nullable());
        }
        DB::table('drain_cleanings')->whereNull('end_date')->update(['end_date' => DB::raw('service_date')]);
        Schema::table('drain_cleanings', fn (Blueprint $table) => $table->date('end_date')->nullable(false)->change());
    }

    public function down(): void
    {
        if (Schema::hasColumn('drain_cleanings', 'end_date')) {
            Schema::table('drain_cleanings', fn (Blueprint $table) => $table->dropColumn('end_date'));
        }
    }
};
