import type { App } from 'vue';
import { ProgressBar } from '@/components';

export default {
  install(app: App) {
    app.component('LibProgressBar', ProgressBar);
  }
};

export { ProgressBar };
