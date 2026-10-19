<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('septic_pumpings', fn (Blueprint $table) => $table->string('location', 500)->nullable()->change());
    }

    public function down(): void
    {
        DB::table('septic_pumpings')->whereNull('location')->update(['location' => '']);
        Schema::table('septic_pumpings', fn (Blueprint $table) => $table->string('location', 500)->nullable(false)->change());
    }
};
