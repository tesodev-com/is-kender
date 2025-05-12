<template>
  <button
    class="tabs__tab"
    :class="[computedClasses, props.customClass]"
    role="tab"
    :aria-selected="!props.disabled && selectedTab === props.value"
    :aria-controls="props.value"
    :tabindex="!props.disabled && selectedTab === props.value ? 0 : -1"
    :disabled="props.disabled"
    :data-value="props.value"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
// imports
import type { TabsContext } from 'library-components/Tabs';
import type { TabsListContext } from 'library-components/TabsList';
import { computed, inject, onBeforeMount, ref } from 'vue';
import type { TabProps } from './types';

// interfaces & types

// constants

// composable

// props
const props = withDefaults(defineProps<TabProps>(), {
  customClass: '',
});

// defineEmits

// defineSlots

// states (refs and reactives)
const { selectedTab, setSelectedTab, tabsDirection } = inject<TabsContext>('tabsContext', {
  selectedTab: ref<string | undefined>(undefined),
  setSelectedTab: () => {},
});

const tabsListContext = inject<TabsListContext>('tabsListContext');

// computed
const tabsContextComputedValues = computed(() => ({
  tabsDirection: tabsDirection ?? 'after',
  theme: tabsListContext?.theme ?? 'line',
  themeColor: tabsListContext?.themeColor ?? 'primary',
}));

const computedClasses = computed(() => ({
  'tabs__tab--active': !props.disabled && selectedTab.value === props.value,
  'tabs__tab--disabled': props.disabled,
  'tabs__tab--fluid': tabsListContext?.fluid.value,
  [`tabs__tab-indicator--position-${tabsContextComputedValues.value.tabsDirection}`]: tabsListContext?.indicatorMode.value === 'static',
  'tabs__tab-indicator--mode-static': tabsListContext?.indicatorMode.value === 'static',
  [`tabs__tab--size-${tabsListContext?.tabsSize.value}`]: true,
  [`tabs__tab--color-${tabsContextComputedValues.value.theme.includes('segmented') ? 'gray' : tabsContextComputedValues.value.themeColor}`]: true,
  [`tabs__tab-indicator--theme-${tabsContextComputedValues.value.theme}`]: true,
}));

// watchers

// lifecycles
onBeforeMount(() => {
  if (selectedTab.value === props.value && props.disabled) {
    setSelectedTab?.(undefined);
  }
});

// methods
const handleClick = () => {
  if (!props.disabled) {
    setSelectedTab?.(props.value);
  }
};
</script>

<style lang="scss" scoped src="./Tab.style.scss"></style>
