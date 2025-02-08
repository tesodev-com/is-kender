// / <reference types="vitest" />

import Vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [
    Vue(),
  ],
  test: {
    ...configDefaults,
    globals: true,
    environment: 'jsdom',
  },
});