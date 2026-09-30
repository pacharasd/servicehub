# ADR 0004: Live service data on XAMPP

## Decision

The nine service modules and five reference catalogs use MariaDB through Laravel session-protected APIs. The SPA keeps its hash routes and responsive layout. The old browser `localStorage` entries remain in the browser but are never read or migrated into the production database.

Activity records use soft deletes and record the authenticated creator/editor. Reference deletion is blocked when any activity, including a soft-deleted one, still refers to it. Quantity fields without a known fixed unit require a measurement-unit selection. Dashboard and report totals are computed from non-deleted rows; reports group variable quantities by unit. CSV export is authorized per module, UTF-8 with a BOM, and spreadsheet formula prefixes are escaped. Audit entries record changes without credentials.

## Local operations

The database is backed up with `scripts/backup-servicehub.ps1`. Windows Task Scheduler runs `ServiceHub MariaDB Daily Backup` at 02:00 with 14-day retention. This local task uses an interactive account and runs while that account is signed in. The SQL files are restricted to that account and SYSTEM. A backup was restored into a separate test database and its tables verified.

## Consequences

Master locations and communities start empty. Operators create them before recording services that require them. This avoids inventing production values. The legacy rows with sample zones were removed only after checking no activity referenced them. External hosting remains a separate deployment decision requiring HTTPS, Secure cookies, and a review of backup execution and access.
