<template>
  <div class="accordion">
    <div
      v-for="(item, index) in accordionItems"
      :key="index"
      :class="accordionItemClasses"
    >
      <div
        :class="[accordionHeaderClasses, { 'accordion-header-disabled': item.disabled }]"
        @click="toggleAccordion(index)"
      >
        <template v-if="accordionIconPosition === 'left'">
          <Svg
            v-if="item.isOpen"
            :src="removeCircleOutlineIcon"
            size="24"
            class="accordion-arrow"
          ></Svg>
          <Svg
            v-else
            :src="addCircleOutlineIcon"
            size="24"
            class="accordion-arrow"
          ></Svg>
        </template>
        <slot
          v-if="!!$slots.title"
          name="title"
          v-bind="item"
        />
        <template v-else>
          {{ item.title }}
        </template>
        <template v-if="accordionIconPosition === 'right'">
          <Svg
            v-if="item.isOpen"
            :src="removeCircleOutlineIcon"
            size="24"
            class="accordion-arrow"
          ></Svg>
          <Svg
            v-else
            :src="addCircleOutlineIcon"
            size="24"
            class="accordion-arrow"
          ></Svg>
        </template>
      </div>
      <transition
        appear
        @before-enter="beforeEnter"
        @enter="enter"
        @before-leave="beforeLeave"
        @leave="leave"
      >
        <div
          v-if="item.isOpen"
          class="accordion-content-container"
        >
          <div
            v-if="item.content && !item.slotKey"
            :class="accordionContentClasses"
            v-html="item.content"
          />
          <div
            v-if="item.slotKey"
            :class="accordionContentClasses"
          >
            <slot
              :name="item.slotKey"
              v-bind="item"
            ></slot>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { addCircleOutlineIcon, removeCircleOutlineIcon } from '@/assets/icons';
import Svg from 'library-components/Svg';
import { computed, ref } from 'vue';
import type { AccordionEmits, AccordionProps } from './types';

const props = withDefaults(defineProps<AccordionProps>(), {
  allowMultiple: false,
  accordionIconPosition: 'right',
  separator: false,
});

const emit = defineEmits<AccordionEmits>();

const accordionItems = ref(
  props.items?.map(item => ({
    ...item,
    isOpen: item?.isOpen ?? false,
  }))
);

const accordionItemClasses = computed(() => {
  return [
    'accordion-item',
    {
      'accordion-item-separator': props.separator,
    },
  ];
});

const accordionHeaderClasses = computed(() => {
  return ['accordion-header', `accordion-header-${props.accordionIconPosition}`];
});

const accordionContentClasses = computed(() => {
  return ['accordion-content', `accordion-content-${props.accordionIconPosition}`];
});

function toggleAccordion(index: number) {
  const item = accordionItems.value[index];

  if (item.disabled) return;

  if (!props.allowMultiple) {
    accordionItems.value.forEach((item, i) => {
      if (i !== index) item.isOpen = false;
    });
  }

  if (!item.isOpen) {
    emit('openedAccordion', item, index);
  }

  item.isOpen = !item.isOpen;

  if (!item.isOpen) {
    emit('closedAccordion', item, index);
  }
}

function beforeEnter(el: any) {
  el.style.height = '0';
}

function enter(el: any) {
  el.style.height = el.scrollHeight + 'px';
}

function beforeLeave(el: any) {
  el.style.height = el.scrollHeight + 'px';
}

function leave(el: any) {
  el.style.height = '0';
}
</script>

<style lang="scss" scoped src="./Accordion.style.scss"></style>
