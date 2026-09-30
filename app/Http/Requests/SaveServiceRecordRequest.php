<?php

namespace App\Http\Requests;

use App\Support\ServiceCatalog;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class SaveServiceRecordRequest extends FormRequest
{
    public function authorize(): bool
    {
        $module = (string) $this->route('module');
        ServiceCatalog::activity($module);

        return (bool) $this->user()?->can($module.'.'.($this->isMethod('post') ? 'create' : 'update'));
    }

    public function rules(): array
    {
        $module = (string) $this->route('module');
        $rules = ServiceCatalog::activityRules($module);
        if (! $this->route('record')) {
            return $rules;
        }

        $definition = ServiceCatalog::activity($module);
        $record = DB::table($definition['table'])->whereNull('deleted_at')->find((int) $this->route('record'));
        if (! $record) {
            return $rules;
        }
        foreach ($definition['fields'] as $column => $table) {
            if (in_array($table, ['locations', 'communities', 'cleaning_zones', 'waste_types', 'measurement_units'], true)
                && (string) $this->input($column) === (string) $record->{$column}) {
                $rules[$column] = ['required', 'integer', Rule::exists($table, 'id')];
            }
        }

        return $rules;
    }
}
