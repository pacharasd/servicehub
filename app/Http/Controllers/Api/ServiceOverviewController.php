<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Support\ServiceCatalog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ServiceOverviewController extends Controller
{
    public function dashboard(Request $request): JsonResponse
    {
        $summary = [];
        $recent = [];
        foreach (ServiceCatalog::ACTIVITIES as $module => $definition) {
            if (! $request->user()->can($module.'.view')) {
                continue;
            }
            $table = $definition['table'];
            $query = DB::table($table)->whereNull('deleted_at');
            $summary[$module] = (clone $query)->count();
            foreach ((clone $query)->orderByDesc('service_date')->orderByDesc('id')->limit(5)->get(['id', 'service_date', 'created_at']) as $row) {
                $recent[] = ['id' => $row->id, 'module' => $module, 'service_date' => $row->service_date, 'created_at' => $row->created_at];
            }
        }
        usort($recent, fn ($a, $b) => strcmp($b['service_date'], $a['service_date']));

        return response()->json(['data' => ['total' => array_sum($summary), 'today' => $this->todayCount($request), 'groups' => $summary, 'recent' => array_slice($recent, 0, 10)]]);
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
