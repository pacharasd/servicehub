<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SaveServiceRecordRequest;
use App\Models\ServiceRecord;
use App\Support\ServiceAudit;
use App\Support\ServiceCatalog;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ServiceRecordController extends Controller
{
    private array $referenceCache = [];

    private function query(string $module): Builder
    {
        return (new ServiceRecord)->setTable(ServiceCatalog::activity($module)['table'])->newQuery();
    }

    private function authorizeAction(Request $request, string $module, string $action): void
    {
        ServiceCatalog::activity($module);
        abort_unless($request->user()->can($module.'.'.$action), 403);
    }

    private function filtered(Request $request, string $module): Builder
    {
        $definition = ServiceCatalog::activity($module);
        $query = $this->query($module);
        if ($request->filled('from')) {
            $query->where('service_date', '>=', $request->validate(['from' => 'date_format:Y-m-d'])['from']);
        }
        if ($request->filled('to')) {
            $query->where('service_date', '<=', $request->validate(['to' => 'date_format:Y-m-d'])['to']);
        }
        if ($request->filled('q')) {
            $term = mb_substr(trim((string) $request->input('q')), 0, 100);
            if ($term !== '') {
                $columns = array_keys(array_filter($definition['fields'], fn ($type) => is_int($type) || $type === 'text'));
                $referenceMatches = [];
                foreach ($definition['fields'] as $column => $type) {
                    if (in_array($type, ['cleaning_zones', 'waste_types'], true)) {
                        $referenceMatches[$column] = DB::table($type)->where('name', 'like', '%'.addcslashes($term, '%_\\').'%')->pluck('id')->all();
                    }
                }
                $query->where(function (Builder $subquery) use ($columns, $referenceMatches, $term) {
                    foreach ($columns as $column) {
                        $subquery->orWhere($column, 'like', '%'.addcslashes($term, '%_\\').'%');
                    }
                    foreach ($referenceMatches as $column => $ids) {
                        if ($ids) {
                            $subquery->orWhereIn($column, $ids);
                        }
                    }
                });
            }
        }
        foreach ($definition['fields'] as $column => $type) {
            if (in_array($type, ['cleaning_zones', 'waste_types'], true) && $request->filled($column)) {
                $query->where($column, $request->input($column));
            }
        }

        return $query->orderBy('service_date', $request->input('sort') === 'oldest' ? 'asc' : 'desc')->orderBy('id', 'desc');
    }

    private function decorate(ServiceRecord $record, string $module): array
    {
        $data = $record->toArray();
        $data['id'] = (string) $record->id;
        $data['module'] = $module;
        $data['created_by_id'] = $record->created_by;
        $data['updated_by_id'] = $record->updated_by;
        $data['created_by'] = $record->creator?->name ?? 'ไม่ระบุ';
        $data['updated_by'] = $record->editor?->name ?? 'ไม่ระบุ';
        foreach (ServiceCatalog::activity($module)['fields'] as $column => $table) {
            if (! in_array($table, ['cleaning_zones', 'waste_types'], true) || ! $record->{$column}) {
                continue;
            }
            if (! isset($this->referenceCache[$table])) {
                $this->referenceCache[$table] = DB::table($table)->get()->keyBy('id');
            }
            $ref = $this->referenceCache[$table]->get($record->{$column});
            $label = $ref?->name;
            $alias = match ($column) {
                'cleaning_zone_id' => 'cleaning_zone',
                'waste_type_id' => 'waste_type',
                default => $column,
            };
            $data[$alias] = $label;
        }

        return $data;
    }

    private function payload(array $validated, string $module): array
    {
        return $validated;
    }

    public function index(Request $request, string $module): JsonResponse
    {
        $this->authorizeAction($request, $module, 'view');
        $page = $this->filtered($request, $module)->with(['creator', 'editor'])->paginate(min(100, max(1, (int) $request->input('per_page', 20))));

        return response()->json([
            'data' => $page->getCollection()->map(fn ($record) => $this->decorate($record, $module)),
            'meta' => ['total' => $page->total(), 'current_page' => $page->currentPage(), 'last_page' => $page->lastPage(), 'per_page' => $page->perPage()],
        ]);
    }

    public function show(Request $request, string $module, int $record): JsonResponse
    {
        $this->authorizeAction($request, $module, 'view');

        return response()->json(['data' => $this->decorate($this->query($module)->with(['creator', 'editor'])->findOrFail($record), $module)]);
    }

    public function store(SaveServiceRecordRequest $request, string $module): JsonResponse
    {
        return DB::transaction(function () use ($request, $module) {
            $record = (new ServiceRecord)->setTable(ServiceCatalog::activity($module)['table']);
            $record->fill($this->payload($request->validated(), $module));
            $record->created_by = $request->user()->id;
            $record->updated_by = $request->user()->id;
            $record->save();
            ServiceAudit::write($module.'.created', $module, $record->id, null, $request->validated());

            return response()->json(['data' => $this->decorate($record->load(['creator', 'editor']), $module)], 201);
        });
    }

    public function update(SaveServiceRecordRequest $request, string $module, int $record): JsonResponse
    {
        return DB::transaction(function () use ($request, $module, $record) {
            $item = $this->query($module)->findOrFail($record);
            $before = $item->only(array_keys($request->validated()));
            $item->fill($this->payload($request->validated(), $module));
            $item->updated_by = $request->user()->id;
            $item->save();
            ServiceAudit::write($module.'.updated', $module, $item->id, $before, $request->validated());

            return response()->json(['data' => $this->decorate($item->load(['creator', 'editor']), $module)]);
        });
    }

    public function destroy(Request $request, string $module, int $record): JsonResponse
    {
        $this->authorizeAction($request, $module, 'delete');
        DB::transaction(function () use ($module, $record) {
            $item = $this->query($module)->findOrFail($record);
            $before = $item->only(['service_date', ...array_keys(ServiceCatalog::activity($module)['fields'])]);
            $item->delete();
            ServiceAudit::write($module.'.deleted', $module, $item->id, $before, null);
        });

        return response()->json(['message' => 'ลบรายการแล้ว']);
    }

    public function export(Request $request, string $module): StreamedResponse
    {
        $this->authorizeAction($request, $module, 'export');
        $fields = ServiceCatalog::activity($module)['fields'];
        $columns = ['service_date', ...array_keys($fields)];
        $referenceMaps = [];
        foreach (array_unique(array_values($fields)) as $table) {
            if (in_array($table, ['cleaning_zones', 'waste_types'], true)) {
                $referenceMaps[$table] = DB::table($table)->pluck('name', 'id')->all();
            }
        }
        $query = $this->filtered($request, $module);

        return response()->streamDownload(function () use ($query, $columns, $fields, $referenceMaps) {
            $handle = fopen('php://output', 'w');
            fwrite($handle, "\xEF\xBB\xBF");
            fputcsv($handle, array_map(fn ($column) => $column === 'weight' ? 'weight_kg' : $column, $columns));
            foreach ($query->cursor() as $record) {
                fputcsv($handle, array_map(function ($column) use ($record, $fields, $referenceMaps) {
                    $value = (string) ($record->{$column} ?? '');
                    $table = $fields[$column] ?? null;
                    if ($table && isset($referenceMaps[$table]) && $value !== '') {
                        $value = (string) ($referenceMaps[$table][$value] ?? '');
                    }

                    return preg_match('/^[\s\x00-\x1F]*[=+\-@]/u', $value) ? "'".$value : $value;
                }, $columns));
            }
            fclose($handle);
        }, $module.'.csv', ['Content-Type' => 'text/csv; charset=UTF-8']);
    }
}
