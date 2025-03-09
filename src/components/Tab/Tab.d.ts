import { type DefineComponent } from 'vue';

export interface TabProps {
  name?: string;
  index?: number;
  disabled?: boolean;
}

declare const Tab: DefineComponent<TabProps>;

declare module 'vue' {
  export interface GlobalComponents {
    LibTab: typeof Tab;
  }
}

export default Tab;
