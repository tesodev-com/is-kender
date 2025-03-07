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
        include: ['src/**'],
        exclude: ['**/*.stories.ts', '**/*.d.ts', '**/main.ts', '**/index.ts'],
      },
    },
  })
);
