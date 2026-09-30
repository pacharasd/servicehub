import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Servicehub/dist/' : '/',
  publicDir: false,
  build: {
    outDir: 'public/dist',
    emptyOutDir: true,
    manifest: 'manifest.json',
    rollupOptions: { input: ['src/main.js', 'src/auth.css'] },
  },
  plugins: [tailwindcss()],
}));
