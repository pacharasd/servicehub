<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\ReferenceDataSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\Cell\DataType;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class SepticPumpingPeriodTest extends TestCase
{
    use RefreshDatabase;

    private function signIn(): User
    {
        $this->seed(ReferenceDataSeeder::class);
        $user = User::factory()->create();
        $user->assignRole('super-admin');
        $this->withSession(['auth_version' => $user->auth_version ?? 0])->actingAs($user);

        return $user;
    }

    private function body(): array
    {
        return ['service_date' => '2026-10-01', 'end_date' => '2026-11-02', 'service_users_count' => 5, 'volume' => 3.8, 'fee_amount' => 100];
    }

    public function test_migration_preserves_legacy_values_and_does_not_invent_users(): void
    {
        $this->signIn();
        $migration = require database_path('migrations/2026_10_19_000002_add_septic_pumping_service_period_and_users.php');
        $migration->down();
        $legacy = ['service_date' => '2026-09-30', 'location' => 'งานเก่า', 'volume' => 3.8, 'fee_amount' => 100];
        $id = DB::table('septic_pumpings')->insertGetId($legacy);
        DB::table('septic_pumpings')->insert([...$legacy, 'deleted_at' => now()]);
        $migration->up();
        $migration->up();
        $this->assertDatabaseHas('septic_pumpings', ['id' => $id, ...$legacy, 'end_date' => '2026-09-30', 'service_users_count' => null]);
        $this->assertSame(2, DB::table('septic_pumpings')->where('end_date', '2026-09-30')->whereNull('service_users_count')->count());
        $this->getJson('/api/activities/septic-pumpings/'.$id)->assertOk()->assertJsonPath('data.service_users_count', null);
        $this->putJson('/api/activities/septic-pumpings/'.$id, [...$legacy, 'end_date' => '2026-09-30'])->assertUnprocessable()->assertJsonValidationErrors('service_users_count');
    }

    public function test_dates_users_crud_search_pagination_and_csv(): void
    {
        $this->signIn();
        $body = $this->body();
        foreach ([null, '', '2026-02-30', '19/10/2569', '2026-09-30'] as $end) {
            $this->postJson('/api/activities/septic-pumpings', [...$body, 'end_date' => $end])->assertUnprocessable()->assertJsonValidationErrors('end_date');
        }
        foreach ([null, '', 0, -1, 1.5, 'ข้อความ', 4294967296] as $users) {
            $this->postJson('/api/activities/septic-pumpings', [...$body, 'service_users_count' => $users])->assertUnprocessable()->assertJsonValidationErrors('service_users_count');
        }
        $this->postJson('/api/activities/septic-pumpings', array_diff_key($body, ['end_date' => true, 'service_users_count' => true]))->assertUnprocessable()->assertJsonValidationErrors(['end_date', 'service_users_count']);
        $id = $this->postJson('/api/activities/septic-pumpings', $body)->assertCreated()->json('data.id');
        $this->getJson('/api/activities/septic-pumpings/'.$id)->assertOk()->assertJsonPath('data.end_date', '2026-11-02')->assertJsonPath('data.service_users_count', 5);
        $this->putJson('/api/activities/septic-pumpings/'.$id, [...$body, 'end_date' => '2026-10-01', 'service_users_count' => 1])->assertOk();
        $this->postJson('/api/activities/septic-pumpings', [...$body, 'service_date' => '2026-10-02'])->assertCreated();
        $this->getJson('/api/activities/septic-pumpings?q=2026-10&from=2026-10-01&to=2026-10-02&per_page=1&page=2')->assertOk()->assertJsonPath('meta.total', 2)->assertJsonPath('data.0.id', $id);
        $csv = $this->get('/api/activities/septic-pumpings/export?from=2026-10-01&to=2026-10-01')->assertOk()->streamedContent();
        $this->assertStringContainsString('service_date,end_date,service_users_count,volume,fee_amount', $csv);
        $this->assertStringNotContainsString('location', $csv);
        $this->assertDatabaseHas('septic_pumpings', ['id' => $id, 'volume' => 3.8, 'fee_amount' => 100]);
    }

    public function test_coverage_totals_filters_permissions_and_exports_are_consistent(): void
    {
        $user = $this->signIn();
        $this->getJson('/api/dashboard')->assertOk()->assertJsonPath('data.module_summary.septic-pumpings.metrics.service_users_count', 0)->assertJsonPath('data.module_summary.septic-pumpings.service_users_coverage', ['recorded' => 0, 'missing' => 0]);
        DB::table('septic_pumpings')->insert([...$this->body(), 'service_users_count' => null]);
        $this->getJson('/api/dashboard')->assertOk()->assertJsonPath('data.module_summary.septic-pumpings.metrics.service_users_count', null);
        $this->getJson('/api/reports/septic-pumpings?month=2026-10')->assertOk()->assertJsonPath('data.metrics.service_users_count', null);
        $unknownCsv = $this->get('/api/reports/septic-pumpings/export?month=2026-10')->assertOk()->streamedContent();
        $this->assertStringContainsString('ยังไม่มีข้อมูลจำนวนผู้ใช้บริการ', $unknownCsv);
        $unknownResponse = $this->get('/api/reports/septic-pumpings/export?month=2026-10&format=xlsx')->assertOk();
        $unknownPath = $unknownResponse->baseResponse->getFile()->getPathname();
        try {
            $unknownBook = IOFactory::load($unknownPath);
            $this->assertSame('ยังไม่มีข้อมูลจำนวนผู้ใช้บริการ', $unknownBook->getSheet(0)->getCell('D6')->getValue());
            $this->assertSame('ไม่ระบุ', $unknownBook->getSheet(1)->getCell('D5')->getValue());
            $unknownBook->disconnectWorksheets();
        } finally {
            unlink($unknownPath);
        }
        DB::table('septic_pumpings')->insert([...$this->body(), 'service_date' => '2026-10-02']);
        DB::table('septic_pumpings')->insert([...$this->body(), 'service_users_count' => 3]);
        DB::table('septic_pumpings')->insert([...$this->body(), 'service_users_count' => 999, 'deleted_at' => now()]);
        DB::table('septic_pumpings')->insert([...$this->body(), 'service_date' => '2026-09-30', 'service_users_count' => 100]);
        $queries = [];
        DB::listen(function ($event) use (&$queries): void {
            if (str_contains($event->sql, 'septic_pumpings')) {
                $queries[] = $event->sql;
            }
        });
        $this->getJson('/api/dashboard?from=2026-10-01&to=2026-10-31')->assertOk()->assertJsonPath('data.module_summary.septic-pumpings.count', 3)->assertJsonPath('data.module_summary.septic-pumpings.metrics.service_users_count', 8)->assertJsonPath('data.module_summary.septic-pumpings.service_users_coverage', ['recorded' => 2, 'missing' => 1]);
        $this->assertCount(4, $queries);
        $this->getJson('/api/reports/septic-pumpings?month=2026-10')->assertOk()->assertJsonPath('data.metrics.service_users_count', 8)->assertJsonPath('data.quantities.service_users_count.0.total', 8)->assertJsonPath('data.quantities.service_users_count.0.note', 'ยังไม่ระบุจำนวน 1 รายการ');
        $this->getJson('/api/dashboard?from=2026-11-01')->assertOk()->assertJsonPath('data.module_summary.septic-pumpings.metrics.service_users_count', 0);
        $this->getJson('/api/dashboard?to=2026-09-30')->assertOk()->assertJsonPath('data.module_summary.septic-pumpings.metrics.service_users_count', 100);
        $csv = $this->get('/api/reports/septic-pumpings/export?month=2026-10')->assertOk()->streamedContent();
        $this->assertStringContainsString('ยังไม่ระบุจำนวน 1 รายการ', $csv);
        $response = $this->get('/api/reports/septic-pumpings/export?month=2026-10&format=xlsx')->assertOk();
        $path = $response->baseResponse->getFile()->getPathname();
        try {
            $book = IOFactory::load($path);
            $summary = $book->getSheet(0);
            $this->assertEquals(8, $summary->getCell('D6')->getValue());
            $this->assertSame('ยังไม่ระบุจำนวน 1 รายการ', $summary->getCell('H6')->getValue());
            $sheet = $book->getSheet(1);
            $this->assertSame(7, $sheet->getHighestRow());
            $this->assertSame('02/11/2569', $sheet->getCell('C5')->getValue());
            $this->assertEquals(5, $sheet->getCell('D5')->getValue());
            $this->assertSame(DataType::TYPE_NUMERIC, $sheet->getCell('D5')->getDataType());
            $this->assertSame('ไม่ระบุ', $sheet->getCell('D7')->getValue());
            $book->disconnectWorksheets();
        } finally {
            unlink($path);
        }
        Role::findOrCreate('road-only', 'web')->givePermissionTo('road-washings.view');
        $user->syncRoles(['road-only']);
        $this->getJson('/api/dashboard')->assertOk()->assertJsonMissingPath('data.module_summary.septic-pumpings');
        $this->getJson('/api/reports/septic-pumpings')->assertForbidden();
        $this->get('/api/activities/septic-pumpings/export')->assertForbidden();
        $this->postJson('/api/activities/septic-pumpings', $this->body())->assertForbidden();
    }

    public function test_location_is_removed_from_api_and_exports_but_legacy_values_are_preserved(): void
    {
        $this->signIn();
        $id = DB::table('septic_pumpings')->insertGetId([...$this->body(), 'location' => 'สถานที่เก่าที่เก็บไว้']);
        $this->getJson('/api/activities/septic-pumpings/'.$id)->assertOk()->assertJsonMissingPath('data.location');
        $this->putJson('/api/activities/septic-pumpings/'.$id, [...$this->body(), 'service_users_count' => 7])->assertOk()->assertJsonMissingPath('data.location');
        $this->assertDatabaseHas('septic_pumpings', ['id' => $id, 'location' => 'สถานที่เก่าที่เก็บไว้', 'service_users_count' => 7]);
        $newId = $this->postJson('/api/activities/septic-pumpings', $this->body())->assertCreated()->assertJsonMissingPath('data.location')->json('data.id');
        $this->assertDatabaseHas('septic_pumpings', ['id' => $newId, 'location' => null]);
        $this->getJson('/api/activities/septic-pumpings?q='.urlencode('สถานที่เก่าที่เก็บไว้'))->assertOk()->assertJsonPath('meta.total', 0);
        $this->getJson('/api/dashboard')->assertOk()->assertJsonPath('data.recent.0.title', 'งานสูบสิ่งปฏิกูล');
        $this->getJson('/api/reports/septic-pumpings?month=2026-10')->assertOk()->assertJsonPath('data.recent.0.title', 'งานสูบสิ่งปฏิกูล');
    }
}
