import type { DefineComponent } from 'vue';
import type { DrawerProps } from './Drawer.vue';

declare const Drawer: DefineComponent<DrawerProps>;

declare module 'vue' {
  export interface GlobalComponents {
    LibDrawer: typeof Drawer;
  }
}

export default Drawer;
