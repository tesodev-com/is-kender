import vue from '@vitejs/plugin-vue';
import { globSync } from 'glob';
import path, { extname, relative, resolve } from 'path';
import { type OutputOptions } from 'rollup';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

const commonOutputConfig = {
  assetFileNames: 'assets/[name][extname]',
  exports: 'named',
} as OutputOptions;

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: resolve(__dirname, './tsconfig.lib.json'),
      entryRoot: resolve(__dirname, './src'),
      outDir: resolve(__dirname, './dist/types'),
    }),
    libInjectCss(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
    },
    rollupOptions: {
      input: Object.fromEntries(
        globSync('src/**/*.{js,ts,vue}', { ignore: ['src/stories/*', 'src/utils/*', 'src/**/*.spec.ts', 'src/globalTypes/*'] }).map(file => [
          relative('src', file.slice(0, file.length - extname(file).length)),
          fileURLToPath(new URL(file, import.meta.url)),
        ])
      ),
      external: ['vue'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].js',
          ...commonOutputConfig,
        },
      ],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
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
