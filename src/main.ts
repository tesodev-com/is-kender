import { useEventBus } from '@/composables/useEventBus';
import eventBus from '@/utils/eventBus';
import type { App } from 'vue';
import { Skeleton, Toggle, Alert, Button } from './components';

export default {
  install(app: App) {
    app.config.globalProperties.$eventBus = eventBus;
    app.component('LibToggle', Toggle);
    app.component('LibSkeleton', Skeleton);
    app.component('LibAlert', Alert);
    app.component('LibButton', Button);
  },
};

export { useEventBus, eventBus, Skeleton, Toggle, Alert, Button };
