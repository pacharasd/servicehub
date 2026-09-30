<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SaveReferenceRequest;
use App\Models\ReferenceRecord;
use App\Support\ServiceAudit;
use App\Support\ServiceCatalog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReferenceRecordController extends Controller
{
    private function query(string $type)
    {
        return (new ReferenceRecord)->setTable(ServiceCatalog::reference($type))->newQuery();
    }

    private function authorizeAction(Request $request, string $type, string $action): void
    {
        ServiceCatalog::reference($type);
        abort_unless($request->user()->can($type.'.'.$action), 403);
    }

    public function index(Request $request, string $type): JsonResponse
    {
        $this->authorizeAction($request, $type, 'view');
        $query = $this->query($type);
        if ($request->filled('q')) {
            $term = mb_substr(trim((string) $request->input('q')), 0, 100);
            $query->where(fn ($q) => $q->where('code', 'like', '%'.$term.'%')->orWhere('name', 'like', '%'.$term.'%'));
        }
        if ($request->has('active')) {
            $query->where('is_active', $request->boolean('active'));
        }
        $sort = (string) $request->input('sort', 'code');
        $page = $query->orderBy($sort === 'name' ? 'name' : ($sort === 'newest' ? 'id' : 'code'), $sort === 'newest' ? 'desc' : 'asc')
            ->paginate(min(100, max(1, (int) $request->input('per_page', 20))));

        return response()->json(['data' => $page->items(), 'meta' => ['total' => $page->total(), 'current_page' => $page->currentPage(), 'last_page' => $page->lastPage()]]);
    }

    public function show(Request $request, string $type, int $record): JsonResponse
    {
        $this->authorizeAction($request, $type, 'view');

        return response()->json(['data' => $this->query($type)->findOrFail($record)]);
    }

    public function store(SaveReferenceRequest $request, string $type): JsonResponse
    {
        return DB::transaction(function () use ($request, $type) {
            $item = (new ReferenceRecord)->setTable(ServiceCatalog::reference($type));
            $item->fill($request->validated());
            $item->save();
            ServiceAudit::write($type.'.created', $type, $item->id, null, $item->toArray());

            return response()->json(['data' => $item], 201);
        });
    }

    public function update(SaveReferenceRequest $request, string $type, int $record): JsonResponse
    {
        return DB::transaction(function () use ($request, $type, $record) {
            $item = $this->query($type)->findOrFail($record);
            $before = $item->toArray();
            $item->fill($request->validated());
            $item->save();
            ServiceAudit::write($type.'.updated', $type, $item->id, $before, $item->toArray());

            return response()->json(['data' => $item]);
        });
    }

    public function destroy(Request $request, string $type, int $record): JsonResponse
    {
        $this->authorizeAction($request, $type, 'delete');

        return DB::transaction(function () use ($type, $record) {
            $item = $this->query($type)->findOrFail($record);
            $references = match ($type) {
                'cleaning-zones' => [['road_washings', 'cleaning_zone_id']],
                'waste-types' => [['waste_collections', 'waste_type_id']],
                'communities' => [['outsourced_cleanings', 'community_id']],
                'locations' => [['road_washings', 'location_id'], ['road_sweepings', 'storage_location_id'], ['outsourced_cleanings', 'location_id'], ['waste_collections', 'source_location_id'], ['drain_cleanings', 'location_id'], ['septic_pumpings', 'location_id']],
                'measurement-units' => [['waterway_cleanings', 'quantity_unit_id'], ['waste_collections', 'weight_unit_id'], ['drain_cleanings', 'sediment_unit_id'], ['septic_pumpings', 'volume_unit_id'], ['septic_treatments', 'sludge_unit_id'], ['septic_treatments', 'fertilizer_unit_id']],
            };
            foreach ($references as [$table, $column]) {
                if (DB::table($table)->where($column, $item->id)->exists()) {
                    return response()->json(['message' => 'ข้อมูลนี้ถูกใช้งานอยู่ จึงไม่สามารถลบได้'], 409);
                }
            }
            $before = $item->toArray();
            $item->delete();
            ServiceAudit::write($type.'.deleted', $type, $record, $before, null);

            return response()->json(['message' => 'ลบข้อมูลแล้ว']);
        });
    }
}
