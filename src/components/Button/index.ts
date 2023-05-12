import Button from './src/Button.vue';
import { App } from 'vue';
import { SFCWithInstall } from '@/globalTypes/types';

// @ts-ignore
Button.install = (Vue: App): void => {
   // @ts-ignore
   Vue.component(Button.name, Button);
};

export default Button as SFCWithInstall<App, typeof Button>;
