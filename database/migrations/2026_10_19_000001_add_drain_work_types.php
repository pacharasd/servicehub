<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('drain_work_types', function (Blueprint $table) {
            $table->id();
            $table->string('code', 50)->unique();
            $table->string('name', 255)->unique();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
        Schema::table('drain_cleanings', function (Blueprint $table) {
            $table->foreignId('drain_work_type_id')->nullable()->constrained('drain_work_types')->restrictOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('drain_cleanings', fn (Blueprint $table) => $table->dropConstrainedForeignId('drain_work_type_id'));
        Schema::dropIfExists('drain_work_types');
    }
};
