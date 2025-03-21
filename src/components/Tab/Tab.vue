<template>
  <button
    class="tab__button"
    :class="tabClasses"
    @click="handleActive"
  >
    <slot>
      {{ name }}
    </slot>
  </button>
</template>

<script setup lang="ts">
// imports
import type { TabsContext } from 'library-components/Tabs';
import { computed, inject } from 'vue';
import type { TabProps } from './types';
// interfaces & types
defineOptions({
  name: 'Tab',
});
// inject
const tabsContext = inject<TabsContext>('tabsContext')!;
// constants

// composable

// props
const props = defineProps<TabProps>();
// defineEmits

// states (refs and reactives)

// computed
const isActive = computed(() => tabsContext?.activeTab?.value === props.index);
const tabClasses = computed(() => {
  return { 'tab__button--active': isActive.value, 'tab__button--disabled': props.disabled };
});
// watchers

// lifecycles
// methods
function handleActive() {
  if (props.index === undefined || props.disabled) return;
  tabsContext?.setActiveTab(props.index);
}
</script>

<style lang="scss" scoped src="./Tab.style.scss"></style>
