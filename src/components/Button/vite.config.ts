import { defineConfig } from 'vite';
import baseConfig from '../../configs/baseConfig';
import path from 'path';

const component = process.env.component || 'index';
const packageJson = require('./package.json');
const version = (packageJson || {}).version || '0.0.1';

baseConfig.build.lib = {
   entry: path.resolve(__dirname, `./index.ts`),
   name: `@components/${component}`,
   formats: ['es'], // adding 'umd' requires globals set to every external module
   fileName: (format: string) => `${component.toLowerCase()}@${version}.js`,
};

// @ts-ignore
export default defineConfig(baseConfig);
