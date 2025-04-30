<template>
  <div class="accordion">
    <div :class="accordionItemClasses">
      <div
        :class="[accordionHeaderClasses, headerClass]"
        @click="toggle"
      >
        <template v-if="accordionIconPosition === 'left' && (!hideIcons || !$slots.header)">
          <Svg
            v-if="isOpen"
            :src="closeIcon || removeCircleOutlineIcon"
            size="24"
            class="accordion__icon"
          ></Svg>
          <Svg
            v-else
            :src="openIcon || addCircleOutlineIcon"
            size="24"
            class="accordion__icon"
          ></Svg>
        </template>
        <slot
          name="header"
          :isOpen="isOpen"
          :toggle="toggle"
          :accordionIconPosition="accordionIconPosition"
        >
          <span v-html="header"></span>
        </slot>
        <template v-if="accordionIconPosition === 'right' && (!hideIcons || !$slots.header)">
          <Svg
            v-if="isOpen"
            :src="closeIcon || removeCircleOutlineIcon"
            size="24"
            class="accordion__icon"
          ></Svg>
          <Svg
            v-else
            :src="openIcon || addCircleOutlineIcon"
            size="24"
            class="accordion__icon"
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
          class="accordion__content-container"
        >
          <div :class="[accordionContentClasses, contentClass]">
            <slot
              name="content"
              :isOpen="isOpen"
              :toggle="toggle"
              :accordionIconPosition="accordionIconPosition"
            >
              <div v-html="content"></div>
            </slot>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
// imports
import { computed } from 'vue';
import { addCircleOutlineIcon, removeCircleOutlineIcon } from '@/assets/icons';
import Svg from 'library-components/Svg';
import type { AccordionProps, AccordionEmits } from './types';

// interfaces & types

// constants

// composable

// props
const props = withDefaults(defineProps<AccordionProps>(), {
  accordionIconPosition: 'right',
  headerClass: '',
  contentClass: '',
  disabled: false,
  header: '',
  content: '',
  hideIcons: false,
  openIcon: '',
  closeIcon: '',
});

// defineEmits
const emit = defineEmits<AccordionEmits>();

// model
const isOpen = defineModel<boolean>('isOpen', { default: false });

// computed
const accordionItemClasses = computed(() => {
  return ['accordion__item'];
});

const accordionHeaderClasses = computed(() => {
  return ['accordion__header', `accordion__header--${props.accordionIconPosition}`, { 'accordion__header--disabled': props.disabled }];
});

const accordionContentClasses = computed(() => {
  return ['accordion__content', `accordion__content--${props.accordionIconPosition}`];
});

// methods
function toggle() {
  if (props.disabled) return;

  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    emit('close');
  } else {
    emit('open');
  }
}

function beforeEnter(el: Element) {
  const content = el.querySelector('.accordion__content') as HTMLElement;
  const container = el as HTMLElement;
  if (content) {
    container.style.height = '0';
  }
}

function enter(el: Element) {
  const content = el.querySelector('.accordion__content') as HTMLElement;
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
  const content = el.querySelector('.accordion__content') as HTMLElement;
  const container = el as HTMLElement;
  if (content) {
    const height = content.getBoundingClientRect().height;
    container.style.height = `${height}px`;
    void content.offsetHeight;
  }
}

function leave(el: Element) {
  const content = el.querySelector('.accordion__content') as HTMLElement;
  const container = el as HTMLElement;
  if (content) {
    container.style.height = '0';
  }
}
</script>

<style lang="scss" scoped src="./Accordion.style.scss"></style>
