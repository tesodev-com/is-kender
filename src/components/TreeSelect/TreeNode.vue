<template>
  <li
    class="select-dropdown-item"
    :class="{
      'select-dropdown-item-selected': isSelected || (isPartial && isMultiple),
      'select-dropdown-item-disabled': node.disabled,
    }"
    :style="{ paddingLeft: `${depth ? depth * 1.375 + (node.children?.length ? 0 : 1.375) : 0.375}rem` }"
    role="treeitem"
    :data-value="node.value"
    :aria-selected="isSelected"
    :aria-disabled="node.disabled"
    :aria-expanded="node.children?.length ? isExpanded : undefined"
    @click="handleClick"
    @mouseover="$emit('mouseover', node.value)"
  >
    <div
      v-if="node.children?.length"
      class="select-dropdown-item-expand"
      :class="{ 'select-dropdown-item-expand-disabled': node.disabled }"
      @click.stop="toggleExpand"
    >
      <Svg
        v-if="node.children?.length"
        :src="chevronRightIcon"
        size="20"
        class="select-tree-expand-icon"
        :class="{ 'select-tree-expand-icon-open': isExpanded }"
      ></Svg>
    </div>
    <p class="select-dropdown-item-label">
      {{ node.label }}
    </p>
    <Svg
      v-if="isSelected"
      :src="checkIcon"
      size="20"
      class="select-dropdown-item-icon"
      :class="{ 'select-dropdown-item-icon-disabled': node.disabled }"
    ></Svg>
    <Svg
      v-else-if="isPartial && isMultiple"
      :src="removeIcon"
      size="20"
      class="select-dropdown-item-icon"
      :class="{ 'select-dropdown-item-icon-disabled': node.disabled }"
    ></Svg>
  </li>
  <ul
    v-if="node.children?.length && isExpanded"
    class="select-tree-list"
  >
    <TreeNode
      v-for="(child, idx) in node.children"
      :key="child.value"
      :node="child"
      :depth="depth + 1"
      :isSelected="child.isSelected ?? false"
      :isPartial="child.isPartial ?? false"
      :isExpanded="expandedNodes.has(child.value)"
      :isMultiple="isMultiple"
      :expandedNodes="expandedNodes"
      :nodeIndex="nodeIndex + idx + 1"
      @select="$emit('select', $event)"
      @toggle-expand="$emit('toggleExpand', $event)"
    />
  </ul>
</template>

<script setup lang="ts">
import Svg from 'library-components/Svg';
import { checkIcon, removeIcon, chevronRightIcon } from '@/assets/icons';
import type { TreeSelectNodeEmits, TreeSelectNodeProps } from './types';

const props = defineProps<TreeSelectNodeProps>();

const emit = defineEmits<TreeSelectNodeEmits>();

function handleClick() {
  if (!props.node.disabled) {
    emit('select', props.node);
  }
}

function toggleExpand() {
  if (!props.node.disabled && props.node.children?.length) {
    emit('toggleExpand', props.node);
  }
}
</script>

<style lang="scss" scoped src="./TreeNode.style.scss"></style>
