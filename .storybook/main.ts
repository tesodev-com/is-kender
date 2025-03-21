import type { StorybookConfig } from '@storybook/vue3-vite';
import * as path from 'path';

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-onboarding', '@chromatic-com/storybook', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  viteFinal: config => {
    if (config.resolve) {
      config.resolve.alias = {
        '@': path.resolve(__dirname, '../src'),
        'library-components': path.resolve(__dirname, '../src/components'),
        'library-composables': path.resolve(__dirname, '../src/composables'),
        'library-directives': path.resolve(__dirname, '../src/directives'),
        'library-utils': path.resolve(__dirname, '../src/utils'),
      };
    }
    return config;
  },
  staticDirs: ['../public'],
};
export default config;
