import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Servicehub/dist/' : '/',
  plugins: [tailwindcss()],
}));
