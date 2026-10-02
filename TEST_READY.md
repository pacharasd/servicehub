# TEST_READY: ServiceHub International Standards Optimization (R1-R4)

## Overview
An independent, opaque-box, requirement-driven test suite has been established for the ServiceHub international standards optimization (Requirements R1–R4). The test suite strictly derives from `ORIGINAL_REQUEST.md` (update `2026-10-01T08:24:50Z`), `PROJECT.md`, `TEST_INFRA.md`, and Architectural Decision Records (ADRs 0007, 0008, 0009).

Testing is organized into a **4-Tier Test Architecture** executing both in PHPUnit (backend security, rate limiting, immutable asset delivery) and Node.js built-in test runner (WCAG 2.2 AA accessibility, DOM landmarks, skip links, responsive 320px containment, Vite code-splitting, ES module architecture).

---

## Test Suite Inventory

| Test Suite / File | Scope & Target | Framework | Tier Coverage | Test Count |
|---|---|---|:---:|:---:|
| `tests/Feature/SecurityHeadersAndThrottlingTest.php` | OWASP security headers (CSP, XFO, XCTO, RP, PP), login throttling (5/min), API throttling (60/min), immutable asset caching headers, path traversal guards | PHPUnit | Tiers 1, 2, 3, 4 | 20 |
| `tests/Unit/SecurityHeadersMiddlewareTest.php` | `SecurityHeaders` middleware class existence, header attachment, CSP directive verification, JSON payload preservation | PHPUnit | Tiers 1, 2 | 4 |
| `tests/E2E/standards_verification.mjs` | WCAG 2.2 AA skip-link `#main-content`, `:focus-visible` 3px outline, drawer focus trap & restore, ARIA landmarks, mobile 320px zero horizontal overflow, ES module decomposition, Vite rollup chunks, Sarabun preload | Node.js (`node:test`) | Tiers 1, 2, 3, 4 | 16 |
| **Existing Regression Suite** (`tests/Feature/*`) | Authentication, User Directory, RBAC, CRUD, Reports, Live Service Modules, Dashboard | PHPUnit | Regression | 130 |
| **Total Test Inventory** | | | | **170** |

---

## Detailed 4-Tier Coverage Matrix

### Tier 1: Feature Coverage (Primary Capabilities)
- **Security Headers (R2, ADR 0008)**:
  - `X-Frame-Options: SAMEORIGIN`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: geolocation=(), camera=(), microphone=()`
  - `Content-Security-Policy`: verifies presence of directives allowing `'self'`, Google Fonts (`fonts.googleapis.com`, `fonts.gstatic.com data:`), inline SVGs (`img-src 'self' data:`), inline styles/scripts (`'unsafe-inline'`), and `frame-ancestors 'self'`.
- **Throttling (R2, ADR 0008)**:
  - `POST /login`: 5 requests per minute per IP/username before HTTP 429.
  - `/api/*`: 60 requests per minute per user/IP before HTTP 429.
- **Static Asset Caching (R4, ADR 0008)**:
  - `Cache-Control: public, max-age=31536000, immutable` for production assets under `/dist/assets/*`.
- **WCAG 2.2 AA Accessibility (R3, ADR 0009)**:
  - Skip to Main Content link targeting `#main-content` with `tabindex="-1"` and `role="main"`.
  - `:focus-visible` high-contrast outline (`3px solid #54b99e` / primary) in `src/style.css`.
  - Slide-over Drawer focus trapping (`Tab` / `Shift+Tab`), ESC dismissal, and trigger focus restoration.
  - Semantic ARIA Landmarks (`role="banner"`, `role="main"`, `role="navigation"`, `role="complementary"`).
  - Screen reader live regions (`aria-live="polite"` / `role="status"`).
- **Responsive Mobile Containment (R3, ADR 0009)**:
  - Page-level `overflow-x: clip` / `overflow-x: hidden`.
  - Isolated table scrolling via `.data-table-scroll` (`overflow-x: auto; contain: inline-size`).
- **Modular ES Architecture (R1, ADR 0007)**:
  - Single-responsibility modules (`src/router.js`, `src/api.js`, `src/components/drawer.js`, `src/views/users.js`, `src/views/activities.js`, `src/views/references.js`).
  - Central `apiRequest` fetch client with CSRF and error interception.
- **Vite Bundling & Typography (R4, ADR 0007)**:
  - Rollup `manualChunks` code-splitting in `vite.config.js`.
  - Sarabun font preloaded in Blade layouts and render-blocking `@import` eliminated from `src/style.css`.

### Tier 2: Boundary & Corner Cases
- **Exact Boundary: 5th vs 6th Login Attempt**: Attempts 1–5 process credential validation; exact 6th attempt returns HTTP 429.
- **Exact Boundary: 60th vs 61st API Attempt**: Requests 1–60 return HTTP 200; exact 61st request returns HTTP 429.
- **Throttled 429 Structure**: Confirms HTTP 429 payload includes `Retry-After` header and informative JSON error message.
- **SPA Shell Bypass Guard**: Confirms direct access to `/dist/index.html` returns HTTP 404 and file does not exist on disk.
- **Static Asset Traversal Guard**: Directory traversal attempts (`/dist/assets/../index.html`, `/dist/assets/../../routes/web.php`, `%2e%2e`) return HTTP 404.
- **Special Characters in Throttling Keys**: SQL injection characters, Thai unicode strings, and symbols in username keys are handled cleanly by rate limiter without syntax failures.
- **320px Viewport Boundary**: CSS layout wrappers enforce `width: 100% !important` without fixed min-width > 320px.
- **Touch Target Dimensions**: Interactive elements satisfy minimum 44x44px touch targets.
- **Focus Trap Wrap-Around**: Focus trap cycles correctly from first to last on `Shift+Tab` and from last to first on `Tab`.

### Tier 3: Cross-Feature Interactions
- **Security Headers Parity Across States**: Verifies consistent delivery of all 5 security headers across Guest (`/login`), Authenticated Shell (`/`), Unauthenticated API (`/api/users` 401), and Not Found (`/non-existent` 404).
- **Rate Limit Isolation Across Users**: When User A exhausts their 60-request API quota, User B remains completely unthrottled.
- **Rate Limit Isolation Across IPs**: When IP A exhausts their 5-attempt login quota, IP B can still submit login attempts without lockout.
- **Headers Preserved on 429 Responses**: HTTP 429 throttled responses maintain all 5 security headers.
- **Drawer Background Scroll Lock**: Opening drawer locks document scrolling (`body { overflow: hidden }`) without breaking horizontal table scroll containment.
- **Tailwind Scanner Configuration**: `src/style.css` `@source "./**/*.js";` covers all modular JS views to prevent class pruning.
- **Central API Client Interceptors**: Client intercepts 401/419 (redirects to `/login`), 422 (unpacks validation messages), and 429 (rate limit notifications).

### Tier 4: Real-World Workload Scenarios
1. **Scenario 1: Complete Administrator Session Lifecycle**:
   - Guest visits `/login` (verifies headers) -> Admin logs in -> Accesses dashboard (verifies headers) -> Executes 10 operational queries (well within quota) -> Logs out -> Confirms session termination and headers.
2. **Scenario 2: Rapid Brute-Force Password Spraying Attack**:
   - Attacker bursts 10 login requests from single IP: attempts 1–5 process with credential errors; attempts 6–10 are blocked with HTTP 429 and `Retry-After`.
3. **Scenario 3: Heavy Operational Polling Simulation**:
   - Poller client makes 50 quick status checks -> completes 10 more to reach quota (60) -> 61st query is throttled with HTTP 429.
4. **Scenario 4: Simulated Keyboard Accessibility Navigation Flow**:
   - User tabs from top of document -> Skip Link appears -> activates skip link -> focus moves to `<main id="main-content">` -> opens modal drawer -> focus trapped within drawer -> ESC dismisses drawer -> focus cleanly restored to trigger element.
5. **Scenario 5: Simulated Screen Reader Exploration Flow**:
   - Assistive technology traverses standard landmarks in logical order (`banner` -> `navigation` -> `main` -> `complementary`) and dynamic status messages trigger announcements via `aria-live="polite"`.

---

## How to Run the Tests

### 1. Run Backend Security & Throttling Feature Tests
```bash
php artisan test tests/Feature/SecurityHeadersAndThrottlingTest.php
```

### 2. Run Security Middleware Unit Tests
```bash
php artisan test tests/Unit/SecurityHeadersMiddlewareTest.php
```

### 3. Run Standards, Accessibility & Frontend Verification Tests
```bash
node --test tests/E2E/standards_verification.mjs
```

### 4. Run Full Backend Regression Suite (130 Existing Tests)
```bash
php artisan test
```

### 5. Check PHP Syntax & Linting
```bash
php -l tests/Feature/SecurityHeadersAndThrottlingTest.php
php -l tests/Unit/SecurityHeadersMiddlewareTest.php
node --check tests/E2E/standards_verification.mjs
```

---

## Baseline Execution Results & Implementation Escalation Status

Current baseline execution confirms test suite readiness and correctly highlights the features pending implementation in milestones M1, M2, and M3:

| Test Area | Passing Baseline | Failing / Pending Implementation | Implementing Track |
|---|:---:|:---:|:---:|
| **Authentication Throttling** (`POST /login` 5/min) | 5 / 5 Passing | 0 | Already implemented in Fortify |
| **HTTP Security Headers** (CSP, XFO, XCTO, RP, PP) | 0 / 7 Passing | 7 Pending | **Worker M1** (`SecurityHeaders.php`, `bootstrap/app.php`) |
| **API Throttling** (`/api/*` 60/min) | 0 / 5 Passing | 5 Pending | **Worker M1** (`AppServiceProvider.php`, `bootstrap/app.php`) |
| **Static Asset Caching** (`dist/assets/*` 1-year) | 0 / 2 Passing | 2 Pending | **Worker M1** (`public/.htaccess`, `routes/web.php`) |
| **Modular ES Decomposition** (`router.js`, `api.js`, etc.) | 0 / 4 Passing | 4 Pending | **Worker M2** (`src/router.js`, `src/api.js`, `src/views/`) |
| **Vite Code-Splitting** (`manualChunks`) | 0 / 1 Passing | 1 Pending | **Worker M2** (`vite.config.js`) |
| **Tailwind Module Scanner** (`@source "./**/*.js"`) | 0 / 1 Passing | 1 Pending | **Worker M2** (`src/style.css`) |
| **WCAG 2.2 AA Skip Link** (`#main-content`) | 0 / 2 Passing | 2 Pending | **Worker M3** (`resources/views/app.blade.php`) |
| **WCAG 2.2 AA Focus Rings & Drawer Trap** | 4 / 4 Passing | 0 | Baseline CSS & main.js trap verified |
| **Sarabun Preload & CSS Optimization** | 0 / 1 Passing | 1 Pending | **Worker M3** (`app.blade.php`, `src/style.css`) |
| **Regression Suite** (130 existing tests) | 130 / 130 Passing | 0 | Zero regression |

**Test Suite Status**: **READY** for milestone worker execution.
