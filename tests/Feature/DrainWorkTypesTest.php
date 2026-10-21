<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\ReferenceDataSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class DrainWorkTypesTest extends TestCase
{
    use RefreshDatabase;

    private function signIn(string $role = 'super-admin'): User
    {
        $this->seed(ReferenceDataSeeder::class);
        $user = User::factory()->create();
        $user->assignRole($role);
        $this->withSession(['auth_version' => $user->auth_version ?? 0])->actingAs($user, 'web');

        return $user;
    }

    public function test_types_records_inactive_search_export_and_audit(): void
    {
        $this->signIn();
        $this->getJson('/api/references/drain-work-types')->assertOk()->assertJsonPath('meta.total', 0);
        $type = ['code' => '001', 'name' => 'ลอกท่อทดสอบ', 'is_active' => true];
        $id = $this->postJson('/api/references/drain-work-types', $type)->assertCreated()->json('data.id');
        $this->postJson('/api/references/drain-work-types', $type)->assertUnprocessable()->assertJsonValidationErrors(['code', 'name']);
        $body = ['service_date' => '2026-10-01', 'end_date' => '2026-10-02', 'location' => 'ถนนทดสอบ', 'distance_km' => 100, 'sediment_quantity' => 3.8];
        $this->postJson('/api/activities/drain-cleanings', $body)->assertUnprocessable()->assertJsonValidationErrors('drain_work_type_id');
        $this->postJson('/api/activities/drain-cleanings', [...$body, 'drain_work_type_id' => 99999])->assertUnprocessable();
        $body['drain_work_type_id'] = $id;
        $record = $this->postJson('/api/activities/drain-cleanings', $body)->assertCreated()
            ->assertJsonPath('data.drain_work_type', $type['name'])->assertJsonPath('data.drain_work_type_code', '001')->json('data.id');
        $this->getJson('/api/activities/drain-cleanings?q=001')->assertOk()->assertJsonPath('meta.total', 1);
        $this->getJson('/api/activities/drain-cleanings?q='.urlencode($type['name']))->assertOk()->assertJsonPath('meta.total', 1);
        $this->putJson('/api/references/drain-work-types/'.$id, [...$type, 'is_active' => false])->assertOk();
        $this->putJson('/api/activities/drain-cleanings/'.$record, $body)->assertOk();
        $this->postJson('/api/activities/drain-cleanings', $body)->assertUnprocessable();
        $this->deleteJson('/api/references/drain-work-types/'.$id)->assertStatus(409);
        $csv = $this->get('/api/activities/drain-cleanings/export')->assertOk()->streamedContent();
        $this->assertStringContainsString('distance_km', $csv);
        $this->assertStringContainsString($type['name'], $csv);
        $this->assertDatabaseHas('drain_cleanings', ['id' => $record, 'distance_km' => 100, 'sediment_quantity' => 3.8]);
        $this->getJson('/api/references/drain-work-types/'.$id)->assertOk()->assertJsonPath('data.usage_count', 1);
        $this->deleteJson('/api/activities/drain-cleanings/'.$record)->assertOk();
        $this->getJson('/api/references/drain-work-types/'.$id)->assertOk()->assertJsonPath('data.usage_count', 0)->assertJsonPath('data.referenced_count', 1);
        $this->deleteJson('/api/references/drain-work-types/'.$id)->assertStatus(409);
        $this->assertDatabaseHas('audit_logs', ['action' => 'drain-work-types.created', 'subject_id' => $id]);
    }

    public function test_legacy_rows_preserve_values_and_require_a_type_when_saved(): void
    {
        $this->signIn();
        $migration = require database_path('migrations/2026_10_19_000001_add_drain_work_types.php');
        $migration->down();
        $body = ['service_date' => '2026-10-01', 'end_date' => '2026-10-01', 'location' => 'งานเก่า', 'distance_km' => 3.8, 'sediment_quantity' => 100];
        $id = DB::table('drain_cleanings')->insertGetId($body);
        $migration->up();
        $this->assertDatabaseHas('drain_cleanings', ['id' => $id, 'drain_work_type_id' => null, 'distance_km' => 3.8, 'sediment_quantity' => 100]);
        $this->getJson('/api/activities/drain-cleanings/'.$id)->assertOk()->assertJsonPath('data.drain_work_type_id', null);
        $this->putJson('/api/activities/drain-cleanings/'.$id, $body)->assertUnprocessable()->assertJsonValidationErrors('drain_work_type_id');
    }

    public function test_permissions_install_is_additive_and_viewer_cannot_mutate(): void
    {
        $user = $this->signIn('viewer');
        $user->givePermissionTo('road-washings.create');
        $this->artisan('servicehub:install-drain-work-types')->assertExitCode(0);
        $this->artisan('servicehub:install-drain-work-types')->assertExitCode(0);
        $this->assertTrue($user->fresh()->can('road-washings.create'));
        $this->getJson('/api/references/drain-work-types')->assertOk();
        $this->postJson('/api/references/drain-work-types', ['code' => '001', 'name' => 'ทดสอบ'])->assertForbidden();
    }
}
