<?php

namespace App\Support;

use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ServiceReports
{
    public function period(Request $request): array
    {
        $filters = $request->validate([
            'month' => ['nullable', 'date_format:Y-m'],
            'from' => ['nullable', 'date_format:Y-m-d'],
            'to' => ['nullable', 'date_format:Y-m-d'],
        ]);
        if (! empty($filters['month']) && (! empty($filters['from']) || ! empty($filters['to']))) {
            throw ValidationException::withMessages(['month' => 'เลือกเดือนหรือช่วงวันที่อย่างใดอย่างหนึ่ง']);
        }

        $today = CarbonImmutable::now('Asia/Bangkok')->startOfDay();
        $monthly = ! empty($filters['month']) || (empty($filters['from']) && empty($filters['to']));
        if ($monthly) {
            $start = ! empty($filters['month'])
                ? CarbonImmutable::createFromFormat('!Y-m', $filters['month'], 'Asia/Bangkok')->startOfMonth()
                : $today->startOfMonth();
            $end = $start->isSameMonth($today) ? $today : $start->endOfMonth()->startOfDay();
            $previousStart = $start->subMonthNoOverflow()->startOfMonth();
            $previousEnd = $start->isSameMonth($today)
                ? $previousStart->addDays(min($today->day, $previousStart->daysInMonth) - 1)
                : $previousStart->endOfMonth()->startOfDay();
        } else {
            $start = CarbonImmutable::parse($filters['from'] ?? $today->startOfMonth()->toDateString(), 'Asia/Bangkok')->startOfDay();
            $end = CarbonImmutable::parse($filters['to'] ?? $today->toDateString(), 'Asia/Bangkok')->startOfDay();
            if ($start->greaterThan($end)) {
                throw ValidationException::withMessages(['to' => 'วันสิ้นสุดต้องไม่ก่อนวันเริ่มต้น']);
            }
            $previousEnd = $start->subDay();
            $previousStart = $previousEnd->subDays((int) $start->diffInDays($end));
        }

        return [
            'from' => $start->toDateString(),
            'to' => $end->toDateString(),
            'comparison_from' => $previousStart->toDateString(),
            'comparison_to' => $previousEnd->toDateString(),
            'mode' => $monthly ? 'month' : 'custom',
        ];
    }

    public function summary(Request $request, array $period, string $permission = 'view'): array
    {
        $data = [];
        $groups = [];
        $daily = [];
        $previousTotal = 0;
        foreach (ServiceCatalog::ACTIVITIES as $module => $definition) {
            if (! $request->user()->can($module.'.'.$permission)) {
                continue;
            }
            $item = $this->module($module, $period);
            $data[$module] = $item;
            $groups[$definition['group']] = ($groups[$definition['group']] ?? 0) + $item['count'];
            $previousTotal += $item['previous_count'];
            foreach ($this->daily($definition['table'], $period) as $day => $count) {
                $daily[$day] = ($daily[$day] ?? 0) + $count;
            }
        }

        return ['data' => $data, 'meta' => [
            'period' => ['from' => $period['from'], 'to' => $period['to']],
            'comparison' => ['from' => $period['comparison_from'], 'to' => $period['comparison_to']],
            'mode' => $period['mode'],
            'total' => array_sum(array_column($data, 'count')),
            'previous_total' => $previousTotal,
            'groups' => $groups,
            'trend' => $this->trend($daily),
        ]];
    }

    public function module(string $module, array $period): array
    {
        $definition = ServiceCatalog::activity($module);
        $table = $definition['table'];
        $current = $this->query($table, $period['from'], $period['to']);
        $previous = $this->query($table, $period['comparison_from'], $period['comparison_to']);
        $count = (clone $current)->count();
        $previousCount = (clone $previous)->count();
        $quantities = [];
        foreach ($definition['fields'] as $column => $kind) {
            if (! in_array($kind, ['decimal', 'integer'], true)) {
                continue;
            }
            $unit = match ($column) {
                'distance_km' => 'กม.',
                'quantity', 'weight' => 'ตัน',
                'sediment_quantity', 'volume' => 'ลบ.ม.',
                'sludge_quantity', 'fertilizer_remaining' => 'กก.',
                'fee_amount' => 'บาท',
                'communities_count' => 'ชุมชน',
                'participants_count' => 'คน',
                default => '',
            };
            if ($column === 'fertilizer_remaining') {
                $latest = (clone $current)->orderByDesc('service_date')->orderByDesc('id')
                    ->first(['service_date', $column]);
                $quantities[$column] = [[
                    'unit' => $unit,
                    'total' => $latest === null ? null : (float) $latest->{$column},
                    'kind' => 'latest',
                    'as_of' => $latest?->service_date,
                ]];
            } else {
                $quantities[$column] = [[
                    'unit' => $unit,
                    'total' => (float) (clone $current)->sum($column),
                    'kind' => 'sum',
                ]];
            }
        }

        return [
            'group' => $definition['group'],
            'count' => $count,
            'previous_count' => $previousCount,
            'change_percent' => $previousCount === 0 ? null : round(($count - $previousCount) * 100 / $previousCount, 1),
            'quantities' => $quantities,
        ];
    }

    public function detail(string $module, array $period): array
    {
        $definition = ServiceCatalog::activity($module);
        $table = $definition['table'];
        $item = $this->module($module, $period);
        $item['trend'] = $this->trend($this->daily($table, $period));
        $reference = match ($module) {
            'road-washings' => ['cleaning_zones', 'cleaning_zone_id', 'distance_km'],
            'waste-collections' => ['waste_types', 'waste_type_id', 'weight'],
            default => null,
        };
        $item['breakdown'] = [];
        if ($reference !== null) {
            [$referenceTable, $foreignKey, $metric] = $reference;
            $item['breakdown'] = $this->query($table, $period['from'], $period['to'])
                ->leftJoin($referenceTable, $table.'.'.$foreignKey, '=', $referenceTable.'.id')
                ->select($referenceTable.'.name as name')
                ->selectRaw('COUNT(*) as count, SUM('.$table.'.'.$metric.') as total')
                ->groupBy($referenceTable.'.id', $referenceTable.'.name')
                ->orderByDesc('count')->get()->map(fn ($row) => [
                    'name' => $row->name ?? 'ไม่พบข้อมูลอ้างอิง',
                    'count' => (int) $row->count,
                    'total' => (float) $row->total,
                    'unit' => $metric === 'weight' ? 'ตัน' : 'กม.',
                ])->all();
        }
        $titleColumn = match ($module) {
            'waterway-cleanings' => 'waterway_name',
            'road-sweepings' => 'road',
            'waste-collections' => 'waste_name',
            'waste-management-projects' => 'project_name',
            'septic-treatments' => 'service_date',
            default => 'location',
        };
        $item['recent'] = $this->query($table, $period['from'], $period['to'])
            ->orderByDesc('service_date')->orderByDesc('id')->limit(5)
            ->get(['id', 'service_date', $titleColumn])
            ->map(fn ($row) => ['id' => $row->id, 'service_date' => $row->service_date, 'title' => $row->{$titleColumn}])->all();

        return $item;
    }

    private function query(string $table, string $from, string $to)
    {
        return DB::table($table)->whereNull($table.'.deleted_at')->whereBetween($table.'.service_date', [$from, $to]);
    }

    private function daily(string $table, array $period): array
    {
        return $this->query($table, $period['from'], $period['to'])
            ->select($table.'.service_date')->selectRaw('COUNT(*) as total')
            ->groupBy($table.'.service_date')->get()
            ->mapWithKeys(fn ($row) => [substr((string) $row->service_date, 0, 10) => (int) $row->total])->all();
    }

    private function trend(array $daily): array
    {
        ksort($daily);

        return array_map(fn ($date, $count) => ['date' => $date, 'count' => $count], array_keys($daily), array_values($daily));
    }
}
