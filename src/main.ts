import { useEventBus, useToast } from '@/composables';
import eventBus from '@/utils/eventBus';
import type { App } from 'vue';
import { Alert, Breadcrumb, Button, Col, Container, FileUpload, Row, Skeleton, Svg, Toast, Toggle } from './components';

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
    app.component('LibContainer', Container);
    app.component('LibRow', Row);
    app.component('LibCol', Col);
    app.component('LibBreadcrumb', Breadcrumb);
    app.component('LibSvg', Svg);
  },
};

export { Alert, Breadcrumb, Button, Col, Container, eventBus, FileUpload, Row, Skeleton, Svg, Toast, Toggle, useEventBus, useToast };
