import { fileURLToPath } from 'node:url';
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      include: ['**/*.spec.ts'],
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*', 'src/stories/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      testTransformMode: {
        web: ['/.[jt]sx?$/'],
      },
      coverage: {
        exclude: [
          'src/stories/*',
          '/src/types/*',
          'dist/*',
          '*.config.cjs',
          '*.config.ts',
          '.storybook/*',
          'src/*.d.ts',
          'src/App.vue',
          'src/index.ts',
          'src/main.ts',
          '.eslintrc.cjs',
        ],
      },
    },
  }),
);
