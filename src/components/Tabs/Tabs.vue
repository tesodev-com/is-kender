<template>
  <div
    class="tabs"
    :class="[tabsComputedClasses, props.customClass]"
    role="tabs"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
// imports
import { computed, provide, watch } from 'vue';
import type { TabsContext, TabsProps } from './types';

// props
const props = withDefaults(defineProps<TabsProps>(), {
  defaultValue: undefined,
  onValueChange: undefined,
  orientation: 'horizontal',
  tabsDirection: 'after',
  theme: 'line',
  themeColor: 'primary',
  customClass: '',
});

// states (refs and reactives)
const selectedTab = defineModel<string | undefined>('modelValue', { default: undefined });

// computed
const tabsComputedClasses = computed(() => ({
  'tabs--orientation-vertical': props.orientation === 'vertical',
  [`tabs--direction-${props.tabsDirection}`]: true,
}));

// watchers
watch(
  () => props.defaultValue,
  newValue => {
    if (newValue !== undefined) {
      selectedTab.value = newValue;
    }
  },
  { immediate: true }
);

// methods
const setSelectedTab = (value: string | undefined) => {
  selectedTab.value = value;
  props.onValueChange?.(value);
};

provide<TabsContext>('tabsContext', {
  selectedTab,
  setSelectedTab,
  orientation: props.orientation,
  tabsDirection: props.tabsDirection,
});
</script>

<style lang="scss" scoped src="./Tabs.style.scss"></style>
