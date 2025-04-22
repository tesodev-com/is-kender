import vue from '@vitejs/plugin-vue';
import { glob } from 'glob';
import { extname, relative, resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import libPlugin from './scripts/plugin';

export default defineConfig({
  plugins: [
    vue(),
    libInjectCss(),
    libPlugin(),
    dts({
      tsconfigPath: resolve(__dirname, 'tsconfig.lib.json'),
      cleanVueFileName: true,
    }),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: {
        main: resolve(__dirname, 'src/main.ts'),
        initial: resolve(__dirname, 'src/assets/styles/initial.scss'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      input: Object.fromEntries(
        glob
          .sync('src/**/*.{ts,js,vue}', {
            ignore: ['src/**/*.d.ts', 'src/**/*.stories.ts', 'src/**/*.spec.ts', 'src/{components,composables}/**/index.ts', 'src/**/types.ts'],
          })
          .map(file => [relative('src', file.slice(0, file.length - extname(file).length)), fileURLToPath(new URL(file, import.meta.url))])
      ),
      external: ['vue'],
      output: {
        assetFileNames: assetInfo => {
          if (assetInfo.names[0].endsWith('.css')) {
            return 'assets/css/[name].css';
          }
          return 'assets/[name].[ext]';
        },
        entryFileNames: '[name].js',
        chunkFileNames: 'assets/js/[name].js',
        globals: {
          vue: 'Vue',
        },
      },
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
      '@': resolve(__dirname, 'src'),
      'library-components': resolve(__dirname, 'src/components'),
      'library-composables': resolve(__dirname, 'src/composables'),
      'library-directives': resolve(__dirname, 'src/directives'),
      'library-utils': resolve(__dirname, 'src/utils'),
    },
  },
  server: {
    port: 3001,
    origin: 'http://localhost:3001',
  },
  base: 'http://localhost:3001/',
});
