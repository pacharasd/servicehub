# ADR 0001: Server login and protected app shell

## Decision

Use Laravel Fortify at `/Servicehub/login` for username/password, sessions, and CSRF. Keep the existing hash routes only inside the authenticated application shell at `/Servicehub/`. Redirect legacy `#/login` to the server login page. Build Vite assets with a manifest and render the HTML through an authenticated Blade route. TOTP was removed by ADR 0003.

## Reason

The fragment after `#` never reaches Apache or Laravel. A login page or access check implemented only in a hash route cannot protect the HTML response. Laravel must decide whether to serve the app shell before JavaScript runs.

## Consequences

The app shell requires a session. Static JavaScript and CSS remain publicly fetchable and must not contain secrets. Existing browser `localStorage` CRUD remains demo data until server CRUD with authorization is implemented. Production requires HTTPS and Secure session cookies.
