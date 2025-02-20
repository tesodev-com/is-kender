import type { App } from 'vue';
import { Toggle, Badge } from './components';

export default {
  install(app: App) {
    app.component('LibToggle', Toggle);
    app.component('LibBadge', Badge);
  }
};

export {
  Toggle,
  Badge
};
