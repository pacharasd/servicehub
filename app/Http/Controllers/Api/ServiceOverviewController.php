<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Support\ServiceCatalog;
use Carbon\CarbonImmutable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ServiceOverviewController extends Controller
{
    public function dashboard(Request $request): JsonResponse
    {
        $filters = $request->validate([
            'from' => ['nullable', 'date_format:Y-m-d'],
            'to' => ['nullable', 'date_format:Y-m-d'],
        ]);
        $today = CarbonImmutable::now('Asia/Bangkok');
        $from = $filters['from'] ?? $today->startOfMonth()->toDateString();
        $to = $filters['to'] ?? $today->endOfMonth()->toDateString();
        if ($from > $to) {
            throw ValidationException::withMessages(['to' => 'วันสิ้นสุดต้องไม่ก่อนวันเริ่มต้น']);
        }

        $summary = [];
        $modules = [];
        $groups = [];
        $recent = [];
        $daily = [];
        foreach (ServiceCatalog::ACTIVITIES as $module => $definition) {
            if (! $request->user()->can($module.'.view')) {
                continue;
            }
            $table = $definition['table'];
            $query = DB::table($table)->whereNull('deleted_at');
            $summary[$module] = (clone $query)->count();
            $periodQuery = (clone $query)->whereBetween('service_date', [$from, $to]);
            $metrics = [];
            foreach ($definition['fields'] as $column => $kind) {
                if ($kind === 'decimal' || $kind === 'integer') {
                    if ($column === 'fertilizer_remaining') {
                        continue;
                    }
                    $metrics[$column] = (float) (clone $periodQuery)->sum($column);
                }
            }
            if ($module === 'septic-treatments') {
                $latest = (clone $periodQuery)->orderByDesc('service_date')->orderByDesc('id')->value('fertilizer_remaining');
                $metrics['fertilizer_remaining_latest'] = $latest === null ? null : (float) $latest;
            }
            $count = (clone $periodQuery)->count();
            $modules[$module] = ['group' => $definition['group'], 'count' => $count, 'metrics' => $metrics];
            $groups[$definition['group']] = ($groups[$definition['group']] ?? 0) + $count;

            foreach ((clone $periodQuery)->select('service_date')->selectRaw('COUNT(*) as total')->groupBy('service_date')->get() as $day) {
                $date = substr((string) $day->service_date, 0, 10);
                $daily[$date] = ($daily[$date] ?? 0) + (int) $day->total;
            }

            $titleColumn = match ($module) {
                'waterway-cleanings' => 'waterway_name',
                'road-sweepings' => 'road',
                'waste-collections' => 'waste_name',
                'waste-management-projects' => 'project_name',
                'septic-treatments' => 'service_date',
                default => 'location',
            };
            foreach ((clone $query)->orderByDesc('created_at')->orderByDesc('id')->limit(5)->get(['id', 'service_date', 'created_at', $titleColumn]) as $row) {
                $recent[] = ['id' => $row->id, 'module' => $module, 'title' => $row->{$titleColumn}, 'service_date' => $row->service_date, 'created_at' => $row->created_at];
            }
        }
        usort($recent, fn ($a, $b) => [($b['created_at'] ?? ''), $b['id']] <=> [($a['created_at'] ?? ''), $a['id']]);

        $start = CarbonImmutable::parse($from, 'Asia/Bangkok');
        $end = CarbonImmutable::parse($to, 'Asia/Bangkok');
        $monthly = $start->diffInDays($end) > 62;
        $trend = [];
        for ($cursor = $start; $cursor->lte($end); $cursor = $monthly ? $cursor->startOfMonth()->addMonth() : $cursor->addWeek()) {
            $bucketEnd = $monthly ? $cursor->endOfMonth()->min($end) : $cursor->addDays(6)->min($end);
            $bucketCount = 0;
            foreach ($daily as $day => $value) {
                if ($day >= $cursor->toDateString() && $day <= $bucketEnd->toDateString()) {
                    $bucketCount += $value;
                }
            }
            $trend[] = ['from' => $cursor->toDateString(), 'to' => $bucketEnd->toDateString(), 'count' => $bucketCount];
        }

        return response()->json(['data' => [
            'total' => array_sum($summary),
            'today' => $this->todayCount($request),
            'groups' => $summary,
            'recent' => array_slice($recent, 0, 10),
            'period' => ['from' => $from, 'to' => $to, 'total' => array_sum(array_column($modules, 'count'))],
            'group_summary' => $groups,
            'module_summary' => $modules,
            'trend' => $trend,
        ]]);
    }

    private function todayCount(Request $request): int
    {
        $count = 0;
        foreach (ServiceCatalog::ACTIVITIES as $module => $definition) {
            if ($request->user()->can($module.'.view')) {
                $count += DB::table($definition['table'])->whereNull('deleted_at')->whereDate('service_date', now('Asia/Bangkok')->toDateString())->count();
            }
        }

        return $count;
    }

    public function report(Request $request): JsonResponse
    {
        $filters = $request->validate(['from' => 'nullable|date_format:Y-m-d', 'to' => 'nullable|date_format:Y-m-d']);
        $result = [];
        foreach (ServiceCatalog::ACTIVITIES as $module => $definition) {
            if (! $request->user()->can($module.'.view')) {
                continue;
            }
            $query = DB::table($definition['table'])->whereNull('deleted_at');
            if (! empty($filters['from'])) {
                $query->whereDate('service_date', '>=', $filters['from']);
            }
            if (! empty($filters['to'])) {
                $query->whereDate('service_date', '<=', $filters['to']);
            }
            $item = ['count' => (clone $query)->count(), 'quantities' => []];
            foreach ($definition['fields'] as $column => $kind) {
                if ($kind !== 'decimal') {
                    continue;
                }
                $unit = match ($column) {
                    'distance_km' => 'กม.',
                    'quantity', 'weight' => 'ตัน',
                    'sediment_quantity', 'volume' => 'ลบ.ม.',
                    'sludge_quantity', 'fertilizer_remaining' => 'กก.',
                    'fee_amount' => 'บาท',
                    default => '',
                };
                $item['quantities'][$column] = [['unit' => $unit, 'total' => (clone $query)->sum($column)]];
            }
            $result[$module] = $item;
        }

        return response()->json(['data' => $result]);
    }

    public function audit(Request $request): JsonResponse
    {
        abort_unless($request->user()->can('audit-logs.view'), 403);
        $query = DB::table('audit_logs')->leftJoin('users', 'audit_logs.actor_id', '=', 'users.id')->select('audit_logs.*', 'users.username as actor_username');
        if ($request->filled('q')) {
            $term = mb_substr(trim((string) $request->input('q')), 0, 100);
            $query->where(fn ($q) => $q->where('audit_logs.action', 'like', '%'.$term.'%')->orWhere('audit_logs.subject_type', 'like', '%'.$term.'%')->orWhere('users.username', 'like', '%'.$term.'%'));
        }
        $page = $query->orderByDesc('audit_logs.id')->paginate(min(100, max(1, (int) $request->input('per_page', 20))));

        return response()->json(['data' => $page->items(), 'meta' => ['total' => $page->total(), 'current_page' => $page->currentPage(), 'last_page' => $page->lastPage()]]);
    }
}
