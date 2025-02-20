import type { App } from 'vue';
import { Toggle } from './components';
import { useIntersectionObserver } from '@/composables/useIntersectionObserver';

export default {
  install(app: App) {
    app.component('LibToggle', Toggle);
  }
};

export {
  Toggle,
  useIntersectionObserver
};
