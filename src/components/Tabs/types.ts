import { type Ref } from 'vue';

export interface TabsProps {
  title?: string;
}
export interface TabsContext {
  activeTab: Ref<number>;
  setActiveTab: (index: number) => void;
}
