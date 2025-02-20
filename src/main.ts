import type { App } from 'vue';
import { Toggle } from './components';
import { useResizeObserver } from '@/composables/useResizeObserver';

export default {
  install(app: App) {
    app.component('LibToggle', Toggle);
  }
};

export {
  Toggle,
  useResizeObserver
};
