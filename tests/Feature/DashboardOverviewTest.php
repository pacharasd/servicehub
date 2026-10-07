<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\ReferenceDataSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class DashboardOverviewTest extends TestCase
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

    private function add(string $table, array $fields, string $date = '2026-10-05', string $created = '2026-10-05 12:00:00'): int
    {
        return DB::table($table)->insertGetId([
            'service_date' => $date,
            ...($table === 'waste_collections' ? ['end_date' => $date] : []),
            'created_at' => $created,
            'updated_at' => $created,
            ...$fields,
        ]);
    }

    public function test_default_dashboard_is_all_time_and_empty_data_is_explicit(): void
    {
        $this->travelTo(now('Asia/Bangkok')->setDate(2026, 10, 15)->setTime(12, 0));
        $this->signIn();

        $this->getJson('/api/dashboard')->assertOk()
            ->assertJsonPath('data.period.from', null)
            ->assertJsonPath('data.period.to', null)
            ->assertJsonPath('data.period.total', 0)
            ->assertJsonPath('data.total', 0)
            ->assertJsonPath('data.module_summary.road-washings.count', 0)
            ->assertJsonCount(9, 'data.module_summary')
            ->assertJsonCount(0, 'data.recent');
    }

    public function test_default_dashboard_uses_at_most_three_queries_per_ordinary_module(): void
    {
        $this->signIn();
        $queries = [];
        DB::listen(function ($event) use (&$queries): void {
            if (str_contains($event->sql, 'road_washings')) {
                $queries[] = $event->sql;
            }
        });

        $this->getJson('/api/dashboard')->assertOk();

        $this->assertLessThanOrEqual(3, count($queries));
    }

    public function test_default_dashboard_aggregates_across_all_months_when_no_filter_provided(): void
    {
        $this->signIn();
        $zone = DB::table('cleaning_zones')->value('id');
        $this->add('road_washings', ['cleaning_zone_id' => $zone, 'location' => 'งานกันยายน', 'distance_km' => 5], '2026-09-20');
        $this->add('road_washings', ['cleaning_zone_id' => $zone, 'location' => 'งานตุลาคม', 'distance_km' => 10], '2026-10-05');

        // All Time default
        $allTime = $this->getJson('/api/dashboard')->assertOk()->json('data');
        $this->assertNull($allTime['period']['from']);
        $this->assertNull($allTime['period']['to']);
        $this->assertSame(2, $allTime['period']['total']);
        $this->assertSame(2, $allTime['module_summary']['road-washings']['count']);
        $this->assertEquals(15.0, $allTime['module_summary']['road-washings']['metrics']['distance_km']);

        // Explicit month filter
        $octOnly = $this->getJson('/api/dashboard?from=2026-10-01&to=2026-10-31')->assertOk()->json('data');
        $this->assertSame('2026-10-01', $octOnly['period']['from']);
        $this->assertSame('2026-10-31', $octOnly['period']['to']);
        $this->assertSame(1, $octOnly['period']['total']);
        $this->assertSame(2, $octOnly['total']);
        $this->assertSame(1, $octOnly['module_summary']['road-washings']['count']);
        $this->assertEquals(10.0, $octOnly['module_summary']['road-washings']['metrics']['distance_km']);
    }

    public function test_all_time_totals_include_old_records_but_trend_only_reads_displayed_months(): void
    {
        $this->travelTo(now('Asia/Bangkok')->setDate(2026, 10, 15)->setTime(12, 0));
        $this->signIn();
        $zone = DB::table('cleaning_zones')->value('id');
        $this->add('road_washings', ['cleaning_zone_id' => $zone, 'location' => 'งานเก่า', 'distance_km' => 2], '2025-02-01');
        $this->add('road_washings', ['cleaning_zone_id' => $zone, 'location' => 'งานวันนี้', 'distance_km' => 3], '2026-10-15');

        $data = $this->getJson('/api/dashboard')->assertOk()->json('data');
        $this->assertSame(2, $data['total']);
        $this->assertSame(2, $data['period']['total']);
        $this->assertSame(1, $data['today']);
        $this->assertSame(1, array_sum(array_column($data['trend'], 'count')));
    }

    public function test_period_counts_units_latest_balance_soft_deletes_and_recent_creation_order(): void
    {
        $this->signIn();
        $zone = DB::table('cleaning_zones')->value('id');
        $wasteType = DB::table('waste_types')->value('id');
        $this->add('road_washings', ['cleaning_zone_id' => $zone, 'location' => 'ถนนหนึ่ง', 'distance_km' => 2.5], '2026-10-02');
        $this->add('waterway_cleanings', ['waterway_name' => 'คลองหนึ่ง', 'distance_km' => 1, 'quantity' => 3], '2026-10-03');
        $this->add('waste_collections', ['source' => 'จุดหนึ่ง', 'waste_type_id' => $wasteType, 'waste_name' => 'ขยะทั่วไป', 'weight' => 4], '2026-10-04');
        $this->add('drain_cleanings', ['location' => 'ท่อหนึ่ง', 'distance_km' => 1, 'sediment_quantity' => 2]);
        $this->add('septic_pumpings', ['location' => 'บ้านหนึ่ง', 'volume' => 3, 'fee_amount' => 40]);
        $this->add('septic_treatments', ['sludge_quantity' => 2, 'fertilizer_remaining' => 12, 'microbial_note' => 'ครั้งแรก'], '2026-10-01');
        $this->add('septic_treatments', ['sludge_quantity' => 4, 'fertilizer_remaining' => 7, 'microbial_note' => 'ครั้งหลัง'], '2026-10-06');
        $this->add('waste_management_projects', ['project_name' => 'โครงการหนึ่ง', 'communities_count' => 2, 'participants_count' => 9]);
        $this->add('road_washings', ['cleaning_zone_id' => $zone, 'location' => 'งานเดือนก่อน', 'distance_km' => 5], '2026-09-30', '2026-10-10 15:00:00');
        $deleted = $this->add('road_washings', ['cleaning_zone_id' => $zone, 'location' => 'ลบแล้ว', 'distance_km' => 99]);
        DB::table('road_washings')->where('id', $deleted)->update(['deleted_at' => now()]);

        $data = $this->getJson('/api/dashboard?from=2026-10-01&to=2026-10-31')->assertOk()->json('data');
        $this->assertSame(8, $data['period']['total']);
        $this->assertSame(9, $data['total']);
        $this->assertSame(8, array_sum(array_column($data['module_summary'], 'count')));
        $this->assertSame(2, $data['group_summary']['cleaning']);
        $this->assertSame(4, $data['group_summary']['sanitation']);
        $this->assertEquals(2.5, $data['module_summary']['road-washings']['metrics']['distance_km']);
        $this->assertEquals(3, $data['module_summary']['waterway-cleanings']['metrics']['quantity']);
        $this->assertEquals(4, $data['module_summary']['waste-collections']['metrics']['weight']);
        $this->assertEquals(3, $data['module_summary']['septic-pumpings']['metrics']['volume']);
        $this->assertEquals(6, $data['module_summary']['septic-treatments']['metrics']['sludge_quantity']);
        $this->assertEquals(7, $data['module_summary']['septic-treatments']['metrics']['fertilizer_remaining_latest']);
        $this->assertEquals(9, $data['module_summary']['waste-management-projects']['metrics']['participants_count']);
        $this->assertSame('งานเดือนก่อน', $data['recent'][0]['title']);
        $this->assertSame(8, array_sum(array_column($data['trend'], 'count')));
        $this->getJson('/api/dashboard?from=2026-10-03&to=2026-10-03')->assertOk()
            ->assertJsonPath('data.period.total', 1)
            ->assertJsonPath('data.module_summary.waterway-cleanings.count', 1);
        $this->getJson('/api/dashboard?from=2026-09-30&to=2026-09-30')->assertOk()
            ->assertJsonPath('data.period.total', 1)
            ->assertJsonPath('data.total', 9);
    }

    public function test_invalid_date_ranges_are_rejected(): void
    {
        $this->signIn();
        $this->getJson('/api/dashboard?from=2026-13-01&to=2026-10-31')->assertUnprocessable()->assertJsonValidationErrors('from');
        $this->getJson('/api/dashboard?from=2026-11-01&to=2026-10-31')->assertUnprocessable()->assertJsonValidationErrors('to');
    }

    public function test_summary_only_contains_modules_the_user_can_view(): void
    {
        $this->signIn();
        Role::findOrCreate('road-only', 'web')->givePermissionTo('road-washings.view');
        $zone = DB::table('cleaning_zones')->value('id');
        $this->add('road_washings', ['cleaning_zone_id' => $zone, 'location' => 'เห็นได้', 'distance_km' => 1]);
        $this->add('waste_management_projects', ['project_name' => 'ไม่เห็น', 'communities_count' => 1, 'participants_count' => 5]);
        $limited = User::factory()->create();
        $limited->assignRole('road-only');
        $this->withSession(['auth_version' => $limited->auth_version ?? 0])->actingAs($limited, 'web');

        $data = $this->getJson('/api/dashboard?from=2026-10-01&to=2026-10-31')->assertOk()->json('data');
        $this->assertSame(1, $data['period']['total']);
        $this->assertSame(1, $data['total']);
        $this->assertSame(['road-washings'], array_keys($data['module_summary']));
        $this->assertSame('เห็นได้', $data['recent'][0]['title']);
    }
}
