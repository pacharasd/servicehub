# ServiceHub front-end prototype

This repository currently contains a front-end prototype only. It follows the modules and UI guidance in `AGENT.md` and does not provide authentication, server-side validation, authorization, audit logging, or a database.

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite. Run `npm run build` to verify the production bundle.

The interface includes a dashboard and all nine service modules. The initial records are sample data. Changes made through the forms are stored in this browser's `localStorage` only. Clearing site data resets the sample records.

## Later Laravel integration

The module definitions and field labels are in `src/data.js`. UI rendering and temporary browser storage are in `src/main.js`. When the Laravel backend is built, replace the browser storage functions with authorized Laravel routes and server-side validation, then migrate these views into Blade components and templates as specified in `AGENT.md`.
