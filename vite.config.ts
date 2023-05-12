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
            additionalData: [
               // Make the variables defined in these files available to all components, without requiring an explicit
               // @import of the files themselves
               '@use "./src/assets/styles/variables.scss" as *;',
            ].join('\n'),
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
