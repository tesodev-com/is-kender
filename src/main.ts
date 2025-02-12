import type { App } from 'vue';
import { Container, Row, Col } from './components';
export default {
  install(app: App) {
    app.component('LibContainer', Container);
    app.component('LibRow', Row);
    app.component('LibCol', Col);
  }
};

export { Container, Row, Col };