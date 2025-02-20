import type { App } from 'vue';
import { Toggle, Text } from './components';

export default {
  install(app: App) {
    app.component('LibToggle', Toggle);
    app.component('LibText', Text);
  }
};

export {
  Toggle,
  Text
};
