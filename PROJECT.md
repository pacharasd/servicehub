# Project: ServiceHub Enterprise User Management

## Architecture
- **Backend Architecture**: Laravel 12 on PHP 8.2+ with MariaDB (`utf8mb4`). Session-based authentication via Fortify + Spatie `laravel-permission` RBAC.
  - Endpoints live in `routes/api.php` under the `['web', 'auth', EnsureActiveAccount::class, 'two-factor.ready']` middleware group, sharing session cookies and CSRF tokens.
  - Controllers follow thin controller pattern with dedicated Form Requests and `UserPolicy`.
  - Account lifecycle enforces deactivation (`is_active = false`) over hard deletes, safeguarding foreign keys on 9 operational activity tables (`road_washings`, `waste_collections`, etc.).
  - Session revocation operates via `auth_version` incrementing; `EnsureActiveAccount` intercepts mismatches and returns 401 for JSON requests or redirects to login.
  - Append-only audit logging in `audit_logs` records all user mutations (`user.created`, `user.updated`, `user.disabled`, `user.enabled`, `user.password_reset`) with actor ID, target user ID, and sanitized state diffs without plain credentials.
- **Frontend Architecture**: Vanilla ES modules bundled with Vite 7 and Tailwind CSS v4 (`@tailwindcss/vite`).
  - Single-page application shell served via `resources/views/app.blade.php`.
  - Extended `window.serviceHubUser` exposes `{ id, name, username, roles, permissions }` for role-based UI guards.
  - Hash routing at `#/users` mounted into main container.
  - Responsive table container with `.data-table-scroll` preventing horizontal page overflow down to 320px viewport width (`scrollWidth == clientWidth`).
  - Slide-over drawer with accessible focus trap, ESC dismissal, and autofocus.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | User Directory Sidebar Navigation | Conditional display of "จัดการผู้ใช้งาน" link (`#/users`) only for `super-admin` and `admin` | M2 | Survey (spec_miner) |
| 2 | Hash Route Dispatcher for `#/users` | Routing `#figmacapture=` or `#/users` into User Directory view in shell | M2 | Survey (spec_miner) |
| 3 | Summary KPI Metric Cards | 4 KPI cards: Total accounts, Active users, Administrators, 2FA-enrolled | M2 | Survey (spec_miner) |
| 4 | Real-Time Debounced Search | Debounced (300ms) client/server search on `name` and `username` | M2 | Survey (spec_miner) |
| 5 | Role & Status Dropdown Filters | Filter by role (`all`, `super-admin`, `admin`, `staff`, `viewer`, `auditor`) and status | M2 | Survey (spec_miner) |
| 6 | User Data Table & Visual Badges | Responsive data table with avatar/initials, full name, username, role badge, 2FA status, status badge | M2 | Survey (spec_miner) |
| 7 | Filter-Preserving Pagination | Previous/Next and page number controls maintaining search and filter state | M2 | Survey (spec_miner) |
| 8 | Slide-over Drawer Container | Accessible off-canvas panel with backdrop, focus trap, ESC dismissal, and autofocus | M3 | Survey (spec_miner) |
| 9 | Create User Form & Validation | Form to create user (name, username 3-100 alphanumeric/._-, password, role) with Thai validation | M3 | Survey (spec_miner) |
| 10 | Password Generator & Show/Hide Toggle | High-entropy password generation and visible toggle button with ARIA attributes | M3 | Survey (spec_miner) |
| 11 | Edit User Information & Role | Modal/drawer form to modify display name and reassign role (locked username) | M3 | Survey (spec_miner) |
| 12 | Account Activation Toggle UI | UI switch/action to activate or deactivate user accounts with confirmation modal | M3 | Survey (spec_miner) |
| 13 | Session Revocation (`auth_version`) | Incrementing `auth_version` to immediately invalidate target user's active sessions | M1 | Survey (spec_miner) |
| 14 | Administrative Password Reset | Issuing temporary/reset password with `auth_version` bump and audit entry | M1, M3 | Survey (spec_miner) |
| 15 | Hard Delete Prevention Safeguard | Barring hard deletion of user accounts; deactivation is the standard lifecycle end | M1 | Survey (spec_miner) |
| 16 | Server Endpoint `GET /api/users` | Paginated, searchable, filterable user list with KPI summary stats | M1 | Survey (spec_miner) |
| 17 | Server Endpoint `POST /api/users` | Create user with input validation, password hashing, and role assignment | M1 | Survey (spec_miner) |
| 18 | Server Endpoint `PUT /api/users/{user}` | Update user name and role, preventing unauthorized role escalation/self-demotion | M1 | Survey (spec_miner) |
| 19 | Server Endpoint `PATCH /api/users/{user}/status` | Toggle `is_active` status with `auth_version` bump and self-lockout guard | M1 | Survey (spec_miner) |
| 20 | Server Endpoint `POST /api/users/{user}/reset-password` | Admin reset password with `auth_version` bump and audit logging | M1 | Survey (spec_miner) |
| 21 | Server Endpoint `GET /api/roles` | Return list of assignable roles for dropdown selection | M1 | Survey (spec_miner) |
| 22 | Administrative Audit Logging | Record mutations in `audit_logs` table without sensitive credential leakage | M1 | Survey (spec_miner) |
| 23 | Self-Lockout & Demotion Guard | Server and client safeguards preventing admin from deactivating or demoting self | M1, M3 | Survey (spec_miner) |
| 24 | Focus Trap & Keyboard Navigation | WCAG 2.2 AA compliant focus trapping, Tab/Shift-Tab cycle, visible focus rings | M3 | Survey (spec_miner) |
| 25 | Screen Reader Semantics & ARIA | Accessible ARIA attributes, live regions, labels, and color contrast >= 4.5:1 | M2, M3 | Survey (spec_miner) |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Secure Server-side API & RBAC Enforcement | Endpoints (`GET/POST/PUT /api/users`, `PATCH status`, `POST reset-password`, `GET /api/roles`), Form Requests, `UserPolicy`, `EnsureActiveAccount` 401 JSON response, `AuditLog` recording, self-lockout safeguards, Unit/Feature tests | none | PLANNED |
| M2 | Enterprise User Directory & Filtering View | App shell user context (`id`, `roles`, `permissions`), sidebar link at `#/users`, KPI metric cards, debounced search, role/status filters, responsive data table (320px containment), pagination | M1 (contracts) | PLANNED |
| M3 | Interactive Slide-over Drawer & Lifecycle UI | Drawer component, focus trap, ESC handler, Create User form, password generator & toggle, Edit User form, status toggle action, password reset dialog, toast alerts | M1, M2 | PLANNED |
| E2E | Requirement-Driven Opaque-Box Test Suite | Independent test harness, Tier 1-4 test suite covering all 25 features and 20 edge cases, publish `TEST_READY.md` | none | IN_PROGRESS |
| Final | 100% E2E Pass & Adversarial Hardening | Run full test suite (`php artisan test`), pass 100% E2E tests, Tier 5 adversarial hardening, Pint clean (`vendor/bin/pint --test`), clean build (`npm run build`) | M1, M2, M3, E2E | PLANNED |

## Interface Contracts

### Backend REST API Envelope
- Base URL: `/api/`
- Middleware: `['web', 'auth', EnsureActiveAccount::class, 'two-factor.ready']`
- Headers required: `Accept: application/json`, `X-CSRF-TOKEN: <token>`

#### Endpoints:
1. `GET /api/users`
   - Params: `q` (string), `role` (string), `status` (active/inactive/all), `sort` (name/username/created_at/role), `direction` (asc/desc), `page` (int), `per_page` (int)
   - Response: `{ data: [UserDTO], meta: { total, current_page, last_page, per_page }, summary: { total_accounts, active_users, administrators, two_factor_enrolled } }`
2. `POST /api/users`
   - Body: `{ name: string, username: string, password: string, role: string }`
   - Response `201`: `{ data: UserDTO, message: string }`
   - Response `422`: `{ message: string, errors: {} }`
3. `PUT /api/users/{user}`
   - Body: `{ name: string, role: string }`
   - Response `200`: `{ data: UserDTO, message: string }`
   - Response `422`: `{ message: string, errors: {} }` (includes self-demotion block)
4. `PATCH /api/users/{user}/status`
   - Body: `{ is_active: boolean }`
   - Response `200`: `{ data: UserDTO, message: string }`
   - Response `422`: `{ message: "ไม่สามารถระงับการใช้งานบัญชีของตนเองได้" }` (self-deactivation block)
5. `POST /api/users/{user}/reset-password`
   - Body: `{ password: string }`
   - Response `200`: `{ message: string }`
6. `GET /api/roles`
   - Response `200`: `{ data: [RoleDTO] }`

### App Shell Context Interface
- `window.serviceHubUser`:
  ```javascript
  {
    id: 1,
    name: "ผู้ดูแลระบบฝ่ายบริการ",
    username: "admin",
    roles: ["super-admin"],
    permissions: ["users.view", "users.create", "users.update", "users.disable", "roles.view"]
  }
  ```

## Code Layout
- Backend Source:
  - `routes/api.php` — API route definitions
  - `app/Http/Controllers/Api/UserController.php` — User API controller
  - `app/Http/Controllers/Api/RoleController.php` — Role API controller
  - `app/Http/Requests/StoreUserRequest.php` — Creation request validator
  - `app/Http/Requests/UpdateUserRequest.php` — Update request validator
  - `app/Http/Requests/ToggleUserStatusRequest.php` — Status toggle validator
  - `app/Http/Requests/ResetUserPasswordRequest.php` — Password reset validator
  - `app/Policies/UserPolicy.php` — Authorization policy for user operations
  - `app/Models/AuditLog.php` — Eloquent model for audit logs
  - `app/Services/AuditLogService.php` — Service for sanitized audit recording
  - `app/Http/Middleware/EnsureActiveAccount.php` — Updated with JSON 401 response
  - `bootstrap/app.php` — Configure API routes if needed
- Frontend Source:
  - `resources/views/app.blade.php` — Extended user context & sidebar link
  - `src/main.js` — Router update for `#/users` route dispatch
  - `src/users/usersView.js` — User Directory SPA view (KPI cards, search, filters, table, pagination)
  - `src/users/userDrawer.js` — Slide-over drawer component (forms, password generator, validation, focus trap)
  - `src/users/userApi.js` — API client wrapper for user and role endpoints
  - `src/style.css` — Mobile containment styles and table scroll
- Test Source:
  - `tests/Feature/Api/UserManagementApiTest.php` — Comprehensive API feature tests
  - `tests/Feature/Api/UserLifecycleTest.php` — Session revocation, self-lockout, audit tests
  - `tests/Unit/UserPolicyTest.php` — RBAC and self-lockout policy unit tests
  - `tests/E2E/` — End-to-end / scenario tests
