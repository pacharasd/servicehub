<?php

namespace App\Support;

use Illuminate\Validation\Rule;

class ServiceCatalog
{
    public const REFERENCES = [
        'cleaning-zones' => 'cleaning_zones',
        'waste-types' => 'waste_types',
    ];

    public const ACTIVITIES = [
        'road-washings' => ['table' => 'road_washings',           'group' => 'cleaning',   'fields' => ['cleaning_zone_id' => 'cleaning_zones', 'location' => 500, 'distance_km' => 'decimal']],
        'waterway-cleanings' => ['table' => 'waterway_cleanings',      'group' => 'cleaning',   'fields' => ['waterway_name' => 255, 'distance_km' => 'decimal', 'quantity' => 'decimal']],
        'road-sweepings' => ['table' => 'road_sweepings',          'group' => 'cleaning',   'fields' => ['road' => 255, 'distance_km' => 'decimal']],
        'outsourced-cleanings' => ['table' => 'outsourced_cleanings',    'group' => 'cleaning',   'fields' => ['location' => 500, 'distance_km' => 'decimal', 'community' => 255]],
        'waste-collections' => ['table' => 'waste_collections',       'group' => 'waste',      'fields' => ['end_date' => 'date', 'source' => 500, 'waste_type_id' => 'waste_types', 'weight' => 'decimal']],
        'drain-cleanings' => ['table' => 'drain_cleanings',         'group' => 'sanitation', 'fields' => ['location' => 500, 'distance_km' => 'decimal', 'sediment_quantity' => 'decimal']],
        'septic-pumpings' => ['table' => 'septic_pumpings',         'group' => 'sanitation', 'fields' => ['location' => 500, 'volume' => 'decimal', 'fee_amount' => 'decimal']],
        'septic-treatments' => ['table' => 'septic_treatments',       'group' => 'sanitation', 'fields' => ['sludge_quantity' => 'decimal', 'fertilizer_remaining' => 'decimal', 'microbial_note' => 'text']],
        'waste-management-projects' => ['table' => 'waste_management_projects', 'group' => 'projects', 'fields' => ['project_name' => 500, 'communities_count' => 'integer', 'participants_count' => 'integer']],
    ];

    public static function activity(string $module): array
    {
        abort_unless(isset(self::ACTIVITIES[$module]), 404);

        return self::ACTIVITIES[$module];
    }

    public static function reference(string $type): string
    {
        abort_unless(isset(self::REFERENCES[$type]), 404);

        return self::REFERENCES[$type];
    }

    public static function activityRules(string $module): array
    {
        $fields = self::activity($module)['fields'];
        $rules = ['service_date' => ['required', 'date_format:Y-m-d']];
        foreach ($fields as $column => $type) {
            $rules[$column] = match ($type) {
                'decimal' => ['required', 'numeric', 'min:0', 'max:'.match ($column) {
                    'distance_km' => '99999999.99',
                    'fee_amount' => '9999999999.99',
                    default => '99999999999.999',
                }, 'decimal:0,'.(in_array($column, ['distance_km', 'fee_amount'], true) ? 2 : 3)],
                'date' => ['required', 'date_format:Y-m-d', 'after_or_equal:service_date'],
                'integer' => ['required', 'integer', 'min:0', 'max:4294967295'],
                'text' => ['required', 'string', 'max:10000'],
                'cleaning_zones', 'waste_types' => ['required', 'integer', Rule::exists($type, 'id')->where('is_active', true)],
                default => ['required', 'string', 'max:'.$type],
            };
        }

        return $rules;
    }

    public static function referenceRules(string $type, ?int $id = null): array
    {
        $table = self::reference($type);

        return [
            'code' => ['required', 'string', 'max:50', Rule::unique($table, 'code')->ignore($id)],
            'name' => ['required', 'string', 'max:255', Rule::unique($table, 'name')->ignore($id)],
            'is_active' => ['sometimes', 'boolean'],
        ];
    }
}
