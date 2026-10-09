<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\ReferenceDataSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class ServiceReportTest extends TestCase
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

    private function add(string $table, string $date, array $fields): int
    {
        return DB::table($table)->insertGetId([
            'service_date' => $date,
            ...($table === 'waste_collections' ? ['end_date' => $date] : []),
            'created_at' => $date.' 12:00:00',
            'updated_at' => $date.' 12:00:00',
            ...$fields,
        ]);
    }

    public function test_default_current_month_and_historical_month_comparison(): void
    {
        $this->travelTo(now('Asia/Bangkok')->setDate(2026, 10, 15)->setTime(12, 0));
        $this->signIn();

        $this->getJson('/api/reports')->assertOk()
            ->assertJsonPath('meta.period.from', '2026-10-01')
            ->assertJsonPath('meta.period.to', '2026-10-15')
            ->assertJsonPath('meta.comparison.from', '2026-09-01')
            ->assertJsonPath('meta.comparison.to', '2026-09-15')
            ->assertJsonPath('meta.total', 0)
            ->assertJsonCount(9, 'data');
        $this->getJson('/api/reports?month=2026-09')->assertOk()
            ->assertJsonPath('meta.period.to', '2026-09-30')
            ->assertJsonPath('meta.comparison.from', '2026-08-01')
            ->assertJsonPath('meta.comparison.to', '2026-08-31');
    }

    public function test_summary_uses_at_most_three_queries_per_module(): void
    {
        $this->signIn();
        $queries = [];
        DB::listen(function ($event) use (&$queries): void {
            if (str_contains($event->sql, 'road_washings')) {
                $queries[] = $event->sql;
            }
        });

        $this->getJson('/api/reports')->assertOk();

        $this->assertLessThanOrEqual(3, count($queries));
    }

    public function test_counts_metrics_latest_stock_breakdown_trend_and_deleted_records(): void
    {
        $this->signIn();
        $zone = DB::table('cleaning_zones')->value('id');
        $wasteType = DB::table('waste_types')->value('id');
        $this->add('road_washings', '2026-10-02', ['cleaning_zone_id' => $zone, 'location' => 'ถนนหนึ่ง', 'distance_km' => 2]);
        $this->add('road_washings', '2026-09-28', ['cleaning_zone_id' => $zone, 'location' => 'เดือนก่อน', 'distance_km' => 3]);
        $deleted = $this->add('road_washings', '2026-10-03', ['cleaning_zone_id' => $zone, 'location' => 'ลบแล้ว', 'distance_km' => 99]);
        DB::table('road_washings')->where('id', $deleted)->update(['deleted_at' => now()]);
        $this->add('waste_collections', '2026-10-03', ['source' => 'จุดหนึ่ง', 'waste_type_id' => $wasteType, 'weight' => 4]);
        $this->add('septic_treatments', '2026-10-01', ['sludge_quantity' => 2, 'fertilizer_remaining' => 12, 'microbial_note' => 'ครั้งแรก']);
        $this->add('septic_treatments', '2026-10-04', ['sludge_quantity' => 3, 'fertilizer_remaining' => 7, 'microbial_note' => 'ครั้งหลัง']);
        $this->add('waste_management_projects', '2026-10-05', ['project_name' => 'โครงการหนึ่ง', 'communities_count' => 2, 'participants_count' => 9]);

        $data = $this->getJson('/api/reports?from=2026-10-01&to=2026-10-05')->assertOk()->json();
        $this->assertSame(5, $data['meta']['total']);
        $this->assertSame(1, $data['meta']['previous_total']);
        $this->assertSame('2026-09-26', $data['meta']['comparison']['from']);
        $this->assertSame(5, array_sum(array_column($data['data'], 'count')));
        $this->assertEquals(2, $data['data']['road-washings']['quantities']['distance_km'][0]['total']);
        $this->assertEquals(5, $data['data']['septic-treatments']['quantities']['sludge_quantity'][0]['total']);
        $this->assertEquals(7, $data['data']['septic-treatments']['quantities']['fertilizer_remaining'][0]['total']);
        $this->assertSame('latest', $data['data']['septic-treatments']['quantities']['fertilizer_remaining'][0]['kind']);
        $this->assertSame('2026-10-04', $data['data']['septic-treatments']['quantities']['fertilizer_remaining'][0]['as_of']);
        $this->assertEquals(2, $data['data']['waste-management-projects']['quantities']['communities_count'][0]['total']);
        $this->assertEquals(9, $data['data']['waste-management-projects']['quantities']['participants_count'][0]['total']);
        $this->assertSame(5, array_sum(array_column($data['meta']['trend'], 'count')));

        $detail = $this->getJson('/api/reports/road-washings?from=2026-10-01&to=2026-10-05')->assertOk()->json('data');
        $this->assertSame(1, $detail['count']);
        $this->assertSame(1, $detail['previous_count']);
        $this->assertSame(1, $detail['breakdown'][0]['count']);
        $this->assertSame('ถนนหนึ่ง', $detail['recent'][0]['title']);
        $this->assertSame(1, array_sum(array_column($detail['trend'], 'count')));
    }

    public function test_invalid_dates_and_permissions_apply_to_details_and_exports(): void
    {
        $this->signIn();
        $this->getJson('/api/reports?from=2026-11-01&to=2026-10-01')->assertUnprocessable()->assertJsonValidationErrors('to');
        $this->getJson('/api/reports?month=2026-13')->assertUnprocessable()->assertJsonValidationErrors('month');
        $this->getJson('/api/reports?month=2026-10&from=2026-10-01')->assertUnprocessable()->assertJsonValidationErrors('month');
        $this->getJson('/api/reports/road-washings?from=bad&to=2026-10-01')->assertUnprocessable()->assertJsonValidationErrors('from');

        $csvResponse = $this->get('/api/reports/export?from=2026-10-01&to=2026-10-05')->assertOk()->assertHeader('content-type', 'text/csv; charset=UTF-8');
        $csvContent = $csvResponse->streamedContent();
        $this->assertStringStartsWith("\xEF\xBB\xBF", $csvContent);
        $this->assertStringContainsString('ช่วงเริ่ม,ช่วงสิ้นสุด,หมวดงาน,จำนวนรายการ', $csvContent);

        $this->get('/api/reports/road-washings/export?from=2026-10-01&to=2026-10-05')->assertOk();

        Role::findOrCreate('road-only', 'web')->givePermissionTo('road-washings.view');
        $limited = User::factory()->create();
        $limited->assignRole('road-only');
        $this->withSession(['auth_version' => $limited->auth_version ?? 0])->actingAs($limited, 'web');
        $this->getJson('/api/reports?from=2026-10-01&to=2026-10-05')->assertOk()->assertJsonCount(1, 'data');
        $this->getJson('/api/reports/road-washings')->assertOk();
        $this->getJson('/api/reports/waste-collections')->assertForbidden();
        $this->get('/api/reports/export')->assertForbidden();
        $this->get('/api/reports/road-washings/export')->assertForbidden();
    }

    public function test_empty_database_returns_zero_counts_and_null_percentage(): void
    {
        $this->signIn();
        $res = $this->getJson('/api/reports?month=2026-01')->assertOk()->json();
        $this->assertSame(0, $res['meta']['total']);
        $this->assertSame(0, $res['meta']['previous_total']);
        $this->assertNull($res['data']['road-washings']['change_percent']);
        $this->assertSame(0, $res['data']['road-washings']['count']);
        $this->assertSame(0, $res['data']['road-washings']['previous_count']);
        $this->assertNull($res['data']['septic-treatments']['quantities']['fertilizer_remaining'][0]['total']);
        $this->assertNull($res['data']['septic-treatments']['quantities']['fertilizer_remaining'][0]['as_of']);
    }
}
