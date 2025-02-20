import type { App } from 'vue';
import { Toggle, ProgressBar } from './components';

export default {
  install(app: App) {
    app.component('LibToggle', Toggle);
    app.component('LibProgressBar', ProgressBar);
  }
};

export {
  Toggle,
  ProgressBar
};
