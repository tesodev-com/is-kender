import type { App } from 'vue';
import { Toggle } from './components';

export default {
  install(app: App) {
    app.component('LibToggle', Toggle);
  }
};

export {
  Toggle
};
