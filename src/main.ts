import type { App } from 'vue';
import { Toggle } from './components';
import { useIsMobile } from '@/composable/useIsMobile';

export default {
  install(app: App) {
    app.component('LibToggle', Toggle);
  }
};

export {
  Toggle,
  useIsMobile
};
