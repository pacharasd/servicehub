<?php

namespace Tests\Feature;

use App\Models\User;
use App\Support\ServiceCatalog;
use Database\Seeders\ReferenceDataSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\Cell\DataType;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Tests\TestCase;

class ReportWorkbookTest extends TestCase
{
    use RefreshDatabase;

    private function signIn(): void
    {
        $this->seed(ReferenceDataSeeder::class);
        $user = User::factory()->create();
        $user->assignRole('super-admin');
        $this->withSession(['auth_version' => $user->auth_version ?? 0])->actingAs($user);
    }

    public function test_workbook_has_all_modules_typed_values_and_consistent_totals(): void
    {
        $this->signIn();
        $zone = DB::table('cleaning_zones')->value('id');
        DB::table('cleaning_zones')->where('id', $zone)->update(['code' => '001', 'name' => '=UNTRUSTED()']);
        DB::table('road_washings')->insert([
            ['service_date' => '2026-10-01', 'cleaning_zone_id' => $zone, 'location' => 'หนึ่ง', 'distance_km' => 12.5, 'deleted_at' => null],
            ['service_date' => '2026-10-02', 'cleaning_zone_id' => $zone, 'location' => '+ข้อความ', 'distance_km' => 0, 'deleted_at' => null],
            ['service_date' => '2026-10-03', 'cleaning_zone_id' => $zone, 'location' => 'ลบแล้ว', 'distance_km' => 100, 'deleted_at' => now()],
        ]);
        $response = $this->get('/api/reports/export?format=xlsx&month=2026-10')->assertOk();
        $path = $response->baseResponse->getFile()->getPathname();
        try {
            $book = IOFactory::load($path);
            $this->assertSame(10, $book->getSheetCount());
            $summary = $book->getSheet(0);
            $this->assertEquals(2, $summary->getCell('B4')->getValue());
            $this->assertEquals(12.5, $summary->getCell('D6')->getValue());
            $this->assertSame('กิโลเมตร', $summary->getCell('E6')->getValue());
            $sheet = $book->getSheet(1);
            $this->assertSame(6, $sheet->getHighestRow());
            $this->assertSame('02/10/2569', $sheet->getCell('B5')->getValue());
            $this->assertSame('001', $sheet->getCell('D5')->getValue());
            $this->assertSame(DataType::TYPE_STRING, $sheet->getCell('C5')->getDataType());
            $this->assertSame('=UNTRUSTED()', $sheet->getCell('C5')->getValue());
            $this->assertSame(DataType::TYPE_NUMERIC, $sheet->getCell('F5')->getDataType());
            $this->assertSame('A5', $sheet->getFreezePane());
            $book->disconnectWorksheets();
        } finally {
            unlink($path);
        }
    }

    public function test_export_boundary_never_truncates_records(): void
    {
        $this->signIn();
        $row = ['service_date' => '2026-10-01', 'road' => 'ถนน', 'distance_km' => 0];
        foreach (range(1, 10) as $batch) {
            DB::table('road_sweepings')->insert(array_fill(0, 500, $row));
        }
        $response = $this->get('/api/reports/road-sweepings/export?format=xlsx&month=2026-10')->assertOk();
        $path = $response->baseResponse->getFile()->getPathname();
        try {
            $book = IOFactory::load($path);
            $this->assertSame(5004, $book->getSheet(1)->getHighestRow());
            $this->assertEquals(5000, $book->getSheet(0)->getCell('B4')->getValue());
            $book->disconnectWorksheets();
        } finally {
            unlink($path);
        }
        DB::table('road_sweepings')->insert($row);
        $this->getJson('/api/reports/export?format=xlsx&month=2026-10')->assertUnprocessable()->assertJsonValidationErrors('period');
        $this->getJson('/api/reports/export?format=pdf')->assertUnprocessable()->assertJsonValidationErrors('format');
    }

    public function test_all_nine_modules_export_their_current_fields_and_original_units(): void
    {
        $this->signIn();
        foreach (ServiceCatalog::ACTIVITIES as $module => $definition) {
            $row = ['service_date' => '2026-10-02'];
            foreach ($definition['fields'] as $field => $kind) {
                $row[$field] = match ($kind) {
                    'date' => '2026-11-01',
                    'decimal' => 3.8,
                    'integer' => 2,
                    'drain_work_types' => DB::table($kind)->insertGetId(['code' => 'TEST', 'name' => 'ประเภททดสอบ', 'is_active' => true]),
                    'cleaning_zones', 'waste_types' => DB::table($kind)->value('id'),
                    default => 'ข้อความภาษาไทยยาวสำหรับตรวจการขึ้นบรรทัด',
                };
            }
            DB::table($definition['table'])->insert($row);
        }
        $response = $this->get('/api/reports/export?format=xlsx&month=2026-10')->assertOk();
        $path = $response->baseResponse->getFile()->getPathname();
        try {
            $book = IOFactory::load($path);
            $this->assertEquals(9, $book->getSheet(0)->getCell('B4')->getValue());
            foreach (range(1, 9) as $index) {
                $this->assertSame(5, $book->getSheet($index)->getHighestRow());
            }
            $water = $book->getSheet(2);
            $this->assertSame('01/11/2569', $water->getCell('C5')->getValue());
            $this->assertStringContainsString('(เมตร)', $water->getCell('E4')->getValue());
            $this->assertEquals(3.8, $water->getCell('E5')->getValue());
            $waste = $book->getSheet(5);
            $this->assertStringContainsString('กิโลกรัม', $waste->getCell('G4')->getValue());
            $this->assertStringContainsString('ชื่อขยะอันตราย', $waste->getCell('H4')->getValue());
            $this->assertEquals(3.8, $waste->getCell('G5')->getValue());
            $drain = $book->getSheet(6);
            $this->assertSame('01/11/2569', $drain->getCell('C5')->getValue());
            $this->assertSame('ประเภททดสอบ', $drain->getCell('E5')->getValue());
            $this->assertSame('TEST', $drain->getCell('F5')->getValue());
            $this->assertStringContainsString('(เมตร)', $drain->getCell('G4')->getValue());
            $this->assertEquals(3.8, $drain->getCell('G5')->getValue());
            $book->disconnectWorksheets();
        } finally {
            unlink($path);
        }
    }

    public function test_excel_respects_export_permission_and_includes_only_authorized_modules(): void
    {
        $this->signIn();
        $user = User::factory()->create();
        $user->givePermissionTo(['road-sweepings.view', 'road-sweepings.export', 'waste-collections.view']);
        $this->withSession(['auth_version' => $user->auth_version ?? 0])->actingAs($user);
        $this->getJson('/api/reports/waste-collections/export?format=xlsx')->assertForbidden();
        $response = $this->get('/api/reports/export?format=xlsx')->assertOk();
        $path = $response->baseResponse->getFile()->getPathname();
        try {
            $book = IOFactory::load($path);
            $this->assertSame(2, $book->getSheetCount());
            $this->assertStringContainsString('กวาด', $book->getSheet(1)->getTitle());
            $book->disconnectWorksheets();
        } finally {
            unlink($path);
        }
    }
}
