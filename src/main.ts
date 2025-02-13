import type { App } from 'vue';
import { Skeleton } from './components';

export default {
  install(app: App) {
    app.component('LibSkeleton', Skeleton);
  }
};

export { Skeleton };

