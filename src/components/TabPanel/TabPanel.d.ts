import { type DefineComponent } from 'vue';

export interface TabPanelProps {
  name: string;
  index?: number;
  role?: string;
  disabled?: boolean;
}

declare const TabPanel: DefineComponent<TabPanelProps>;

declare module 'vue' {
  export interface GlobalComponents {
    LibTabPanel: typeof TabPanel;
  }
}

export default TabPanel;
