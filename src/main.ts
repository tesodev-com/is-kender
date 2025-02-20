import { useEventBus } from '@/composables/useEventBus';
import eventBus from '@/utils/eventBus';
import type { App } from 'vue';
import { Skeleton, Toggle } from './components';

export default {
  install(app: App) {
    app.config.globalProperties.$eventBus = eventBus;
    app.component('LibToggle', Toggle);
    app.component('LibSkeleton', Skeleton);
  }
};

export { eventBus, Skeleton, Toggle, useEventBus };

