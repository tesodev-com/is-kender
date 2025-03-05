/* eslint-disable @typescript-eslint/no-empty-object-type */
import { type DefineComponent } from 'vue';

export interface TabPanelProps {}

declare const TabPanel: DefineComponent<TabPanelProps>;

declare module 'vue' {
  export interface GlobalComponents {
    LibTabPanel: typeof TabPanel;
  }
}

export default TabPanel;
