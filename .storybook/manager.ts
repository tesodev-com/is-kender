import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'dark',
  brandTitle: 'iskender.js',
  brandUrl: 'https://tesodev.com/',
  brandImage: '/logo.png',
  brandTarget: '_blank',
  textColor: '#dcdcdc',
  textInverseColor: '#40455c',
});

addons.setConfig({
  theme,
});
