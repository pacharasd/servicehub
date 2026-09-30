<?php

namespace App\Http\Requests;

use App\Support\ServiceCatalog;
use Illuminate\Foundation\Http\FormRequest;

class SaveReferenceRequest extends FormRequest
{
    public function authorize(): bool
    {
        $type = (string) $this->route('type');
        ServiceCatalog::reference($type);

        return (bool) $this->user()?->can($type.'.'.($this->isMethod('post') ? 'create' : 'update'));
    }

    public function rules(): array
    {
        return ServiceCatalog::referenceRules((string) $this->route('type'), $this->route('record') ? (int) $this->route('record') : null);
    }
}
