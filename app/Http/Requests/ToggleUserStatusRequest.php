<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ToggleUserStatusRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $operator = $this->user();
        $targetUser = $this->route('user');
        if (! $targetUser instanceof User) {
            $targetUser = User::find($targetUser);
        }

        return (bool) ($operator && $targetUser && $operator->can('toggleStatus', $targetUser));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'is_active' => ['required', 'boolean'],
        ];
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator(Validator $validator): void
    {
        $validator->after(function ($validator) {
            $operator = $this->user();
            $target = $this->route('user');
            $targetUser = $target instanceof User ? $target : User::find($target);

            if ($targetUser && $operator && (int) $targetUser->id === (int) $operator->id) {
                if (! $this->boolean('is_active')) {
                    $validator->errors()->add('is_active', 'ไม่สามารถระงับการใช้งานบัญชีของตนเองได้');
                }
            }
        });
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'is_active.required' => 'กรุณาระบุสถานะการใช้งาน',
            'is_active.boolean' => 'สถานะการใช้งานต้องเป็นค่าจริงหรือเท็จเท่านั้น',
        ];
    }

    /**
     * Handle a failed validation attempt.
     */
    protected function failedValidation(Validator $validator): void
    {
        $firstError = $validator->errors()->first();

        throw new HttpResponseException(response()->json([
            'message' => $firstError ?: 'ข้อมูลที่ส่งมาไม่ถูกต้อง',
            'errors' => $validator->errors(),
        ], 422));
    }
}
