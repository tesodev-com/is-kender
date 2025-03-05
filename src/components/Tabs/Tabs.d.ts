import { type DefineComponent } from 'vue';

export interface TabsProps {
  title: string;
}

declare const Tabs: DefineComponent<TabsProps>;

declare module 'vue' {
  export interface GlobalComponents {
    LibTabs: typeof Tabs;
  }
}

export default Tabs;
