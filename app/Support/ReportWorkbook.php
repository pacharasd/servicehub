<?php

namespace App\Support;

use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use PhpOffice\PhpSpreadsheet\Cell\DataType;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ReportWorkbook
{
    public function download(Request $request, ServiceReports $reports, array $period, ?string $module = null): BinaryFileResponse
    {
        $allowed = array_values(array_filter($module ? [$module] : array_keys(ServiceCatalog::ACTIVITIES),
            fn ($id) => $request->user()->can($id.'.export')));
        abort_if($allowed === [], 403);
        $book = new Spreadsheet;
        $summarySheet = $book->getActiveSheet()->setTitle('สรุปภาพรวม');
        $path = null;
        try {
            // Materialize at most 5,000 rows, then derive totals from the same rows.
            [$datasets, $total] = DB::transaction(function () use ($allowed, $period) {
                $datasets = [];
                $total = 0;
                foreach ($allowed as $id) {
                    $table = ServiceCatalog::activity($id)['table'];
                    $query = DB::table($table)->whereNull('deleted_at')->whereBetween('service_date', [$period['from'], $period['to']])
                        ->orderByDesc('service_date')->orderByDesc('id');
                    $rows = [];
                    do {
                        $batch = (clone $query)->offset(count($rows))->limit(min(500, 5001 - $total - count($rows)))->get()->all();
                        array_push($rows, ...$batch);
                    } while (count($batch) === 500 && $total + count($rows) < 5001);
                    $total += count($rows);
                    if ($total > 5000) {
                        throw ValidationException::withMessages(['period' => 'รายงานเกิน 5,000 รายการ กรุณาเลือกช่วงวันที่แคบลง']);
                    }
                    $datasets[$id] = $rows;
                }

                return [$datasets, $total];
            });
            $summary = [['รายงานงานบริการ'], ['ช่วงวันที่', $this->date($period['from']).' – '.$this->date($period['to'])],
                ['สร้างเมื่อ (เวลาไทย)', CarbonImmutable::now('Asia/Bangkok')->format('d/m/').(CarbonImmutable::now('Asia/Bangkok')->year + 543).' '.CarbonImmutable::now('Asia/Bangkok')->format('H:i')],
                ['จำนวนรายการทั้งหมด', $total], ['หมวดงาน', 'จำนวนรายการ', 'ตัวชี้วัด', 'ปริมาณ', 'หน่วย', 'ชนิดค่า', 'วันที่อ้างอิง', 'หมายเหตุ']];
            $references = [];
            foreach (['cleaning_zones', 'waste_types', 'drain_work_types'] as $table) {
                $references[$table] = DB::table($table)->get()->keyBy('id');
            }
            foreach ($datasets as $id => $rows) {
                $definition = ReportCatalog::module($id);
                $schema = ServiceCatalog::activity($id)['fields'];
                $first = true;
                foreach ($definition['fields'] as $field) {
                    if (! in_array($schema[$field['name']] ?? '', ['decimal', 'integer'], true)) {
                        continue;
                    }
                    $latest = $field['name'] === 'fertilizer_remaining';
                    $value = $latest ? ($rows[0]->{$field['name']} ?? null) : array_sum(array_map(fn ($row) => (float) $row->{$field['name']}, $rows));
                    $note = '';
                    if ($field['name'] === 'service_users_count') {
                        $recorded = count(array_filter($rows, fn ($row) => $row->service_users_count !== null));
                        $users = ServiceUsersSummary::make(count($rows), $recorded, (int) $value);
                        $value = $users['total'];
                        $note = ServiceUsersSummary::note($users['coverage']);
                    }
                    $summary[] = [$first ? $definition['label'] : '', $first ? count($rows) : null, $field['label'],
                        $value === null ? ($field['name'] === 'service_users_count' ? 'ยังไม่มีข้อมูลจำนวนผู้ใช้บริการ' : '—') : (float) $value, $field['unit'] ?? '', $latest ? 'ค่าล่าสุด' : 'ผลรวม', $latest && $rows ? $this->date($rows[0]->service_date) : '', $note];
                    $first = false;
                }
                $sheet = $book->createSheet()->setTitle(mb_substr($definition['short'], 0, 31));
                $headers = ['ลำดับ'];
                foreach ($definition['fields'] as $field) {
                    $headers[] = $field['label'].(isset($field['unit']) ? ' ('.$field['unit'].')' : '');
                    if ($field['type'] === 'reference') {
                        $headers[] = 'รหัส'.$field['label'];
                    }
                }
                $contents = [[$definition['label']], ['ช่วงวันที่', $this->date($period['from']).' – '.$this->date($period['to'])], ['จำนวนรายการ', count($rows)], $headers];
                foreach ($rows as $index => $record) {
                    $line = [$index + 1];
                    foreach ($definition['fields'] as $field) {
                        $value = $record->{$field['name']} ?? null;
                        if ($field['type'] === 'reference') {
                            $ref = $references[$schema[$field['name']]][$value] ?? null;
                            $line[] = $ref?->name ?? ($field['name'] === 'drain_work_type_id' && $value === null ? 'ยังไม่ระบุประเภทงาน' : 'ไม่พบข้อมูลอ้างอิง');
                            $line[] = (string) ($ref?->code ?? '');
                        } elseif ($field['type'] === 'date') {
                            $line[] = $value ? $this->date($value) : '';
                        } elseif (in_array($field['type'], ['number', 'integer'], true)) {
                            $line[] = $value === null ? ($field['name'] === 'service_users_count' ? 'ไม่ระบุ' : null) : (float) $value;
                        } else {
                            $line[] = (string) ($value ?? '');
                        }
                    }
                    $contents[] = $line;
                }
                $this->fill($sheet, $contents, 4);
            }
            $this->fill($summarySheet, $summary, 5);
            $book->setActiveSheetIndex(0);
            $directory = storage_path('app/private/report-exports');
            if (! is_dir($directory)) {
                mkdir($directory, 0700, true);
            }
            $path = tempnam($directory, 'report-');
            (new Xlsx($book))->save($path);
            ServiceAudit::write('export_requested', 'report', 0, null, ['module' => $module, 'from' => $period['from'], 'to' => $period['to'], 'format' => 'xlsx', 'count' => $total]);

            return response()->download($path, 'servicehub-'.$period['from'].'-'.$period['to'].'.xlsx',
                ['Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'])->deleteFileAfterSend(true);
        } catch (\Throwable $error) {
            if ($path && is_file($path)) {
                unlink($path);
            }
            throw $error;
        } finally {
            $book->disconnectWorksheets();
        }
    }

    private function date(string $value): string
    {
        $date = CarbonImmutable::parse($value);

        return $date->format('d/m/').($date->year + 543);
    }

    private function fill(Worksheet $sheet, array $rows, int $header): void
    {
        foreach ($rows as $index => $row) {
            foreach ($row as $column => $value) {
                $sheet->setCellValueExplicit([$column + 1, $index + 1], $value,
                    is_int($value) || is_float($value) ? DataType::TYPE_NUMERIC : ($value === null ? DataType::TYPE_NULL : DataType::TYPE_STRING));
            }
        }
        $last = $sheet->getHighestColumn();
        $bottom = max($header, count($rows));
        $sheet->getStyle('A1:'.$last.$bottom)->getAlignment()->setWrapText(true)->setVertical(Alignment::VERTICAL_TOP);
        $sheet->getStyle('A1:'.$last.$bottom)->getFont()->setName('Tahoma')->setSize(11);
        $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(16);
        $sheet->getStyle('A'.$header.':'.$last.$header)->getFont()->setBold(true)->getColor()->setARGB('FFFFFFFF');
        $sheet->getStyle('A'.$header.':'.$last.$header)->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setARGB('FF167A65');
        for ($row = $header + 1; $row <= $bottom; $row++) {
            if ($row % 2 === 0) {
                $sheet->getStyle('A'.$row.':'.$last.$row)->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setARGB('FFF0F6F3');
            }
            foreach ($sheet->getRowIterator($row, $row) as $iterator) {
                foreach ($iterator->getCellIterator() as $cell) {
                    if ($cell->getDataType() === DataType::TYPE_NUMERIC) {
                        $cell->getStyle()->getNumberFormat()->setFormatCode('#,##0.###');
                        $cell->getStyle()->getAlignment()->setHorizontal(Alignment::HORIZONTAL_RIGHT);
                    }
                }
            }
        }
        foreach ($sheet->getColumnIterator() as $column) {
            $sheet->getColumnDimension($column->getColumnIndex())->setWidth($column->getColumnIndex() === 'A' ? 48 : 26);
        }
        $sheet->freezePane('A'.($header + 1));
        $sheet->setAutoFilter('A'.$header.':'.$last.$bottom);
    }
}
