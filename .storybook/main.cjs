module.exports = {
   stories: ['../src/components/**/*.stories.@(js|jsx|ts|tsx)'],
   addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
   framework: '@storybook/vue3',
   core: {
      builder: '@storybook/builder-vite',
   },
   features: {
      storyStoreV7: true,
   },
   async viteFinal(config, { configType }) {
      // customize the Vite config here
      config.server.port = 6001;
      config.server.https = false;
      config.server.host = true;
      config.server.hmr = {
         port: 443,
         protocol: 'ws',
      };

      config.css = {
         preprocessorOptions: {
            scss: { additionalData: `@use "src/assets/styles/variables" as *;` },
         },
      };

      return config;
   },
};
