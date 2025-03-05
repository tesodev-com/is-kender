<template>
  <div>
    <div>
      {{ title }}
      Tabs/Panels : {{ tabs.length / panels.length }}
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { TabsProps } from 'library/Tabs';
import { provide, ref } from 'vue';
// imports

// injects

// interfaces & types
interface TabObj {
  name: string;
  index: number;
}
interface TabPanelObj {
  name: string;
  index: number;
}
// constants
const activeTab = ref<number>(0);
const tabs = ref<TabObj[]>([]);
const panels = ref<TabPanelObj[]>([]);
// composable

// props
defineProps<TabsProps>();
// defineEmits

// states (refs and reactives)

// computed

// watchers

// lifecycles

// methods
function setActiveTab(index: number) {
  activeTab.value = index;
}
// provide
provide('activeTab', activeTab);
provide('setActiveTab', setActiveTab);
provide('tabsContext', {
  activeTab,
  registerTab: (tab: TabObj) => tabs.value.push(tab),
  registerPanel: (panel: TabPanelObj) => panels.value.push(panel),
});
</script>

<style lang="scss" scoped src="./Tabs.style.scss"></style>
