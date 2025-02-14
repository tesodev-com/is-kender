import type { App } from 'vue';
import { Alert } from './components';

export default {
  install(app: App) {
    app.component('LibAlert', Alert);
  }
};

export {
  Alert
};
