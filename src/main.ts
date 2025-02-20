import { useEventBus } from '@/composables/useEventBus';
import eventBus from '@/utils/eventBus';
import type { App } from 'vue';
import { Skeleton, Toggle, Alert, Button, FileUpload, Toast } from './components';
import { useToast } from '@/composables';
export default {
  install(app: App) {
    app.config.globalProperties.$eventBus = eventBus;
    app.config.globalProperties.$toast = useToast();
    app.component('LibToggle', Toggle);
    app.component('LibSkeleton', Skeleton);
    app.component('LibAlert', Alert);
    app.component('LibButton', Button);
    app.component('LibFileUpload', FileUpload);
    app.component('LibToast', Toast);
  },
};

export { useEventBus, eventBus, Skeleton, Toggle, Alert, Button, FileUpload, Toast, useToast };