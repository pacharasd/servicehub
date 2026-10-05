<?php

use Database\Seeders\ReferenceDataSeeder;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Guarantees that production deployments running `php artisan migrate`
     * always have the required system permissions, default roles, and reference catalogs.
     */
    public function up(): void
    {
        (new ReferenceDataSeeder)->run();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // System roles and permissions should not be dropped automatically on rollback.
    }
};
