import type { App } from 'vue';
import { Divider } from '@/components';

export default {
  install(app: App) {
    app.component('LibDivider', Divider);
  }
};

export { Divider };