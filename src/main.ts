import type { App } from 'vue';
import { Text } from './components';

export default {
  install(app: App) {
    app.component('LibText', Text);
  }
};

export { Text };

