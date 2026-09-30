<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $operator = $this->user();
        if (! $operator || ! $operator->can('create', User::class)) {
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
            'username' => [
                'required',
                'string',
                'min:3',
                'max:100',
                'regex:/^[a-zA-Z0-9._-]+$/',
                'unique:users,username',
            ],
            'password' => [
                'required',
                'string',
                'min:15',
                'max:128',
                function ($attribute, $value, $fail) {
                    if (trim((string) $value) === '') {
                        $fail('รหัสผ่านต้องไม่เป็นช่องว่างล้วน');
                    }
                },
            ],
            'role' => ['required', 'string', 'exists:roles,name'],
        ];
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator(Validator $validator): void
    {
        $validator->after(function ($validator) {
            $raw = json_decode($this->getContent(), true);
            $rawUsername = is_array($raw) && isset($raw['username']) ? $raw['username'] : $this->input('username');

            if (is_string($rawUsername) && (preg_match('/\s/', $rawUsername) || trim($rawUsername) !== $rawUsername)) {
                $validator->errors()->add('username', 'ชื่อผู้ใช้ต้องประกอบด้วยตัวอักษรภาษาอังกฤษ ตัวเลข จุด ขีดกลาง หรือขีดล่างเท่านั้น');
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
            'username.required' => 'กรุณากรอกชื่อผู้ใช้',
            'username.string' => 'ชื่อผู้ใช้ต้องเป็นข้อความ',
            'username.min' => 'ชื่อผู้ใช้ต้องมีความยาวอย่างน้อย 3 ตัวอักษร',
            'username.max' => 'ชื่อผู้ใช้ต้องมีความยาวไม่เกิน 100 ตัวอักษร',
            'username.regex' => 'ชื่อผู้ใช้ต้องประกอบด้วยตัวอักษรภาษาอังกฤษ ตัวเลข จุด ขีดกลาง หรือขีดล่างเท่านั้น',
            'username.unique' => 'ชื่อผู้ใช้นี้มีอยู่ในระบบแล้ว',
            'password.required' => 'กรุณากรอกรหัสผ่าน',
            'password.string' => 'รหัสผ่านต้องเป็นข้อความ',
            'password.min' => 'รหัสผ่านต้องมีความยาวอย่างน้อย 15 ตัวอักษร',
            'role.required' => 'กรุณาเลือกบทบาทการใช้งาน',
            'role.string' => 'บทบาทต้องเป็นข้อความ',
            'role.exists' => 'บทบาทที่เลือกไม่ถูกต้อง',
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
