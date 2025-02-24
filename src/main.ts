import { useToast } from '@/composables';
import eventBus from '@/utils/eventBus';
import type { App } from 'vue';
import * as components from './components';
import './assets/styles/initial.scss';

export default {
  install(app: App) {
    app.config.globalProperties.$eventBus = eventBus;
    app.config.globalProperties.$toast = useToast();
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });
  },
};

export * from './components';
export * from './composables';
