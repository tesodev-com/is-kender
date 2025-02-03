import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      treeshake: true,
      output: {
        strict: false,
        dir: 'dist',
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: '@use "@/assets/styles/globals.scss" as *;',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3001,
    origin: 'http://localhost:3001',
  },
  base: 'http://localhost:3001/',
});
