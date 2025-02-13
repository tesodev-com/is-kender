import type { App } from 'vue';
import { Heading } from './components';

export default {
  install(app: App) {
    app.component('LibHeading', Heading);
  }
};

export { Heading };

