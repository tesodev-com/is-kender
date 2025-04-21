<template>
  <div :class="accordionItemClasses">
    <div
      :class="[accordionHeaderClasses, headerClass]"
      @click="toggle"
    >
      <template v-if="accordionIconPosition === 'left' && (!hideIcons || !$slots.header)">
        <Svg
          v-if="isOpen"
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
        name="header"
        :isOpen="isOpen"
        :toggle="toggle"
        :accordionIconPosition="accordionIconPosition"
      />
      <template v-if="accordionIconPosition === 'right' && (!hideIcons || !$slots.header)">
        <Svg
          v-if="isOpen"
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
        v-if="isOpen"
        class="accordion-content-container"
      >
        <div :class="[accordionContentClasses, contentClass]">
          <slot
            name="content"
            :isOpen="isOpen"
            :toggle="toggle"
            :accordionIconPosition="accordionIconPosition"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
// imports
import { addCircleOutlineIcon, removeCircleOutlineIcon } from '@/assets/icons';
import Svg from 'library-components/Svg';
import { computed } from 'vue';
import type { AccordionItemComponentProps, AccordionItemEmits } from '../types';

// interfaces & types

// constants

// composable

// props
const props = withDefaults(defineProps<AccordionItemComponentProps>(), {
  accordionIconPosition: 'right',
  separator: false,
  headerClass: '',
  contentClass: '',
  disabled: false,
  modelValue: false,
  hideIcons: false,
});

// defineEmits
const emit = defineEmits<AccordionItemEmits>();

// states (refs and reactives)

// computed
const isOpen = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});

const accordionItemClasses = computed(() => {
  return [
    'accordion-item',
    {
      'accordion-item-separator': props.separator,
    },
  ];
});

const accordionHeaderClasses = computed(() => {
  return ['accordion-header', `accordion-header-${props.accordionIconPosition}`, { 'accordion-header-disabled': props.disabled }];
});

const accordionContentClasses = computed(() => {
  return ['accordion-content', `accordion-content-${props.accordionIconPosition}`];
});

// watchers

// lifecycles

// methods
function toggle() {
  if (props.disabled) return;

  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    emit('opened');
  } else {
    emit('closed');
  }
}

function beforeEnter(el: Element) {
  const content = el.querySelector('.accordion-content') as HTMLElement;
  const container = el as HTMLElement;
  if (content) {
    container.style.height = '0';
  }
}

function enter(el: Element) {
  const content = el.querySelector('.accordion-content') as HTMLElement;
  const container = el as HTMLElement;
  if (content) {
    const height = content.getBoundingClientRect().height;
    container.style.height = `${height}px`;

    const handleTransitionEnd = () => {
      container.style.height = 'auto';
      container.removeEventListener('transitionend', handleTransitionEnd);
    };
    container.addEventListener('transitionend', handleTransitionEnd);
  }
}

function beforeLeave(el: Element) {
  const content = el.querySelector('.accordion-content') as HTMLElement;
  const container = el as HTMLElement;
  if (content) {
    const height = content.getBoundingClientRect().height;
    container.style.height = `${height}px`;
    void content.offsetHeight;
  }
}

function leave(el: Element) {
  const content = el.querySelector('.accordion-content') as HTMLElement;
  const container = el as HTMLElement;
  if (content) {
    container.style.height = '0';
  }
}
</script>

<style lang="scss" scoped src="../Accordion.style.scss"></style>
