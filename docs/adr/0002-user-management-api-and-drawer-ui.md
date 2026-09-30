# ADR 0002: User Management Real API and Accessible Slide-over Drawer

## Decision

Implement User Management at `#/users` within the authenticated SPA shell, backed by server-side authenticated REST endpoints (`/api/users`) connecting directly to MariaDB and Spatie RBAC. Use an interactive, accessible slide-over drawer for user creation, role editing, and password resets rather than separate page navigation. Discontinue user hard-deletes; enforce account deactivation (`is_active = false`) paired with session invalidation via `auth_version` bumping.

## Reason

1. User security and access control cannot rely on client-side mock data; authorizations must be strictly validated by Laravel Policies on every state modification.
2. In enterprise administration dashboards, slide-over drawers allow administrators to rapidly inspect, create, and update users without losing directory context, active search filters, or pagination position.
3. Hard-deleting user records breaks foreign key constraints (`created_by`, `updated_by`) in activity tables and damages audit log integrity. Deactivation preserves historical records while immediately barring compromised or departed accounts.

## Consequences

- The application shell must authenticate requests to `/api/*` using the active session cookie and CSRF token.
- Modifying account status or passwords immediately invalidates the affected user's active sessions without requiring server restarts.
- Administrators cannot deactivate their own currently active account to prevent accidental lockout.
