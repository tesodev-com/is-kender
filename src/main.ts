import type { App } from 'vue';
import { Button } from './components';

export default {
  install(app: App) {
    app.component('LibButton', Button);
  }
};

export { Button };

