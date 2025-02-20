import { useEventBus } from '@/composables/useEventBus';
import eventBus from '@/utils/eventBus';
import type { App } from 'vue';
import { Button, Toggle } from './components';

export default {
  install(app: App) {
    app.config.globalProperties.$eventBus = eventBus;
    app.component('LibToggle', Toggle);
    app.component('LibButton', Button);
  }
};

export {
  Button, eventBus, Toggle, useEventBus
};

