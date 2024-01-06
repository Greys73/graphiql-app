/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: './',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./__tests__/setupTests.ts'],
    coverage: {
      provider: 'v8',
    },
  },
});
