import { type DefineComponent, type Ref } from 'vue';

export interface TabsProps {
  title?: string;
}
export interface TabsContext {
  activeTab: Ref<number>;
  setActiveTab: (index: number) => void;
}

declare const Tabs: DefineComponent<TabsProps>;

declare module 'vue' {
  export interface GlobalComponents {
    LibTabs: typeof Tabs;
  }
}

export default Tabs;
