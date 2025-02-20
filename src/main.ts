import type { App } from 'vue';
import { Toggle } from './components';
import { useEventBus } from '@/composables/useEventBus';
import eventBus from '@/utils/eventBus';

export default {
  install(app: App) {
    app.config.globalProperties.$eventBus = eventBus;
    app.component('LibToggle', Toggle);
  }
};

export {
  Toggle,
  eventBus,
  useEventBus
};
