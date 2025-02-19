import type { App } from 'vue';
import { FileUpload } from './components';

export default {
  install(app: App) {
    app.component('LibFileUpload', FileUpload);
  }
};

export {
  FileUpload
};

