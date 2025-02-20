import type { App } from 'vue';
import { Toggle } from './components';
import { useDebounce } from '@/composables/useDebounce';

export default {
  install(app: App) {
    app.component('LibToggle', Toggle);
  }
};

export {
  Toggle,
  useDebounce
};
