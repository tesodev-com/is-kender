import type { App } from 'vue';
import { Badge, Button } from './components';

export default {
  install(app: App) {
    app.component('LibButton', Button);
    app.component('LibBadge', Badge);
  }
};

export { Badge, Button };

