import type { App } from 'vue';
import { useEventBus } from '@/composables/useEventBus';
import eventBus from '@/utils/eventBus';

export default {
  install(app: App) {
    app.config.globalProperties.$eventBus = eventBus;
  }
};

export { eventBus, useEventBus };