import type { App } from 'vue';
import { Toggle } from './components';
import { useCopyClipboard } from '@/composables/useCopyClipboard';

export default {
  install(app: App) {
    app.component('LibToggle', Toggle);
  }
};

export {
  Toggle,
  useCopyClipboard
};
