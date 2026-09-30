import {defineConfig} from 'vite';

// Source preview only. Production remains scripts/build-site.mjs.
export default defineConfig({
  publicDir: false,
  optimizeDeps: {entries: ['index.html']},
  server: {host: '127.0.0.1', port: 5173, strictPort: true},
});
