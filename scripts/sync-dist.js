import fs from 'node:fs';

fs.cpSync('public/dist', 'dist', { recursive: true });
console.log('Successfully synced public/dist to dist');
