<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\ReferenceDataSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class UserDirectoryApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(ReferenceDataSeeder::class);
    }

    /**
     * Create an authenticated administrator user with full permissions.
     */
    protected function createAdmin(array $attributes = [], string $role = 'super-admin'): User
    {
        $user = User::factory()->create(array_merge([
            'username' => 'admin_'.bin2hex(random_bytes(4)),
            'name' => 'ผู้ดูแลระบบ ทดสอบ',
            'is_active' => true,
            'auth_version' => 0,
        ], $attributes));

        $roleModel = Role::findOrCreate($role, 'web');
        $user->assignRole($roleModel);

        if ($role === 'admin') {
            $permissions = ['users.view', 'users.create', 'users.update', 'users.disable', 'roles.view'];
            foreach ($permissions as $perm) {
                Permission::findOrCreate($perm, 'web');
            }
            $user->givePermissionTo($permissions);
        }

        return $user;
    }

    /**
     * Create a standard staff user.
     */
    protected function createStaff(array $attributes = []): User
    {
        $user = User::factory()->create(array_merge([
            'username' => 'staff_'.bin2hex(random_bytes(4)),
            'name' => 'เจ้าหน้าที่ ทั่วไป',
            'is_active' => true,
            'auth_version' => 0,
        ], $attributes));

        $user->assignRole(Role::findOrCreate('staff', 'web'));

        return $user;
    }

    /**
     * Authenticate and initialize a valid session for the given user.
     */
    protected function actingAsUser(User $user)
    {
        return $this->withSession(['auth_version' => $user->auth_version ?? 0])->actingAs($user, 'web');
    }

    // =========================================================================
    // TIER 1: FEATURE COVERAGE (Primary Happy Paths & Standard Contracts)
    // =========================================================================

    public function test_admin_can_list_users_with_json_envelope_meta_and_summary(): void
    {
        $admin = $this->createAdmin();

        $response = $this->actingAsUser($admin)->getJson('/api/users');

        $response->assertOk()
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'username',
                        'roles',
                        'is_active',
                        'created_at',
                    ],
                ],
                'meta' => [
                    'total',
                    'current_page',
                    'last_page',
                    'per_page',
                ],
                'summary' => [
                    'total_accounts',
                    'active_users',
                    'administrators',
                ],
            ]);
    }

    public function test_user_list_contains_correct_dto_field_types_and_values(): void
    {
        $admin = $this->createAdmin([
            'username' => 'super_chief',
            'name' => 'หัวหน้าฝ่ายควบคุม',
            'is_active' => true,
        ]);

        $response = $this->actingAsUser($admin)->getJson('/api/users');

        $response->assertOk();
        $items = collect($response->json('data'));
        $adminItem = $items->firstWhere('username', 'super_chief');

        $this->assertNotNull($adminItem, 'Expected created admin in response data');
        $this->assertSame('หัวหน้าฝ่ายควบคุม', $adminItem['name']);
        $this->assertTrue($adminItem['is_active']);
        $this->assertArrayNotHasKey('two_factor_enabled', $adminItem);
        $this->assertContains('super-admin', $adminItem['roles']);
        $this->assertNotEmpty($adminItem['created_at']);
    }

    public function test_user_list_summary_metrics_are_calculated_accurately(): void
    {
        $admin = $this->createAdmin(['is_active' => true]);
        $this->createStaff(['is_active' => true]);
        $this->createStaff(['is_active' => false]);

        $response = $this->actingAsUser($admin)->getJson('/api/users');

        $response->assertOk();
        $summary = $response->json('summary');

        // Total accounts >= 3
        $this->assertGreaterThanOrEqual(3, $summary['total_accounts']);
        $this->assertGreaterThanOrEqual(2, $summary['active_users']);
        $this->assertGreaterThanOrEqual(1, $summary['administrators']);
        $this->assertArrayNotHasKey('two_factor_enrolled', $summary);
    }

    public function test_user_list_default_pagination_limits(): void
    {
        $admin = $this->createAdmin();
        for ($i = 0; $i < 20; $i++) {
            $this->createStaff(['username' => 'bulk_staff_'.$i]);
        }

        $response = $this->actingAsUser($admin)->getJson('/api/users');

        $response->assertOk();
        $meta = $response->json('meta');
        $this->assertGreaterThanOrEqual(21, $meta['total']);
        $this->assertNotEmpty($response->json('data'));
    }

    public function test_admin_can_create_user_with_valid_attributes(): void
    {
        $admin = $this->createAdmin();

        $payload = [
            'name' => 'นายสมชาย มั่นคง',
            'username' => 'somchai.m',
            'password' => 'SecurePass@2026',
            'role' => 'staff',
        ];

        $response = $this->actingAsUser($admin)->postJson('/api/users', $payload);

        $response->assertStatus(201)
            ->assertJsonPath('data.username', 'somchai.m')
            ->assertJsonPath('data.name', 'นายสมชาย มั่นคง')
            ->assertJsonPath('data.is_active', true);

        $this->assertDatabaseHas('users', [
            'username' => 'somchai.m',
            'name' => 'นายสมชาย มั่นคง',
            'is_active' => true,
        ]);
    }

    public function test_created_user_has_hashed_password_and_assigned_role(): void
    {
        $admin = $this->createAdmin();

        $payload = [
            'name' => 'นางสาวกานดา วิเชียร',
            'username' => 'kanda.w',
            'password' => 'InitialPassword#99',
            'role' => 'viewer',
        ];

        $this->actingAsUser($admin)->postJson('/api/users', $payload)->assertStatus(201);

        $createdUser = User::where('username', 'kanda.w')->firstOrFail();
        $this->assertTrue(Hash::check('InitialPassword#99', $createdUser->password));
        $this->assertFalse(Hash::check('WrongPassword', $createdUser->password));
        $this->assertTrue($createdUser->hasRole('viewer'));
    }

    public function test_created_user_defaults_to_active_and_initial_auth_version(): void
    {
        $admin = $this->createAdmin();

        $payload = [
            'name' => 'นายอนุชา พลอยดี',
            'username' => 'anucha.p',
            'password' => 'ValidPass123456!',
            'role' => 'staff',
        ];

        $this->actingAsUser($admin)->postJson('/api/users', $payload)->assertStatus(201);

        $createdUser = User::where('username', 'anucha.p')->firstOrFail();
        $this->assertTrue((bool) $createdUser->is_active);
        $this->assertNotNull($createdUser->auth_version);
    }

    public function test_admin_can_update_user_name_and_role(): void
    {
        $admin = $this->createAdmin();
        $targetUser = $this->createStaff([
            'name' => 'ชื่อเดิม ก่อนแก้ไข',
        ]);

        $payload = [
            'name' => 'ชื่อใหม่ หลังได้รับการเลื่อนขั้น',
            'role' => 'auditor',
        ];

        $response = $this->actingAsUser($admin)->putJson("/api/users/{$targetUser->id}", $payload);

        $response->assertOk()
            ->assertJsonPath('data.name', 'ชื่อใหม่ หลังได้รับการเลื่อนขั้น');

        $targetUser->refresh();
        $this->assertSame('ชื่อใหม่ หลังได้รับการเลื่อนขั้น', $targetUser->name);
        $this->assertTrue($targetUser->hasRole('auditor'));
        $this->assertFalse($targetUser->hasRole('staff'));
    }

    public function test_update_user_preserves_username_immutability(): void
    {
        $admin = $this->createAdmin();
        $targetUser = $this->createStaff([
            'username' => 'original.username',
            'name' => 'ผู้ใช้งานเดิม',
        ]);

        // Attempt to pass a changed username in the payload
        $payload = [
            'username' => 'attempted.modified.username',
            'name' => 'ผู้ใช้งานเดิม ปรับชื่อใหม่',
            'role' => 'staff',
        ];

        $response = $this->actingAsUser($admin)->putJson("/api/users/{$targetUser->id}", $payload);

        $response->assertOk();
        $targetUser->refresh();
        $this->assertSame('original.username', $targetUser->username, 'Username must remain immutable upon update');
    }

    public function test_admin_can_list_roles(): void
    {
        $admin = $this->createAdmin();

        $response = $this->actingAsUser($admin)->getJson('/api/roles');

        $response->assertOk()
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'name',
                    ],
                ],
            ]);
    }

    public function test_roles_list_contains_standard_servicehub_roles(): void
    {
        $admin = $this->createAdmin();

        $response = $this->actingAsUser($admin)->getJson('/api/roles');

        $response->assertOk();
        $roleNames = collect($response->json('data'))->pluck('name')->all();

        $expectedRoles = ['super-admin', 'admin', 'staff', 'viewer', 'auditor'];
        foreach ($expectedRoles as $role) {
            $this->assertContains($role, $roleNames, "Expected role {$role} in /api/roles output");
        }
    }

    // =========================================================================
    // TIER 2: BOUNDARY & CORNER CASES (Edge Inputs & Validation Rules)
    // =========================================================================

    public function test_create_user_rejects_username_less_than_3_characters(): void
    {
        $admin = $this->createAdmin();

        $payload = [
            'name' => 'ผู้ทดสอบ สั้นเกินไป',
            'username' => 'ab', // 2 characters: below minimum 3
            'password' => 'ValidPass123456!',
            'role' => 'staff',
        ];

        $response = $this->actingAsUser($admin)->postJson('/api/users', $payload);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['username']);
    }

    public function test_create_user_accepts_username_boundary_3_characters(): void
    {
        $admin = $this->createAdmin();

        $payload = [
            'name' => 'ผู้ทดสอบ พอดี 3 ตัว',
            'username' => 'abc', // exactly 3 characters
            'password' => 'ValidPass123456!',
            'role' => 'staff',
        ];

        $response = $this->actingAsUser($admin)->postJson('/api/users', $payload);

        $response->assertStatus(201)
            ->assertJsonPath('data.username', 'abc');
    }

    public function test_create_user_accepts_username_boundary_100_characters(): void
    {
        $admin = $this->createAdmin();

        $longUsername = str_repeat('a', 100); // exactly 100 characters

        $payload = [
            'name' => 'ผู้ทดสอบ ยาว 100 ตัว',
            'username' => $longUsername,
            'password' => 'ValidPass123456!',
            'role' => 'staff',
        ];

        $response = $this->actingAsUser($admin)->postJson('/api/users', $payload);

        $response->assertStatus(201)
            ->assertJsonPath('data.username', $longUsername);
    }

    public function test_create_user_rejects_username_greater_than_100_characters(): void
    {
        $admin = $this->createAdmin();

        $tooLongUsername = str_repeat('a', 101); // 101 characters: exceeds max

        $payload = [
            'name' => 'ผู้ทดสอบ ยาวเกิน 100 ตัว',
            'username' => $tooLongUsername,
            'password' => 'ValidPass123!',
            'role' => 'staff',
        ];

        $response = $this->actingAsUser($admin)->postJson('/api/users', $payload);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['username']);
    }

    public function test_create_user_accepts_valid_username_characters_dot_dash_underscore(): void
    {
        $admin = $this->createAdmin();

        $validUsernames = [
            'user.name',
            'user-name',
            'user_name',
            'user.123_test-sub',
        ];

        foreach ($validUsernames as $index => $username) {
            $response = $this->actingAsUser($admin)->postJson('/api/users', [
                'name' => "ทดสอบรูปแบบอักษร {$index}",
                'username' => $username,
                'password' => 'ValidPassword123!',
                'role' => 'staff',
            ]);

            $response->assertStatus(201, "Expected username '{$username}' to be accepted");
        }
    }

    public function test_create_user_rejects_username_with_whitespace(): void
    {
        $admin = $this->createAdmin();

        $invalidUsernames = [
            'user name',
            ' user',
            'user ',
            "user\tname",
        ];

        foreach ($invalidUsernames as $username) {
            $response = $this->actingAsUser($admin)->postJson('/api/users', [
                'name' => 'ชื่อ ผู้ทดสอบ',
                'username' => $username,
                'password' => 'ValidPassword123!',
                'role' => 'staff',
            ]);

            $response->assertStatus(422, "Expected whitespace username '{$username}' to fail validation")
                ->assertJsonValidationErrors(['username']);
        }
    }

    public function test_create_user_rejects_username_with_disallowed_special_characters(): void
    {
        $admin = $this->createAdmin();

        $forbiddenUsernames = [
            'user@email.com',
            'user#name',
            'user$money',
            'user%wildcard',
            'user<script>',
            'user/slash',
        ];

        foreach ($forbiddenUsernames as $username) {
            $response = $this->actingAsUser($admin)->postJson('/api/users', [
                'name' => 'ชื่อ ทดสอบอักขระพิเศษ',
                'username' => $username,
                'password' => 'ValidPassword123!',
                'role' => 'staff',
            ]);

            $response->assertStatus(422, "Expected disallowed username '{$username}' to fail validation")
                ->assertJsonValidationErrors(['username']);
        }
    }

    public function test_create_user_rejects_duplicate_username(): void
    {
        $admin = $this->createAdmin();
        $this->createStaff(['username' => 'existing.worker']);

        $payload = [
            'name' => 'พนักงานใหม่ ซ้ำชื่อเดิม',
            'username' => 'existing.worker',
            'password' => 'ValidPass123!',
            'role' => 'staff',
        ];

        $response = $this->actingAsUser($admin)->postJson('/api/users', $payload);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['username']);
    }

    public function test_create_user_rejects_password_less_than_15_characters(): void
    {
        $admin = $this->createAdmin();

        $payload = [
            'name' => 'ผู้ทดสอบ รหัสผ่านสั้น',
            'username' => 'short.pass.user',
            'password' => 'Pass1234567890', // 14 characters
            'role' => 'staff',
        ];

        $response = $this->actingAsUser($admin)->postJson('/api/users', $payload);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }

    public function test_create_user_accepts_password_boundary_15_characters(): void
    {
        $admin = $this->createAdmin();

        $payload = [
            'name' => 'ผู้ทดสอบ รหัสผ่าน 15 ตัว',
            'username' => 'exact15.pass.user',
            'password' => 'Pass12345678901', // exactly 15 characters
            'role' => 'staff',
        ];

        $response = $this->actingAsUser($admin)->postJson('/api/users', $payload);

        $response->assertStatus(201);
    }

    public function test_create_user_rejects_empty_or_whitespace_password(): void
    {
        $admin = $this->createAdmin();

        $payload = [
            'name' => 'ผู้ทดสอบ รหัสผ่านว่าง',
            'username' => 'empty.pass.user',
            'password' => '        ',
            'role' => 'staff',
        ];

        $response = $this->actingAsUser($admin)->postJson('/api/users', $payload);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }

    public function test_create_user_rejects_empty_or_missing_required_fields(): void
    {
        $admin = $this->createAdmin();

        $response = $this->actingAsUser($admin)->postJson('/api/users', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'username', 'password', 'role']);
    }

    public function test_create_user_rejects_invalid_or_nonexistent_role(): void
    {
        $admin = $this->createAdmin();

        $payload = [
            'name' => 'ผู้ทดสอบ บทบาทไม่มีจริง',
            'username' => 'invalid.role.user',
            'password' => 'ValidPass123456!',
            'role' => 'super-hacker-role',
        ];

        $response = $this->actingAsUser($admin)->postJson('/api/users', $payload);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['role']);
    }

    public function test_update_user_rejects_nonexistent_role(): void
    {
        $admin = $this->createAdmin();
        $targetUser = $this->createStaff();

        $payload = [
            'name' => 'ปรับเป็นบทบาทปลอม',
            'role' => 'nonexistent_role_xyz',
        ];

        $response = $this->actingAsUser($admin)->putJson("/api/users/{$targetUser->id}", $payload);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['role']);
    }

    public function test_create_user_supports_unicode_thai_name(): void
    {
        $admin = $this->createAdmin();
        $thaiName = 'นายธนกร พงศ์ประเสริฐ (หัวหน้าชุดปฏิบัติการพิเศษ)';

        $payload = [
            'name' => $thaiName,
            'username' => 'thanakorn.p',
            'password' => 'ValidPass123456!',
            'role' => 'staff',
        ];

        $response = $this->actingAsUser($admin)->postJson('/api/users', $payload);

        $response->assertStatus(201)
            ->assertJsonPath('data.name', $thaiName);

        $this->assertDatabaseHas('users', [
            'username' => 'thanakorn.p',
            'name' => $thaiName,
        ]);
    }

    public function test_create_user_rejects_excessively_long_name_exceeding_255_chars(): void
    {
        $admin = $this->createAdmin();
        $excessiveName = str_repeat('ก', 256);

        $payload = [
            'name' => $excessiveName,
            'username' => 'long.name.user',
            'password' => 'ValidPass123!',
            'role' => 'staff',
        ];

        $response = $this->actingAsUser($admin)->postJson('/api/users', $payload);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name']);
    }

    public function test_query_params_boundary_negative_or_zero_page_defaults_safely(): void
    {
        $admin = $this->createAdmin();

        $responseZero = $this->actingAsUser($admin)->getJson('/api/users?page=0');
        $responseZero->assertOk();
        $this->assertSame(1, $responseZero->json('meta.current_page'));

        $responseNegative = $this->actingAsUser($admin)->getJson('/api/users?page=-5');
        $responseNegative->assertOk();
        $this->assertSame(1, $responseNegative->json('meta.current_page'));
    }

    public function test_query_params_invalid_sort_column_handled_gracefully(): void
    {
        $admin = $this->createAdmin();

        // Pass arbitrary column attempting SQL injection or unknown column
        $response = $this->actingAsUser($admin)->getJson('/api/users?sort=non_existent_column');

        // Should handle safely without SQL 500 error
        $response->assertOk();
    }

    public function test_query_params_invalid_sort_direction_handled_gracefully(): void
    {
        $admin = $this->createAdmin();

        $response = $this->actingAsUser($admin)->getJson('/api/users?sort=name&direction=diagonal');

        $response->assertOk();
    }

    // =========================================================================
    // TIER 3: CROSS-FEATURE & PAIRWISE COMBINATIONS
    // =========================================================================

    public function test_filter_users_by_role_returns_only_matching_users(): void
    {
        $admin = $this->createAdmin();
        $staffUser = $this->createStaff(['name' => 'เจ้าหน้าที่คนแรก']);
        $viewerUser = User::factory()->create(['name' => 'ผู้ตรวจดูข้อมูล', 'username' => 'viewer_'.uniqid()]);
        $viewerUser->assignRole(Role::findOrCreate('viewer', 'web'));

        $response = $this->actingAsUser($admin)->getJson('/api/users?role=staff');

        $response->assertOk();
        $usernames = collect($response->json('data'))->pluck('username')->all();

        $this->assertContains($staffUser->username, $usernames);
        $this->assertNotContains($viewerUser->username, $usernames);
    }

    public function test_filter_users_by_role_all_returns_all_roles(): void
    {
        $admin = $this->createAdmin();
        $staff = $this->createStaff();

        $response = $this->actingAsUser($admin)->getJson('/api/users?role=all');

        $response->assertOk();
        $usernames = collect($response->json('data'))->pluck('username')->all();

        $this->assertContains($admin->username, $usernames);
        $this->assertContains($staff->username, $usernames);
    }

    public function test_filter_users_by_status_active(): void
    {
        $admin = $this->createAdmin(['is_active' => true]);
        $activeUser = $this->createStaff(['username' => 'active_target', 'is_active' => true]);
        $inactiveUser = $this->createStaff(['username' => 'inactive_target', 'is_active' => false]);

        $response = $this->actingAsUser($admin)->getJson('/api/users?status=active');

        $response->assertOk();
        $usernames = collect($response->json('data'))->pluck('username')->all();

        $this->assertContains($activeUser->username, $usernames);
        $this->assertNotContains($inactiveUser->username, $usernames);
    }

    public function test_filter_users_by_status_inactive(): void
    {
        $admin = $this->createAdmin(['is_active' => true]);
        $activeUser = $this->createStaff(['username' => 'active_staff_user', 'is_active' => true]);
        $inactiveUser = $this->createStaff(['username' => 'suspended_user', 'is_active' => false]);

        $response = $this->actingAsUser($admin)->getJson('/api/users?status=inactive');

        $response->assertOk();
        $usernames = collect($response->json('data'))->pluck('username')->all();

        $this->assertContains($inactiveUser->username, $usernames);
        $this->assertNotContains($activeUser->username, $usernames);
    }

    public function test_filter_users_by_status_all(): void
    {
        $admin = $this->createAdmin(['is_active' => true]);
        $activeUser = $this->createStaff(['username' => 'active_user_check', 'is_active' => true]);
        $inactiveUser = $this->createStaff(['username' => 'inactive_user_check', 'is_active' => false]);

        $response = $this->actingAsUser($admin)->getJson('/api/users?status=all');

        $response->assertOk();
        $usernames = collect($response->json('data'))->pluck('username')->all();

        $this->assertContains($activeUser->username, $usernames);
        $this->assertContains($inactiveUser->username, $usernames);
    }

    public function test_search_users_by_name(): void
    {
        $admin = $this->createAdmin();
        $target = $this->createStaff(['name' => 'วิรัช กาญจนา', 'username' => 'wirat.k']);
        $other = $this->createStaff(['name' => 'สมบัติ พิทยา', 'username' => 'sombat.p']);

        $response = $this->actingAsUser($admin)->getJson('/api/users?q=วิรัช');

        $response->assertOk();
        $usernames = collect($response->json('data'))->pluck('username')->all();

        $this->assertContains('wirat.k', $usernames);
        $this->assertNotContains('sombat.p', $usernames);
    }

    public function test_search_users_by_username(): void
    {
        $admin = $this->createAdmin();
        $target = $this->createStaff(['name' => 'พนักงาน ก', 'username' => 'unique_target_usr']);
        $other = $this->createStaff(['name' => 'พนักงาน ข', 'username' => 'different_usr']);

        $response = $this->actingAsUser($admin)->getJson('/api/users?q=unique_target');

        $response->assertOk();
        $usernames = collect($response->json('data'))->pluck('username')->all();

        $this->assertContains('unique_target_usr', $usernames);
        $this->assertNotContains('different_usr', $usernames);
    }

    public function test_search_users_with_no_matches_returns_empty_data(): void
    {
        $admin = $this->createAdmin();

        $response = $this->actingAsUser($admin)->getJson('/api/users?q=non_existent_search_query_term_xyz');

        $response->assertOk();
        $this->assertEmpty($response->json('data'));
        $this->assertSame(0, $response->json('meta.total'));
    }

    public function test_pairwise_combination_search_and_role_and_status(): void
    {
        $admin = $this->createAdmin();

        // 4 users covering combinations
        $match = $this->createStaff([
            'name' => 'ประเสริฐ ดีเลิศ',
            'username' => 'prasert.active',
            'is_active' => true,
        ]);
        $wrongRole = User::factory()->create([
            'name' => 'ประเสริฐ ฝ่ายตรวจสอบ',
            'username' => 'prasert.auditor',
            'is_active' => true,
        ]);
        $wrongRole->assignRole(Role::findOrCreate('auditor', 'web'));

        $wrongStatus = $this->createStaff([
            'name' => 'ประเสริฐ ถูกพักงาน',
            'username' => 'prasert.inactive',
            'is_active' => false,
        ]);

        $response = $this->actingAsUser($admin)->getJson('/api/users?q=ประเสริฐ&role=staff&status=active');

        $response->assertOk();
        $usernames = collect($response->json('data'))->pluck('username')->all();

        $this->assertContains('prasert.active', $usernames);
        $this->assertNotContains('prasert.auditor', $usernames);
        $this->assertNotContains('prasert.inactive', $usernames);
    }

    public function test_sorting_by_name_ascending_and_descending(): void
    {
        $admin = $this->createAdmin();
        $this->createStaff(['name' => 'กิตติศักดิ์']);
        $this->createStaff(['name' => 'ฮาซัน']);

        $responseAsc = $this->actingAsUser($admin)->getJson('/api/users?sort=name&direction=asc');
        $responseAsc->assertOk();
        $namesAsc = collect($responseAsc->json('data'))->pluck('name')->all();

        $responseDesc = $this->actingAsUser($admin)->getJson('/api/users?sort=name&direction=desc');
        $responseDesc->assertOk();
        $namesDesc = collect($responseDesc->json('data'))->pluck('name')->all();

        $this->assertNotSame($namesAsc, $namesDesc);
    }

    public function test_sorting_by_created_at_ascending_and_descending(): void
    {
        $admin = $this->createAdmin(['created_at' => now()->subDays(10)]);
        $newerUser = $this->createStaff(['created_at' => now()->subDays(1)]);

        $responseAsc = $this->actingAsUser($admin)->getJson('/api/users?sort=created_at&direction=asc');
        $responseAsc->assertOk();
        $firstAsc = $responseAsc->json('data.0.id');

        $responseDesc = $this->actingAsUser($admin)->getJson('/api/users?sort=created_at&direction=desc');
        $responseDesc->assertOk();
        $firstDesc = $responseDesc->json('data.0.id');

        $this->assertNotSame($firstAsc, $firstDesc);
    }

    public function test_pagination_preserves_filter_and_search_parameters(): void
    {
        $admin = $this->createAdmin();

        // Create 25 matching staff users
        for ($i = 1; $i <= 25; $i++) {
            $this->createStaff([
                'name' => sprintf('เจ้าหน้าที่เขตทดสอบที่ %02d', $i),
                'username' => sprintf('zone_worker_%02d', $i),
                'is_active' => true,
            ]);
        }

        // Page 1 with per_page = 10
        $responsePage1 = $this->actingAsUser($admin)->getJson('/api/users?q=zone_worker&role=staff&per_page=10&page=1');
        $responsePage1->assertOk();
        $this->assertCount(10, $responsePage1->json('data'));
        $this->assertSame(1, $responsePage1->json('meta.current_page'));
        $this->assertSame(25, $responsePage1->json('meta.total'));

        // Page 2 with per_page = 10
        $responsePage2 = $this->actingAsUser($admin)->getJson('/api/users?q=zone_worker&role=staff&per_page=10&page=2');
        $responsePage2->assertOk();
        $this->assertCount(10, $responsePage2->json('data'));
        $this->assertSame(2, $responsePage2->json('meta.current_page'));

        // Items on page 1 and page 2 must be mutually exclusive
        $page1Usernames = collect($responsePage1->json('data'))->pluck('username')->all();
        $page2Usernames = collect($responsePage2->json('data'))->pluck('username')->all();
        $overlap = array_intersect($page1Usernames, $page2Usernames);
        $this->assertEmpty($overlap, 'Pagination pages must contain distinct records');
    }

    public function test_search_with_sql_wildcards_and_special_characters_is_sanitized(): void
    {
        $admin = $this->createAdmin();

        $wildcardUser = $this->createStaff(['name' => '100% บริสุทธิ์', 'username' => 'percent_100']);
        $normalUser = $this->createStaff(['name' => 'คนทั่วไป', 'username' => 'normal_worker']);

        // Search literal %
        $response = $this->actingAsUser($admin)->getJson('/api/users?q=100%');
        $response->assertOk();

        // SQL injection probe
        $sqlInjectionProbe = "' OR '1'='1";
        $injectionResponse = $this->actingAsUser($admin)->getJson('/api/users?q='.urlencode($sqlInjectionProbe));
        $injectionResponse->assertOk();
    }
}
