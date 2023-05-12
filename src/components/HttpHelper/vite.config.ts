import { defineConfig } from 'vite';
import baseConfig from '../../configs/baseConfig';
import path from 'path';
import dts from 'vite-plugin-dts';


baseConfig.build = {
   minify: true,
   lib:{
      entry: path.resolve(__dirname, `src/index.ts`),
      name:  `@tesodev/http-helper`,
      fileName: `http-helper`,
   },
   // @ts-ignore
   rollupOptions: {
      external : ["axios"],
      output: {
         globals: {
            // @ts-ignore
            axios: 'axios',
         },
      }
   },
   emptyOutDir: false,
};
baseConfig.plugins = [dts()];
// @ts-ignore
delete baseConfig.css

// @ts-ignore
export default defineConfig(baseConfig);
