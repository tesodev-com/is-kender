import type { App } from 'vue';
import { Toggle, Divider } from './components';

export default {
  install(app: App) {
    app.component('LibToggle', Toggle);
    app.component('LibDivider', Divider);
  }
};

export {
  Toggle,
  Divider
};
