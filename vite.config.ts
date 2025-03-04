import vue from '@vitejs/plugin-vue';
import { glob } from 'glob';
import path, { extname, relative, resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: resolve(__dirname, 'tsconfig.lib.json'),
      entryRoot: resolve(__dirname, 'src'),
      include: ['src/**/*.d.ts', 'src/main.ts', 'src/components/index.ts', 'src/composables/**/*.ts', 'src/utils/**/*.ts'],
      exclude: ['src/**/*.stories.ts', 'src/**/*.spec.ts', 'src/**/*.vue'],
      cleanVueFileName: true,
      copyDtsFiles: true,
    }),
    libInjectCss(),
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
            ignore: ['src/**/*.d.ts', 'src/**/*.stories.ts', 'src/**/*.spec.ts'],
          })
          .map(file => [relative('src', file.slice(0, file.length - extname(file).length)), fileURLToPath(new URL(file, import.meta.url))])
      ),
      external: ['vue'],
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
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
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: 'library', replacement: path.resolve(__dirname, 'src/components') },
      { find: 'library', replacement: path.resolve(__dirname, 'src/composables') },
      { find: 'library', replacement: path.resolve(__dirname, 'src/globalTypes') },
      { find: 'library', replacement: path.resolve(__dirname, 'src/utils') },
    ],
  },
  server: {
    port: 3001,
    origin: 'http://localhost:3001',
  },
  base: 'http://localhost:3001/',
});
