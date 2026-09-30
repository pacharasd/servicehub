# ServiceHub

Open `http://localhost/Servicehub/login` with XAMPP Apache and MariaDB running. Sign in with an account created through `C:\xampp\php\php.exe artisan servicehub:admin:create`. The app stores all nine service modules and five reference catalogs in MariaDB; browser demo data is ignored. Add locations and communities under the master-data menu before using modules that require them.

Use `npm run build` after frontend changes. Run `C:\xampp\php\php.exe artisan migrate --force` for new schema migrations, followed by `C:\xampp\php\php.exe artisan db:seed --class=ReferenceDataSeeder --force` for idempotent base references and permissions. Run `C:\xampp\php\php.exe artisan test` and `C:\xampp\php\php.exe vendor\bin\pint --test` before release.

`scripts/backup-servicehub.ps1` makes a restricted SQL backup in `storage/backups` and removes backups older than 14 days. The local Windows task `ServiceHub MariaDB Daily Backup` runs at 02:00 while its user is signed in. Run the script directly when the computer will not be signed in overnight. Restore was tested against a separate temporary database. Never put backup SQL or `.env` in Git.

See [FRONTEND.md](FRONTEND.md) for local setup and [AGENT.md](AGENT.md) for architecture rules.
