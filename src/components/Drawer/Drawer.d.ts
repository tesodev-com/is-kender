import type { DefineComponent } from 'vue';

export interface DrawerProps {
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: '25%' | '50%' | '100%';
  title?: string;
  hasHeader?: boolean;
  hasCloseButton?: boolean;
}

declare const Drawer: DefineComponent<DrawerProps>;

declare module 'vue' {
  export interface GlobalComponents {
    LibDrawer: typeof Drawer;
  }
}

export default Drawer;
