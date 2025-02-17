import type { App } from 'vue';
import { Toast } from './components';
import { useToast } from './composables';
import { EventBus } from './utils';

export default {
  install(app: App) {
    app.config.globalProperties.$eventBus = EventBus;
    app.config.globalProperties.$toast = useToast();

    app.component('LibToast', Toast);
  }
};

export {
  EventBus, Toast, useToast
};

