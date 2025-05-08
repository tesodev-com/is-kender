<template>
  <div
    ref="tabsListRef"
    class="tabs__list"
    :class="[tabsListComputedClasses, props.customClass]"
    role="tablist"
    :style="{
      '--indicator-thickness': `${props.indicatorThickness}px`,
      '--indicator-color': props.indicatorColor,
      '--border-sides': borderSides,
    }"
    @keydown="handleKeyDown"
  >
    <slot></slot>
    <div
      v-if="props.indicatorMode === 'sliding' && indicatorWidth > 0"
      :class="indicatorComputedClasses"
      :style="indicatorStyles"
    />
  </div>
</template>

<script setup lang="ts">
// imports
import type { TabsContext } from 'library-components/Tabs';
import { computed, inject, nextTick, onMounted, onUnmounted, provide, ref, toRefs, watch } from 'vue';
import type { TabsListContext, TabsListProps } from './types';
import { handleTabListKeyDown } from './utils/keyboardNavigation';

// interfaces & types

// constants

// composable

// props
const props = withDefaults(defineProps<TabsListProps>(), {
  indicatorMode: 'static',
  indicatorThickness: 2,
  indicatorColor: undefined,
  tabsSize: 'sm',
  customClass: '',
  theme: 'line',
  themeColor: 'primary',
  fluid: false,
});

// defineEmits

// states (refs and reactives)
const tabsListRef = ref<HTMLElement | null>(null);
const indicatorWidth = ref(0);
const indicatorHeight = ref(0);
const indicatorOffsetX = ref(0);
const indicatorOffsetY = ref(0);
const { indicatorMode, tabsSize, fluid } = toRefs(props);

const { selectedTab, orientation, tabsDirection, setSelectedTab } = inject<TabsContext>('tabsContext', {
  selectedTab: ref<string | undefined>(undefined),
  setSelectedTab: () => {},
});

// computed
const computedValues = computed(() => ({
  orientation: orientation ?? 'horizontal',
  tabsDirection: tabsDirection ?? 'after',
  theme: props.theme ?? 'line',
  themeColor: props.themeColor ?? 'primary',
}));

const borderSides = computed(() => {
  const combinations = {
    'horizontal-after': 'none none solid none',
    'horizontal-before': 'solid none none none',
    'vertical-after': 'none solid none none',
    'vertical-before': 'none none none solid',
  };
  return combinations[`${computedValues.value.orientation}-${computedValues.value.tabsDirection}`];
});

const tabsListComputedClasses = computed(() => ({
  'tabs__list--orientation-vertical': computedValues.value.orientation === 'vertical',
  'tabs__list--fluid': props.fluid,
  [`tabs__list--theme-${computedValues.value.theme}`]: true,
}));

const indicatorComputedClasses = computed(() => ({
  'tabs__list-indicator': true,
  [`tabs__list-indicator--position-${computedValues.value.tabsDirection}`]: true,
  [`tabs__list-indicator--theme-${computedValues.value.theme}`]: true,
  [`tabs__list-indicator--color-${computedValues.value.themeColor}`]: true,
}));

const indicatorStyles = computed(() => {
  return {
    '--indicator-width': `${indicatorWidth.value}px`,
    '--indicator-height': `${indicatorHeight.value}px`,
    '--indicator-y-offset': `${indicatorOffsetY.value}px`,
    '--indicator-x-offset': `${indicatorOffsetX.value}px`,
    '--indicator-thickness': computedValues.value.theme === 'line' ? `${props.indicatorThickness}px` : undefined,
    '--indicator-color': props.indicatorColor,
  };
});

// watchers
watch(selectedTab, () => {
  if (props.indicatorMode === 'sliding') {
    updateIndicator();
  }
});

// lifecycles
onMounted(() => {
  if (props.indicatorMode === 'sliding') {
    updateIndicator();

    const resizeObserver = new ResizeObserver(() => {
      updateIndicator();
    });

    if (tabsListRef.value) {
      resizeObserver.observe(tabsListRef.value);
    }

    onUnmounted(() => {
      resizeObserver.disconnect();
    });
  }
});

// methods
const updateIndicator = async () => {
  await nextTick();

  if (!tabsListRef.value || !selectedTab.value) return;

  const activeTab = tabsListRef.value.querySelector(`[data-value="${selectedTab.value}"]`) as HTMLElement;
  if (!activeTab) return;
  indicatorWidth.value = activeTab.offsetWidth;
  indicatorHeight.value = activeTab.offsetHeight;

  indicatorOffsetX.value = activeTab.offsetLeft;
  indicatorOffsetY.value = activeTab.offsetTop;
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (!tabsListRef.value) return;

  nextTick(() => {
    const tabs = Array.from(tabsListRef.value?.querySelectorAll('[role="tab"]') || []);

    handleTabListKeyDown({
      event,
      tabs,
      currentValue: selectedTab.value,
      orientation: computedValues.value.orientation,
      onSelect: setSelectedTab,
    });
  });
};

provide<TabsListContext>('tabsListContext', {
  indicatorMode,
  tabsSize,
  fluid,
  theme: props.theme,
  themeColor: props.themeColor,
});
</script>

<style lang="scss" scoped src="./TabsList.style.scss"></style>
