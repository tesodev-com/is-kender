import type { App } from 'vue';
import { Toast } from './components';
import { useToast } from './composables';

export default {
  install(app: App) {
    app.config.globalProperties.$toast = useToast();

    app.component('LibToast', Toast);
  }
};

export {
  Toast, useToast
};

