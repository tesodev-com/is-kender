import type { App } from 'vue';
import { Breadcrumb } from './components';

export default {
  install(app: App) {
    app.component('LibBreadcrumb', Breadcrumb);
  }
};

export {
  Breadcrumb
};
