# E2E Test Infra: ServiceHub Enterprise User Management

## Test Philosophy
- Opaque-box, requirement-driven testing derived strictly from `ORIGINAL_REQUEST.md` and `PROJECT.md`.
- Zero dependency on internal implementation structures.
- Methodology: Category-Partition + Boundary Value Analysis + Pairwise Combinatorial Testing + Real-World Workload Testing.

## Feature Inventory Coverage Map
| # | Feature | Requirement Source | Tier 1 (Min 5) | Tier 2 (Min 5) | Tier 3 (Pairwise) | Tier 4 (Scenario) |
|---|---------|-------------------|:--------------:|:--------------:|:-----------------:|:-----------------:|
| 1 | Directory Sidebar Link | R1, Acceptance Criteria | 5 | 5 | ✓ | ✓ |
| 2 | Hash Router `#/users` | R1, ADR 0001, ADR 0002 | 5 | 5 | ✓ | ✓ |
| 3 | Summary KPI Cards | R1 | 5 | 5 | ✓ | ✓ |
| 4 | Debounced Search | R1 | 5 | 5 | ✓ | ✓ |
| 5 | Role/Status Filters | R1 | 5 | 5 | ✓ | ✓ |
| 6 | User Data Table & Badges | R1 | 5 | 5 | ✓ | ✓ |
| 7 | Pagination Controls | R1 | 5 | 5 | ✓ | ✓ |
| 8 | Slide-over Drawer | R2 | 5 | 5 | ✓ | ✓ |
| 9 | Create User Form | R2 | 5 | 5 | ✓ | ✓ |
| 10 | Password Generator | R2 | 5 | 5 | ✓ | ✓ |
| 11 | Edit User Form | R2 | 5 | 5 | ✓ | ✓ |
| 12 | Status Toggle UI | R3 | 5 | 5 | ✓ | ✓ |
| 13 | Session Revocation | R3 | 5 | 5 | ✓ | ✓ |
| 14 | Admin Password Reset | R3, R4 | 5 | 5 | ✓ | ✓ |
| 15 | Hard Delete Prevention | R3 | 5 | 5 | ✓ | ✓ |
| 16 | `GET /api/users` | R4 | 5 | 5 | ✓ | ✓ |
| 17 | `POST /api/users` | R4 | 5 | 5 | ✓ | ✓ |
| 18 | `PUT /api/users/{user}` | R4 | 5 | 5 | ✓ | ✓ |
| 19 | `PATCH /api/users/{user}/status` | R4 | 5 | 5 | ✓ | ✓ |
| 20 | `POST /api/users/{user}/reset-password` | R4 | 5 | 5 | ✓ | ✓ |
| 21 | `GET /api/roles` | R4 | 5 | 5 | ✓ | ✓ |
| 22 | Audit Logging | R4 | 5 | 5 | ✓ | ✓ |
| 23 | Self-Lockout Guards | R3, R4 | 5 | 5 | ✓ | ✓ |
| 24 | Focus Trap & Keyboard | R1, R2 | 5 | 5 | ✓ | ✓ |
| 25 | Screen Reader & ARIA | R1, R2 | 5 | 5 | ✓ | ✓ |

## Test Architecture
- Test Runner: `php artisan test --filter=User` (PHPUnit / Pest feature & E2E suite).
- Formats & Envelopes: JSON responses conforming to `{ data, meta, summary, message }` and `{ message, errors }`.
- Test Suites:
  - `tests/Feature/UserDirectoryApiTest.php` (Tiers 1–3)
  - `tests/Feature/UserLifecycleSecurityTest.php` (Tiers 1–3: self-lockout, session invalidation, audit logging)
  - `tests/Feature/UserManagementScenarioTest.php` (Tier 4 Real-World scenarios)

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | Complete Employee Lifecycle (Onboarding to Offboarding) | Create user -> assign role -> filter in directory -> update details -> deactivate account -> verify session revocation | High |
| 2 | Emergency Credential Compromise & Password Reset | Admin detects compromise -> resets password -> verifies target active session terminated immediately -> user logs in with new credentials | High |
| 3 | Operator Self-Lockout & Demotion Defense | Admin attempts self-deactivation -> blocked with 422 -> admin attempts self-demotion -> blocked with 422 -> active session persists | Medium |
| 4 | Activity Data Protection against Deletion | User creates operational records in activity table (`road_washings`) -> operator checks lifecycle -> hard delete blocked -> user safely deactivated -> activity records remain intact | High |
| 5 | Unauthorized Access Penetration Resistance | Unauthenticated guest, `staff`, `viewer`, `auditor` attempt API mutations and directory access -> all correctly rejected with 401 or 403 | Medium |

## Coverage Thresholds
- Tier 1: Feature Coverage (≥5 per feature)
- Tier 2: Boundary & Corner Cases (≥5 per feature)
- Tier 3: Cross-Feature Interactions (Pairwise combinations)
- Tier 4: Real-world Workload Scenarios (≥5 scenarios)
- Exit Criteria: 100% test pass on `php artisan test`, zero violations on Pint, `TEST_READY.md` generated.
