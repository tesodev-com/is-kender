<template>
  <div class="accordion">
    <template v-if="items">
      <AccordionItem
        v-for="(item, index) in accordionItems"
        :key="index"
        v-model="item.isOpen"
        :accordionIconPosition="accordionIconPosition"
        :separator="separator"
        :headerClass="headerClass"
        :contentClass="contentClass"
        :disabled="item.disabled"
        @opened="handleOpened(item, index)"
        @closed="handleClosed(item, index)"
      >
        <template #header>
          {{ item.title }}
        </template>
        <template #content>
          <div
            v-if="item.content && !item.slotKey"
            v-html="item.content"
          />
          <slot
            v-else-if="item.slotKey"
            :name="item.slotKey"
            v-bind="item"
          />
        </template>
      </AccordionItem>
    </template>
    <template v-else>
      <AccordionItem
        v-model="isContentOpen"
        :accordionIconPosition="accordionIconPosition"
        :separator="separator"
        :headerClass="headerClass"
        :contentClass="contentClass"
        :hideIcons="!!$slots.header"
        @opened="handleOpened({ isOpen: true }, 0)"
        @closed="handleClosed({ isOpen: false }, 0)"
      >
        <template #header="slotProps">
          <slot
            name="header"
            v-bind="slotProps"
          />
        </template>
        <template #content="slotProps">
          <slot
            name="content"
            v-bind="slotProps"
          />
        </template>
      </AccordionItem>
    </template>
  </div>
</template>

<script setup lang="ts">
// imports
import { ref, watch } from 'vue';
import { AccordionItem } from './SubComponents';
import type { AccordionEmits, AccordionProps } from './types';

// interfaces & types

// constants

// composable

// props
const props = withDefaults(defineProps<AccordionProps>(), {
  allowMultiple: false,
  accordionIconPosition: 'right',
  separator: false,
  headerClass: '',
  contentClass: '',
  isOpen: false,
});

// defineEmits
const emit = defineEmits<AccordionEmits>();

// states (refs and reactives)
const accordionItems = ref(
  props.items?.map(item => ({
    ...item,
    isOpen: item?.isOpen ?? false,
  }))
);

const isContentOpen = ref(props?.isOpen ?? false);

// computed

// watchers
watch(
  () => accordionItems.value?.map(item => item.isOpen),
  (newVal, oldVal) => {
    if (!props.allowMultiple && accordionItems.value && newVal) {
      const openedIndex = newVal.findIndex((isOpen, index) => isOpen && !oldVal?.[index]);
      if (openedIndex !== -1) {
        accordionItems.value.forEach((item, index) => {
          if (index !== openedIndex && item.isOpen) {
            item.isOpen = false;
            emit('closedAccordion', item, index);
          }
        });
      }
    }
  },
  { deep: true }
);

// lifecycles

// methods
function handleOpened(item: any, index: number) {
  emit('openedAccordion', item, index);
}

function handleClosed(item: any, index: number) {
  emit('closedAccordion', item, index);
}
</script>

<style lang="scss" scoped src="./Accordion.style.scss"></style>
