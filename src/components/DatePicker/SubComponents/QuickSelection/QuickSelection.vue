<template>
  <ul
    v-if="getQuickSelectionList.length"
    class="quick-selection-list"
  >
    <li
      v-for="item in getQuickSelectionList"
      :key="item.key"
      class="quick-selection-list-item"
      :class="mapItemClass(item)"
      @click="onClickItem(item)"
    >
      {{ item.label }}
    </li>
  </ul>
</template>

<script setup lang="ts">
// imports
import { computed, ref } from 'vue';
import { QUICK_SELECTION_ITEM } from './constants';
import type { QuickSelectionEmits, QuickSelectionItem, QuickSelectionItemKey, QuickSelectionProps } from './types';
// interfaces & types

// constants

// composable

// props
const props = withDefaults(defineProps<QuickSelectionProps>(), {
  selectionItems: () => [],
});
// defineEmits
const emit = defineEmits<QuickSelectionEmits>();

// states (refs and reactives)
const activeItem = ref<QuickSelectionItemKey | null>(null);

// computed
const getQuickSelectionList = computed(() => {
  return QUICK_SELECTION_ITEM.filter(item => props.selectionItems.includes(item.key));
});
// watchers

// lifecycles

// methods
function mapItemClass(item: QuickSelectionItem) {
  const classes: Record<string, any> = {
    'quick-selection-list-item-active': activeItem.value === item.key,
  };
  return classes;
}
function onClickItem(quickItem: QuickSelectionItem) {
  activeItem.value = quickItem.key;
  emit('onSelect', quickItem.func());
}
function onClear() {
  activeItem.value = null;
}
defineExpose({
  onClear,
});
</script>

<style lang="scss" scoped src="./QuickSelection.style.scss"></style>
