import { useEventBus } from '@/composables/useEventBus';
import eventBus from '@/utils/eventBus';
import type { App } from 'vue';
import { Breadcrumb, Toggle } from './components';

export default {
  install(app: App) {
    app.config.globalProperties.$eventBus = eventBus;
    app.component('LibToggle', Toggle);
    app.component('LibBreadcrumb', Breadcrumb);
  }
};

export {
  Breadcrumb, eventBus, Toggle, useEventBus
};
