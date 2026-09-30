<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateUserRequest extends FormRequest
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

        if (! $operator || ! $targetUser || ! $operator->can('update', $targetUser)) {
            return false;
        }

        $requestedRole = $this->input('role');
        if ($requestedRole && ! $operator->can('assignRole', [User::class, $requestedRole])) {
            return false;
        }

        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'role' => ['required', 'string', 'exists:roles,name'],
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
                $newRole = $this->input('role');

                if ($operator->hasRole('super-admin') && $newRole !== 'super-admin') {
                    $validator->errors()->add('role', 'ไม่สามารถลดระดับสิทธิ์บัญชีของตนเองได้');
                }

                if ($operator->hasRole('admin') && ! $operator->hasRole('super-admin') && $newRole !== 'admin') {
                    $validator->errors()->add('role', 'ไม่สามารถลดระดับสิทธิ์บัญชีของตนเองได้');
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
            'name.required' => 'กรุณากรอกชื่อ-นามสกุล',
            'name.string' => 'ชื่อ-นามสกุลต้องเป็นข้อความ',
            'name.max' => 'ชื่อ-นามสกุลต้องมีความยาวไม่เกิน 255 ตัวอักษร',
            'role.required' => 'กรุณาเลือกบทบาทการใช้งาน',
            'role.string' => 'บทบาทต้องเป็นข้อความ',
            'role.exists' => 'บทบาทที่เลือกไม่มีอยู่ในระบบ',
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
