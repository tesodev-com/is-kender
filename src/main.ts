import type { App } from 'vue';
import { Badge } from '@/components';

export default {
  install(app: App) {
    app.component('LibBadge', Badge);
  }
};

export { Badge };

