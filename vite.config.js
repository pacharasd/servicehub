import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? './' : '/',
  publicDir: false,
  build: {
    outDir: 'public/dist',
    emptyOutDir: true,
    manifest: 'manifest.json',
    rollupOptions: {
      input: ['src/main.js', 'src/auth.css'],
      output: {
        manualChunks(id) {
          const normalized = id.replace(/\\/g, '/');
          if (normalized.includes('/node_modules/')) {
            return 'vendor';
          }
          if (normalized.includes('/src/views/users')) {
            return 'view-users';
          }
          if (normalized.includes('/src/views/activities')) {
            return 'view-activities';
          }
          if (normalized.includes('/src/views/references')) {
            return 'view-references';
          }
          if (
            normalized.includes('/src/views/analytics') ||
            normalized.includes('/src/dashboard.js') ||
            normalized.includes('/src/reports.js') ||
            normalized.includes('/src/views/dashboard') ||
            normalized.includes('/src/views/reports')
          ) {
            return 'view-analytics';
          }
        },
      },
    },
  },
  plugins: [tailwindcss()],
}));
