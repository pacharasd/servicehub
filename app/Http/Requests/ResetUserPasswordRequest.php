<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ResetUserPasswordRequest extends FormRequest
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

        return (bool) ($operator && $targetUser && $operator->can('resetPassword', $targetUser));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'password' => ['required', 'string', 'min:15', 'max:128'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'password.required' => 'กรุณากรอกรหัสผ่านใหม่',
            'password.string' => 'รหัสผ่านต้องเป็นข้อความ',
            'password.min' => 'รหัสผ่านต้องมีความยาวอย่างน้อย 15 ตัวอักษร',
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
