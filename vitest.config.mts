/// <reference types="vitest" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    //svgr(),
    // svgr({
    //   include: '**/**/*.svg',
    //   svgrOptions: {
    //     icon: true,
    //     plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
    //   },
    // }),
    // {
    //   name: 'load-svg',
    //   enforce: 'pre',
    //   transform(_, id) {
    //     if (id.endsWith('.svg')) {
    //       return 'export default () => {}';
    //     }
    //   },
    // },
  ],
  base: './',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./__tests__/setupTests.ts'],
    // alias: {
    //   '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    //     './src/mocks/fileMock.js',
    // },
    // alias: [
    //   {
    //     find: /^(.*)\.svg$/,
    //     replacement: path.resolve('./src/mocks/fileMock.js'),
    //   },
    // ],
    coverage: {
      provider: 'v8',
    },
  },
});
