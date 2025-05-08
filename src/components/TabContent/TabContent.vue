<template>
  <div
    :hidden="selectedTab !== props.value"
    class="tabs__content"
    :class="[props.customClass, { 'tabs__content--active': selectedTab === props.value }]"
    role="tabcontent"
  >
    <slot v-if="selectedTab === props.value"></slot>
  </div>
</template>

<script setup lang="ts">
// imports
import type { TabsContext } from 'library-components/Tabs';
import { inject, ref } from 'vue';
import type { TabContentProps } from './types';

// interfaces & types

// constants

// composable

// props
const props = withDefaults(defineProps<TabContentProps>(), {
  customClass: '',
});

// defineEmits

// states (refs and reactives)
const { selectedTab } = inject<TabsContext>('tabsContext', {
  selectedTab: ref(''),
});

// computed

// watchers

// lifecycles

// methods
</script>

<style lang="scss" scoped src="./TabContent.style.scss"></style>
