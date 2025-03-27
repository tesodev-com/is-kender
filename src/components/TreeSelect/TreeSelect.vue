<template>
  <div
    ref="selectContainer"
    class="select-container"
  >
    <div
      v-if="label"
      class="select-label-container"
    >
      <label
        :for="selectId"
        @click="handleLabelClick"
      >
        {{ label }}
      </label>
      <span
        v-if="required"
        class="select-label-required"
      >
        *
      </span>
    </div>
    <div
      :id="selectId"
      ref="selectTrigger"
      class="select-trigger"
      :class="[{ 'select-trigger-open': isOpen, 'select-trigger-disabled': disabled }]"
      tabindex="0"
      role="combobox"
      :aria-expanded="isOpen"
      :aria-controls="`${selectId}-dropdown`"
      @click="toggleDropdown"
      @keydown="handleKeydown"
    >
      <Svg
        v-if="leftIcon"
        :src="leftIcon"
        size="20"
        class="select-trigger-left-icon"
      ></Svg>
      <p
        class="select-trigger-value"
        :class="[{ 'select-trigger-value-selected': hasSelectedValue }]"
      >
        {{ computePlaceholder }}
      </p>
      <Svg
        :src="arrowDownIcon"
        size="20"
        class="select-trigger-arrow"
        :class="[{ 'select-trigger-arrow-open': isOpen }]"
      ></Svg>
    </div>
    <Teleport to="body">
      <transition name="select-fade">
        <div
          v-if="isOpen"
          :id="`${selectId}-dropdown`"
          ref="dropdown"
          class="select-dropdown"
          :style="dropdownPosition"
          role="tree"
          tabindex="-1"
          @click="handleDropdownClick"
        >
          <template v-if="isSearch && treeOptions.length > 0">
            <input
              v-model="searchModel"
              placeholder="Search..."
              class="select-dropdown-search"
            />
          </template>
          <template v-if="!filteredTreeOptions.length">
            <div class="select-dropdown-no-content">
              <p>No options available</p>
            </div>
          </template>
          <template v-else>
            <ul class="select-tree-list">
              <TreeNode
                v-for="(node, index) in filteredTreeOptions"
                :key="node.value"
                :node="node"
                :depth="0"
                :isSelected="node.isSelected ?? false"
                :isPartial="node.isPartial ?? false"
                :isExpanded="expandedNodes.has(node.value)"
                :isMultiple="isMultiple"
                :expandedNodes="expandedNodes"
                :nodeIndex="index"
                @select="selectNode"
                @toggle-expand="toggleExpand"
              />
            </ul>
          </template>
        </div>
      </transition>
    </Teleport>
    <div
      v-if="hint || $slots.hint"
      class="select-hint"
    >
      <template v-if="$slots.hint">
        <slot name="hint" />
      </template>
      <template v-else>
        {{ hint }}
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import Svg from 'library-components/Svg';
import TreeNode from './TreeNode.vue';
import { computed, ref, useId, useTemplateRef, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { arrowDownIcon } from '@/assets/icons';
import { calculateElementPosition, type PositionStyle } from '@/utils/calculatePosition';
import type { TreeSelectNode, TreeSelectProps } from './types';

const props = withDefaults(defineProps<TreeSelectProps>(), {
  isMultiple: false,
  selectAllChild: false,
  optionsPosition: 'bottom',
  optionsOffset: 4,
  isSearch: false,
});

const selectId = useId();
const model = defineModel<string | null>();
const modelMultiple = defineModel<string[]>('multiple', { default: () => [] });
const searchModel = defineModel<string>('search', { default: '' });
const selectContainer = useTemplateRef('selectContainer');
const selectTrigger = useTemplateRef('selectTrigger');
const dropdown = useTemplateRef('dropdown');
const isOpen = ref<boolean>(false);
const dropdownPosition = ref<PositionStyle>({ top: '0px', left: '0px', width: '0px' });
const expandedNodes = ref<Set<string>>(new Set());

const filteredTreeOptions = computed(() => {
  const selectedValues = props.isMultiple ? modelMultiple.value : model.value ? [model.value] : [];

  const filterNode = (node: TreeSelectNode): TreeSelectNode | null => {
    const matchesSearch = !props.isSearch || !searchModel.value || node.label.toLowerCase().includes(searchModel.value.toLowerCase());
    const children = node.children?.map(filterNode).filter((child: TreeSelectNode | null) => child !== null) || [];
    const hasMatchingChildren = children.length > 0;

    if (matchesSearch || hasMatchingChildren) {
      const selectionState = getNodeSelectionState(node, selectedValues);
      return {
        ...node,
        isSelected: selectionState.isSelected ?? false,
        isPartial: selectionState.isPartial ?? false,
        children: hasMatchingChildren ? children : node.children,
      };
    }
    return null;
  };

  return props.treeOptions.map(filterNode).filter((node: TreeSelectNode | null) => node !== null);
});

const selectedValue = computed(() => {
  const findLabel = (nodes: TreeSelectNode[]): string[] => {
    let labels: string[] = [];
    nodes.forEach(node => {
      const matchedNode = props.isMultiple ? modelMultiple.value.includes(node.value) : node.value === model.value;
      if (matchedNode) {
        labels.push(node.label);
      }
      if (node.children) labels.push(...findLabel(node.children));
    });
    return labels;
  };
  return findLabel(props.treeOptions).join(', ') || '';
});

const hasSelectedValue = computed(() => {
  return props.isMultiple ? modelMultiple.value.length > 0 : !!model.value;
});

const computePlaceholder = computed(() => {
  return selectedValue.value || props.placeholder || '';
});

onMounted(() => {
  window.addEventListener('click', handleOutsideClick);
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', handleOutsideClick);
  window.removeEventListener('resize', handleResize);
});

function selectNode(node: TreeSelectNode) {
  if (node.disabled) return;

  if (props.isMultiple) {
    const values = new Set(modelMultiple.value);
    if (props.selectAllChild) {
      const allChildNodes = getAllChildNodeValues(node);
      const isFullySelected = allChildNodes.every(val => values.has(val));
      if (isFullySelected) {
        allChildNodes.forEach(val => values.delete(val));
      } else {
        allChildNodes.forEach(val => values.add(val));
      }
    } else {
      if (values.has(node.value)) {
        values.delete(node.value);
      } else {
        values.add(node.value);
      }
    }
    modelMultiple.value = Array.from(values);
  } else {
    model.value = node.value;
    isOpen.value = false;
  }
}

function toggleExpand(node: TreeSelectNode) {
  const newExpandedNodes = new Set(expandedNodes.value);
  if (newExpandedNodes.has(node.value)) {
    newExpandedNodes.delete(node.value);
  } else {
    newExpandedNodes.add(node.value);
  }
  expandedNodes.value = newExpandedNodes;
}

function updateDropdownPosition() {
  nextTick(() => {
    if (!selectContainer.value || !selectTrigger.value || !dropdown.value || !isOpen.value) return;
    dropdownPosition.value = calculateElementPosition(selectContainer.value, selectTrigger.value, dropdown.value, {
      preferredPosition: props.optionsPosition,
      offset: props.optionsOffset,
    });
  });
}

function toggleDropdown() {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
  searchModel.value = '';
  if (isOpen.value) {
    updateDropdownPosition();
    nextTick(() => selectTrigger.value?.focus());
  }
}

function handleDropdownClick(event: MouseEvent) {
  if (event.target === dropdown.value) selectTrigger.value?.focus();
}

function handleOutsideClick(event: MouseEvent) {
  if (selectContainer.value && !selectContainer.value.contains(event.target as Node) && dropdown.value && !dropdown.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
}

function handleLabelClick() {
  selectTrigger.value?.focus();
  toggleDropdown();
}

function handleResize() {
  if (isOpen.value) updateDropdownPosition();
}

function getAllChildNodeValues(node: TreeSelectNode): string[] {
  let values: string[] = [];
  if (!node.disabled) {
    values.push(node.value);
  }
  if (node.children) {
    node.children.forEach(child => {
      values = values.concat(getAllChildNodeValues(child));
    });
  }
  return values;
}

function getNodeSelectionState(node: TreeSelectNode, selectedValues: string[]) {
  const allChildNodes = getAllChildNodeValues(node);
  const selectedChildNodes = allChildNodes.filter(val => selectedValues.includes(val));
  const isNodeSelected = selectedValues.includes(node.value);
  const hasSelectedChildNodes = selectedChildNodes.length > 0;

  if (props.selectAllChild) {
    return {
      isSelected: selectedChildNodes.length === allChildNodes.length && hasSelectedChildNodes,
      isPartial: hasSelectedChildNodes && selectedChildNodes.length < allChildNodes.length,
    };
  } else {
    return {
      isSelected: isNodeSelected,
      isPartial: hasSelectedChildNodes && !isNodeSelected,
    };
  }
}

function handleKeydown(event: KeyboardEvent) {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      if (!isOpen.value) {
        toggleDropdown();
      }
      break;
    case 'Escape':
      event.preventDefault();
      if (isOpen.value) {
        isOpen.value = false;
        selectTrigger.value?.focus();
      }
      break;
  }
}
</script>

<style lang="scss" scoped src="./TreeSelect.style.scss"></style>
