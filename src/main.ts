import eventBus from '@/utils/eventBus';
import type { App } from 'vue';
import { Skeleton, Svg, Toggle } from './components';
import { useEventBus } from './composables/useEventBus';

export default {
  install(app: App) {
    app.config.globalProperties.$eventBus = eventBus;
    app.component('LibToggle', Toggle);
    app.component('LibSkeleton', Skeleton);
    app.component('LibSvg', Svg);
  },
};

export { eventBus, Skeleton, Svg, Toggle, useEventBus };
