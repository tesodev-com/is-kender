import { useEventBus } from '@/composables/useEventBus';
import eventBus from '@/utils/eventBus';
import type { App } from 'vue';
import { Skeleton, Toggle, Alert } from './components';


export default {
  install(app: App) {
    app.config.globalProperties.$eventBus = eventBus;
    app.component('LibToggle', Toggle);
    app.component('LibSkeleton', Skeleton);
    app.component('LibAlert', Alert);
  },
};

export { eventBus, Skeleton, Toggle, useEventBus, Alert };