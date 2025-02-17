module.exports = {
  stories: ['../src/stories/**/*.stories.@(js|jsx|ts|tsx)', '../src/stories/**/*.mdx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@chromatic-com/storybook'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  features: {
    storyStoreV7: true,
  },
  docs: {}
};