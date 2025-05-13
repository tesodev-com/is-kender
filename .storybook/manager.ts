import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'dark',
  brandTitle: 'iskender.js',
  brandUrl: 'https://tesodev.com/',
  brandImage: 'https://raw.githubusercontent.com/tesodev-com/is-kender/master/public/logo.png',
  brandTarget: '_blank',
  textColor: '#dcdcdc',
  textInverseColor: '#40455c',
});

addons.setConfig({
  theme,
});
