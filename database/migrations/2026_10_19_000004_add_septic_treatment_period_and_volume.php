<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('septic_treatments', 'end_date')) {
            Schema::table('septic_treatments', fn (Blueprint $table) => $table->date('end_date')->nullable());
        }
        if (! Schema::hasColumn('septic_treatments', 'treated_volume')) {
            Schema::table('septic_treatments', fn (Blueprint $table) => $table->decimal('treated_volume', 14, 3)->default(0));
        }
        DB::table('septic_treatments')->whereNull('end_date')->update(['end_date' => DB::raw('service_date')]);
        DB::table('septic_treatments')->whereNull('treated_volume')->update(['treated_volume' => 0]);
        Schema::table('septic_treatments', function (Blueprint $table) {
            $table->date('end_date')->nullable(false)->change();
            $table->decimal('treated_volume', 14, 3)->default(0)->nullable(false)->change();
        });
    }

    public function down(): void
    {
        Schema::table('septic_treatments', fn (Blueprint $table) => $table->dropColumn(['end_date', 'treated_volume']));
    }
};
