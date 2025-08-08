import react from '@vitejs/plugin-react';

import path from "node:path"
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '@bc-arch-drafter/ui': path.resolve(__dirname, '../../packages/ui/build'),
    },
  },
});