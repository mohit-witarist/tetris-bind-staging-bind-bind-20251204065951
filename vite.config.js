import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    strictPort: false,
    hmr: {
      overlay: true
    }
  },
  optimizeDeps: {
    exclude: []
  },
  build: {
    target: 'esnext',
    minify: 'esbuild'
  }
});
