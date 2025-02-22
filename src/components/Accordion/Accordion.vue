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
          <svg
            v-if="item.isOpen"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="accordion-arrow"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
            />
            <path d="M8 12h8" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="accordion-arrow"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
            />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
          </svg>
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
          <svg
            v-if="item.isOpen"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="accordion-arrow"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
            />
            <path d="M8 12h8" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="accordion-arrow"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
            />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
          </svg>
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
import { computed, ref } from 'vue';

export interface IAccordionItem {
  title: string;
  content?: string;
  slotKey?: string;
  isOpen?: boolean;
  disabled?: boolean;
}

export interface IAccordion {
  items: IAccordionItem[];
  allowMultiple?: boolean;
  accordionIconPosition?: 'left' | 'right';
  separator?: boolean;
}

export interface IAccordionEmits {
  (event: 'openedAccordion', item: IAccordionItem, index: number): void;
  (event: 'closedAccordion', item: IAccordionItem, index: number): void;
}

const props = withDefaults(defineProps<IAccordion>(), {
  allowMultiple: false,
  accordionIconPosition: 'right',
  separator: false,
});

const emit = defineEmits<IAccordionEmits>();

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
