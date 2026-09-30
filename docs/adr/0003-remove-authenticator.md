# ADR 0003: Remove Authenticator from ServiceHub

## Decision

All roles sign in with username and password through Laravel Fortify. Remove TOTP challenges, enrollment, recovery codes, and their user-directory indicators. Keep server sessions, login throttling, disabled-account checks, `auth_version` session revocation, and login/logout audit events.

## Reason

The owner chose a password-only workflow for the current internal deployment. A partially enrolled administrator must no longer be trapped on the Authenticator setup page.

## Consequences

A new migration removes the stored 2FA columns and their data; rolling it back restores empty columns, not the deleted secrets. Historical audit events remain. Production still requires HTTPS and Secure session cookies. A future second factor needs a new product decision and migration.
