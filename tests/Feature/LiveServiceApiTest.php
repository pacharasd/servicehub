<?php

namespace Tests\Feature;

use App\Models\User;
use App\Support\ServiceCatalog;
use Database\Seeders\ReferenceDataSeeder;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class LiveServiceApiTest extends TestCase
{
    use RefreshDatabase;

    private function administrator(): User
    {
        $this->seed(ReferenceDataSeeder::class);
        $user = User::factory()->create();
        $user->assignRole('super-admin');

        return $user;
    }

    private function reference(string $table): int
    {
        return DB::table($table)->value('id');
    }

    public function test_all_nine_modules_create_update_soft_delete_and_audit(): void
    {
        $user = $this->administrator();
        $this->withSession(['auth_version' => $user->auth_version ?? 0])->actingAs($user, 'web');
        $zone = $this->reference('cleaning_zones');
        $waste = $this->reference('waste_types');
        $payloads = [
            'road-washings' => ['cleaning_zone_id' => $zone, 'location' => 'ถนนสุขุมวิท', 'distance_km' => 2],
            'waterway-cleanings' => ['waterway_name' => 'คลองทดสอบ', 'distance_km' => 2, 'quantity' => 3],
            'road-sweepings' => ['road' => 'ถนนทดสอบ', 'distance_km' => 2],
            'outsourced-cleanings' => ['location' => 'จุดทดสอบ', 'distance_km' => 2, 'community' => 'ชุมชนทดสอบ'],
            'waste-collections' => ['end_date' => '2026-09-29', 'source' => 'แหล่งเก็บ 1', 'waste_type_id' => $waste, 'weight' => 3],
            'drain-cleanings' => ['location' => 'จุดท่อทดสอบ', 'distance_km' => 2, 'sediment_quantity' => 3],
            'septic-pumpings' => ['location' => 'บ้านเลขที่ 123', 'volume' => 3, 'fee_amount' => 10],
            'septic-treatments' => ['sludge_quantity' => 3, 'fertilizer_remaining' => 4, 'microbial_note' => 'ทดสอบ'],
            'waste-management-projects' => ['project_name' => 'โครงการทดสอบ', 'communities_count' => 2, 'participants_count' => 10],
        ];
        foreach ($payloads as $module => $fields) {
            $body = ['service_date' => '2026-09-29', ...$fields];
            $id = $this->postJson('/api/activities/'.$module, $body)->assertCreated()->json('data.id');
            $this->getJson('/api/activities/'.$module.'/'.$id)->assertOk();
            $this->putJson('/api/activities/'.$module.'/'.$id, $body)->assertOk();
            $this->deleteJson('/api/activities/'.$module.'/'.$id)->assertOk();
            $this->getJson('/api/activities/'.$module.'/'.$id)->assertNotFound();
            $this->assertDatabaseHas('audit_logs', ['action' => $module.'.created', 'subject_id' => $id]);
        }
    }

    public function test_road_sweepings_work_without_storage_location(): void
    {
        $user = $this->administrator();
        $this->withSession(['auth_version' => $user->auth_version ?? 0])->actingAs($user, 'web');
        $this->assertFalse(Schema::hasColumn('road_sweepings', 'storage_location'));

        $body = ['service_date' => '2026-10-07', 'road' => 'ถนนเดิม', 'distance_km' => 2.5];
        $id = $this->postJson('/api/activities/road-sweepings', $body)
            ->assertCreated()->assertJsonMissingPath('data.storage_location')->json('data.id');

        // Removing the old column preserves the remaining values on existing rows.
        Schema::table('road_sweepings', function (Blueprint $table) {
            $table->string('storage_location', 500)->nullable();
        });
        DB::table('road_sweepings')->where('id', $id)->update(['storage_location' => 'จุดจัดเก็บเดิม']);
        $migration = require database_path('migrations/2026_10_07_000001_remove_storage_location_from_road_sweepings.php');
        $migration->up();
        // A later migrate remains safe when the column was already removed manually.
        $migration->up();
        $this->assertFalse(Schema::hasColumn('road_sweepings', 'storage_location'));
        $this->getJson('/api/activities/road-sweepings/'.$id)->assertOk()
            ->assertJsonPath('data.service_date', $body['service_date'])
            ->assertJsonPath('data.road', $body['road']);
        $this->assertDatabaseHas('road_sweepings', ['id' => $id, 'distance_km' => 2.5]);

        $body['road'] = 'ถนนแก้ไข';
        $body['distance_km'] = 3.75;
        $this->putJson('/api/activities/road-sweepings/'.$id, $body)->assertOk()
            ->assertJsonPath('data.road', $body['road']);
        $this->getJson('/api/activities/road-sweepings?q='.urlencode($body['road']))
            ->assertOk()->assertJsonPath('meta.total', 1)->assertJsonMissingPath('data.0.storage_location');

        $csv = $this->get('/api/activities/road-sweepings/export')->assertOk()->streamedContent();
        $this->assertStringContainsString('service_date,road,distance_km', $csv);
        $this->assertStringContainsString($body['road'], $csv);
        $this->assertStringNotContainsString('storage_location', $csv);
    }

    public function test_waste_end_date_migration_preserves_legacy_dates_and_weights(): void
    {
        $user = $this->administrator();
        $migration = require database_path('migrations/2026_10_07_000002_add_end_date_to_waste_collections.php');
        $migration->down();
        $id = DB::table('waste_collections')->insertGetId([
            'service_date' => '2026-09-30', 'source' => 'จุดเดิม',
            'waste_type_id' => $this->reference('waste_types'), 'weight' => 12.345,
            'created_by' => $user->id, 'deleted_at' => now(),
        ]);
        $migration->up();
        $migration->up();
        $this->assertDatabaseHas('waste_collections', ['id' => $id, 'service_date' => '2026-09-30', 'end_date' => '2026-09-30', 'weight' => 12.345]);
    }

    public function test_waste_name_removal_preserves_existing_record_and_handles_manual_removal(): void
    {
        $this->administrator();
        Schema::table('waste_collections', function (Blueprint $table) {
            $table->string('waste_name', 255)->nullable();
        });
        $body = ['service_date' => '2026-09-30', 'end_date' => '2026-10-02', 'source' => 'แหล่งเดิม', 'waste_type_id' => $this->reference('waste_types'), 'weight' => 12.345];
        $id = DB::table('waste_collections')->insertGetId([...$body, 'waste_name' => 'ชื่อเดิม']);
        $migration = require database_path('migrations/2026_10_09_000001_remove_waste_name_from_waste_collections.php');
        $migration->up();
        $migration->up();
        $this->assertFalse(Schema::hasColumn('waste_collections', 'waste_name'));
        $this->assertDatabaseHas('waste_collections', ['id' => $id, ...$body]);
    }

    public function test_waste_dates_units_and_cross_month_reporting(): void
    {
        $user = $this->administrator();
        $this->withSession(['auth_version' => $user->auth_version ?? 0])->actingAs($user, 'web');
        $body = ['service_date' => '2026-09-30', 'end_date' => '2026-10-02', 'source' => 'จุดเก็บ', 'waste_type_id' => $this->reference('waste_types'), 'weight' => 12.345];
        foreach (['', '2026-09-29', '2026-02-30', 'invalid'] as $end) {
            $this->postJson('/api/activities/waste-collections', [...$body, 'end_date' => $end])
                ->assertUnprocessable()->assertJsonValidationErrors('end_date');
        }
        $id = $this->postJson('/api/activities/waste-collections', $body)->assertCreated()->json('data.id');
        $this->getJson('/api/activities/waste-collections/'.$id)->assertOk()->assertJsonPath('data.end_date', '2026-10-02')->assertJsonMissingPath('data.waste_name');
        $this->getJson('/api/activities/waste-collections?q='.urlencode('จุดเก็บ').'&from=2026-09-30&to=2026-09-30')->assertOk()->assertJsonPath('meta.total', 1);
        $typeName = DB::table('waste_types')->where('id', $body['waste_type_id'])->value('name');
        $this->getJson('/api/activities/waste-collections?q='.urlencode($typeName))->assertOk()->assertJsonPath('meta.total', 1);
        $this->getJson('/api/dashboard?from=2026-09-01&to=2026-09-30')->assertOk()
            ->assertJsonPath('data.total', 1)->assertJsonPath('data.recent.0.title', $body['source']);
        $this->getJson('/api/reports/waste-collections?from=2026-09-01&to=2026-09-30')->assertOk()
            ->assertJsonPath('data.recent.0.title', $body['source']);
        $this->getJson('/api/activities/waste-collections?from=2026-10-01&to=2026-10-31')->assertOk()->assertJsonPath('meta.total', 0);
        $this->getJson('/api/reports?from=2026-09-01&to=2026-09-30')->assertOk()
            ->assertJsonPath('data.waste-collections.count', 1)
            ->assertJsonPath('data.waste-collections.quantities.weight.0.unit', 'กิโลกรัม');
        $this->getJson('/api/reports?from=2026-10-01&to=2026-10-31')->assertOk()->assertJsonPath('data.waste-collections.count', 0);
        $this->assertDatabaseHas('waste_collections', ['id' => $id, 'weight' => 12.345]);
        $csv = $this->get('/api/activities/waste-collections/export')->assertOk()->streamedContent();
        $this->assertStringContainsString('end_date', $csv);
        $this->assertStringContainsString('weight_kg', $csv);
        $this->assertStringNotContainsString('waste_name', $csv);
        $this->putJson('/api/activities/waste-collections/'.$id, [...$body, 'end_date' => '2026-09-30'])->assertOk();
    }

    public function test_reference_cannot_be_deleted_while_used(): void
    {
        $user = $this->administrator();
        $this->withSession(['auth_version' => $user->auth_version ?? 0])->actingAs($user, 'web');
        $zone = $this->reference('cleaning_zones');
        $roadBody = ['service_date' => '2026-09-29', 'cleaning_zone_id' => $zone, 'location' => 'ถนนสาย 1', 'distance_km' => 2];
        $roadId = $this->postJson('/api/activities/road-washings', $roadBody)->assertCreated()->json('data.id');
        $this->getJson('/api/activities/road-washings?q='.urlencode('เขต 1'))->assertOk()->assertJsonPath('meta.total', 1);
        $this->deleteJson('/api/references/cleaning-zones/'.$zone)->assertStatus(409);
        DB::table('cleaning_zones')->where('id', $zone)->update(['is_active' => false]);
        $this->putJson('/api/activities/road-washings/'.$roadId, $roadBody)->assertOk();
        $this->postJson('/api/activities/road-washings', $roadBody)->assertUnprocessable()->assertJsonValidationErrors('cleaning_zone_id');
    }

    public function test_activity_list_filters_and_paginates_on_the_server(): void
    {
        $user = $this->administrator();
        $this->withSession(['auth_version' => $user->auth_version ?? 0])->actingAs($user, 'web');
        $zone = $this->reference('cleaning_zones');

        for ($index = 1; $index <= 8; $index++) {
            $this->postJson('/api/activities/road-washings', [
                'service_date' => '2026-10-'.str_pad((string) $index, 2, '0', STR_PAD_LEFT),
                'cleaning_zone_id' => $zone,
                'location' => 'ถนนทดสอบ '.$index,
                'distance_km' => 1,
            ])->assertCreated();
        }

        $this->getJson('/api/activities/road-washings?per_page=6&page=2')
            ->assertOk()
            ->assertJsonPath('meta.total', 8)
            ->assertJsonPath('meta.current_page', 2)
            ->assertJsonCount(2, 'data');
        $this->getJson('/api/activities/road-washings?per_page=6&q=ถนนทดสอบ%208')
            ->assertOk()
            ->assertJsonPath('meta.total', 1)
            ->assertJsonCount(1, 'data');
    }

    public function test_activity_search_preserves_text_fields_and_inclusive_date_filters(): void
    {
        $user = $this->administrator();
        $this->withSession(['auth_version' => $user->auth_version ?? 0])->actingAs($user, 'web');
        $wasteType = $this->reference('waste_types');
        DB::table('waste_collections')->insert([
            'service_date' => '2026-10-05',
            'end_date' => '2026-10-05',
            'source' => 'จุดเก็บ',
            'waste_type_id' => $wasteType,
            'weight' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->getJson('/api/activities/waste-collections?q='.urlencode('จุดเก็บ').'&from=2026-10-05&to=2026-10-05')
            ->assertOk()->assertJsonPath('meta.total', 1);
        $this->getJson('/api/activities/waste-collections?q='.urlencode('จุดเก็บ').'&from=2026-10-06')
            ->assertOk()->assertJsonPath('meta.total', 0);
    }

    public function test_reference_usage_counts_exclude_soft_deleted_work_but_preserve_delete_protection(): void
    {
        $user = $this->administrator();
        $this->withSession(['auth_version' => $user->auth_version ?? 0])->actingAs($user, 'web');
        $zone = $this->reference('cleaning_zones');
        $wasteType = $this->reference('waste_types');

        foreach ([
            ['cleaning-zones', $zone, 'road-washings', ['cleaning_zone_id' => $zone, 'location' => 'ถนนทดสอบ', 'distance_km' => 1]],
            ['waste-types', $wasteType, 'waste-collections', ['end_date' => '2026-10-05', 'source' => 'จุดเก็บ', 'waste_type_id' => $wasteType, 'weight' => 1]],
        ] as [$type, $referenceId, $module, $fields]) {
            $id = $this->postJson('/api/activities/'.$module, ['service_date' => '2026-10-05', ...$fields])
                ->assertCreated()->json('data.id');
            $this->getJson('/api/references/'.$type.'/'.$referenceId)
                ->assertOk()->assertJsonPath('data.usage_count', 1)->assertJsonPath('data.referenced_count', 1);
            $this->deleteJson('/api/activities/'.$module.'/'.$id)->assertOk();
            $this->getJson('/api/references/'.$type.'/'.$referenceId)
                ->assertOk()->assertJsonPath('data.usage_count', 0)->assertJsonPath('data.referenced_count', 1);
            $this->deleteJson('/api/references/'.$type.'/'.$referenceId)->assertStatus(409);
        }
    }

    public function test_two_reference_catalogs_support_create_update_search_and_delete(): void
    {
        $user = $this->administrator();
        $this->withSession(['auth_version' => $user->auth_version ?? 0])->actingAs($user, 'web');
        foreach (['cleaning-zones', 'waste-types'] as $type) {
            $body = ['code' => 'TEST-'.strtoupper(substr($type, 0, 3)), 'name' => 'รายการทดสอบ '.$type, 'is_active' => true];
            $id = $this->postJson('/api/references/'.$type, $body)->assertCreated()->json('data.id');
            $this->getJson('/api/references/'.$type.'?q=TEST')->assertOk()->assertJsonFragment(['id' => $id]);
            $body['name'] .= ' แก้ไข';
            $this->putJson('/api/references/'.$type.'/'.$id, $body)->assertOk()->assertJsonPath('data.name', $body['name']);
            $this->deleteJson('/api/references/'.$type.'/'.$id)->assertOk();
            $this->getJson('/api/references/'.$type.'/'.$id)->assertNotFound();
        }
    }

    public function test_dashboard_report_csv_and_audit_reflect_database(): void
    {
        $this->travelTo(now('Asia/Bangkok')->setDate(2026, 9, 29)->setTime(12, 0));
        $user = $this->administrator();
        $this->withSession(['auth_version' => $user->auth_version ?? 0])->actingAs($user, 'web');
        $this->getJson('/api/dashboard')->assertOk()->assertJsonPath('data.total', 0);
        $recordId = $this->postJson('/api/activities/waterway-cleanings', ['service_date' => '2026-09-29', 'waterway_name' => 'คลองทดสอบ', 'distance_km' => 2, 'quantity' => 3])->assertCreated()->json('data.id');
        $this->getJson('/api/dashboard')->assertOk()->assertJsonPath('data.total', 1);
        $this->getJson('/api/reports?from=2026-09-01&to=2026-09-30')->assertOk()->assertJsonPath('data.waterway-cleanings.count', 1);
        $this->get('/api/activities/waterway-cleanings/export')->assertOk()->assertHeader('content-type', 'text/csv; charset=UTF-8');
        $this->getJson('/api/audit-logs')->assertOk()->assertJsonFragment(['action' => 'waterway-cleanings.created']);
        $otherId = $this->postJson('/api/activities/waterway-cleanings', ['service_date' => '2026-09-29', 'waterway_name' => 'คลองสอง', 'distance_km' => 1, 'quantity' => 5])->assertCreated()->json('data.id');
        $this->assertEquals(8, $this->getJson('/api/reports')->assertOk()->json('data.waterway-cleanings.quantities.quantity.0.total'));
        $this->deleteJson('/api/activities/waterway-cleanings/'.$recordId)->assertOk();
        $this->deleteJson('/api/activities/waterway-cleanings/'.$otherId)->assertOk();
        $this->getJson('/api/dashboard')->assertOk()->assertJsonPath('data.total', 0);
        $this->getJson('/api/reports')->assertOk()->assertJsonPath('data.waterway-cleanings.count', 0);
    }

    public function test_role_permissions_are_enforced_on_server_for_every_module(): void
    {
        $this->seed(ReferenceDataSeeder::class);
        $viewer = User::factory()->create();
        $viewer->assignRole('viewer');
        $this->withSession(['auth_version' => $viewer->auth_version ?? 0])->actingAs($viewer, 'web');
        foreach (array_keys(ServiceCatalog::ACTIVITIES) as $module) {
            $this->getJson('/api/activities/'.$module)->assertOk();
            $this->postJson('/api/activities/'.$module, [])->assertForbidden();
            $this->get('/api/activities/'.$module.'/export')->assertForbidden();
        }
        $this->getJson('/api/audit-logs')->assertForbidden();
    }

    public function test_super_admin_bypasses_module_authorization_via_gate_before(): void
    {
        $superAdmin = User::factory()->create();
        Role::findOrCreate('super-admin', 'web');
        $superAdmin->assignRole('super-admin');

        $this->withSession(['auth_version' => $superAdmin->auth_version ?? 0])->actingAs($superAdmin, 'web');
        $this->getJson('/api/activities/road-washings')->assertOk();
    }

    public function test_servicehub_permissions_sync_command_runs_successfully(): void
    {
        $this->artisan('servicehub:permissions:sync')->assertSuccessful();
    }
}
