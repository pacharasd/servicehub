# ServiceHub

ServiceHub currently serves the existing Vite front-end through Laravel 12 at `http://localhost/Servicehub/` using XAMPP PHP 8.2 and MariaDB database `servicehub`.

## Current scope

The local XAMPP database `servicehub` has Laravel migrations for users, roles/permissions, audit logs, five reference tables, and all nine service activity tables. Reference data contains 6 cleaning zones, 5 waste types, 5 measurement units, and 5 baseline roles with permissions. All service forms, dashboard, reports, CSV exports, and user management now read/write MariaDB through session-protected Laravel APIs. Existing browser `localStorage` demo data is ignored. Laravel Fortify provides username/password login; Authenticator/TOTP and recovery codes are not used.

## Local setup

- Use XAMPP PHP at `C:\xampp\php\php.exe` for Artisan and Composer. For this XAMPP CLI configuration, install PHP dependencies with `C:\xampp\php\php.exe -d extension=zip C:\xampp\php\composer.phar install --no-scripts`.
- Copy `.env.example` to `.env` and set a dedicated MariaDB account with privileges only on `servicehub`.
- Set `SESSION_DRIVER=file`, `CACHE_STORE=file`, and `QUEUE_CONNECTION=sync` to avoid database tables.
- Run `C:\xampp\php\php.exe artisan key:generate` after creating `.env`.
- Run `npm install` and `npm run build`. Vite writes only assets and a manifest to `public/dist`; Laravel serves the protected HTML.
- Create the first administrator interactively with `C:\xampp\php\php.exe artisan servicehub:admin:create`. To recover an account locally, use `C:\xampp\php\php.exe artisan servicehub:admin:recover USERNAME`. Both commands prompt for a password of at least 15 characters without echoing it.
- Apache must alias `/Servicehub` to `C:/xampp/htdocs/Servicehub/public`; only `public` should be web accessible. The local configuration is in `C:\xampp\apache\conf\extra\httpd-vhosts.conf`.

On a new empty database, run `C:\xampp\php\php.exe artisan migrate` then `C:\xampp\php\php.exe artisan db:seed`. Do not run `migrate:fresh` on an existing database. The `composer.json` setup scripts have no migration command.

## Front-end source

Module definitions and field labels are in `src/data.js`. Rendering and API requests are in `src/main.js`. Live activity and reference endpoints are in `routes/api.php`; their validation schema is in `app/Support/ServiceCatalog.php`.

In production, configure HTTPS and `SESSION_SECURE_COOKIE=true`. See `CONTEXT.md` and `docs/adr/0001-server-login-and-protected-app-shell.md` for authentication terminology and routing decisions.
