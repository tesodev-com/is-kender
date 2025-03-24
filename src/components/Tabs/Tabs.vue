<template>
  <div class="tabs">
    <div class="tabs__title">
      {{ title }}
    </div>
    <div class="tabs__button-container">
      <template v-if="slots.tabList">
        <component
          :is="tab?.component"
          v-for="tab in tabList"
          :key="tab.tabIndex"
          :index="tab.tabIndex"
          :disabled="tab.disabled"
        />
      </template>
      <template v-else>
        <Tab
          v-for="panel in tabPanels"
          :key="panel.tabName"
          :index="panel.tabIndex"
          :disabled="panel.disabled"
        >
          {{ panel.tabName }}
        </Tab>
      </template>
    </div>
    <div class="tabs__content">
      <div v-if="!tabPanels?.[activeTab]">
        {{ emptyPanelText }}
      </div>
      <component
        :is="tabPanels?.[activeTab]?.component"
        v-else
        :index="tabPanels?.[activeTab]?.tabIndex"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// imports
import Tab from 'library-components/Tab';
import { computed, provide, ref, type VNode } from 'vue';
import type { TabsContext, TabsProps } from './types';

// injects

// interfaces & types

// constants
const emptyPanelText = 'Please add panel content';
const activeTab = ref<number>(0);
const slots = defineSlots<{
  default?: () => any;
  tabList?: () => any;
}>();
// composable

// props
defineProps<TabsProps>();
// defineEmits

// states (refs and reactives)

// computed
const tabPanels = computed(() => {
  const nodes = getObjectAndSymbolNodes(slots.default?.());
  return filterChildNodesName('TabPanel', nodes);
});

const tabList = computed(() => {
  const nodes = getObjectAndSymbolNodes(slots.tabList?.());
  return filterChildNodesName('Tab', nodes);
});

// watchers

// lifecycles

// methods

function setActiveTab(index: number) {
  activeTab.value = index;
}
function getObjectAndSymbolNodes(slotNodeList: VNode[]): VNode[] {
  return slotNodeList?.flatMap((vnode: VNode) => {
    if (typeof vnode.type === 'object') {
      return vnode;
    }
    if (typeof vnode.type === 'symbol') {
      return vnode.children as VNode[];
    }
    return [];
  });
}
function filterChildNodesName<T = { tabIndex: number; tabName: string; component: VNode; disabled: boolean }>(subElement: string, nodeList: VNode[]): T[] {
  return nodeList?.flatMap((vnode: VNode, index: number) => {
    const props = vnode.props;
    if (typeof vnode.type === 'object' && 'name' in vnode.type && vnode.type.name === subElement) {
      return {
        tabIndex: props?.index ?? index,
        tabName: props?.name,
        component: vnode,
        disabled: props?.disabled,
      } as T;
    }
    return [];
  });
}
provide<TabsContext>('tabsContext', {
  activeTab,
  setActiveTab,
});
</script>

<style lang="scss" scoped src="./Tabs.style.scss"></style>
