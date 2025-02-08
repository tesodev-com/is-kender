<template>
  <button
    :class="buttonClasses"
    :disabled="props.isDisabled"
    type="button"
    @click="handleClick">
    <svg v-if="props.isLoading" class="spinner"></svg>
    <component :is="props.iconLeft" v-if="!props.isLoading && props.iconLeft" alt="left-icon" />

    <div v-if="!slots.default && props.text">
      {{ props.text }}
    </div>
    <div v-else>
      <slot></slot>
    </div>
    <component :is="props.iconRight" v-if="!props.isLoading && props.iconRight" alt="right-icon" />
  </button>
</template>

<script lang="ts" setup>
import type { Icon } from '@/globalTypes/types';
import { computed, useSlots } from 'vue';
export interface IButton {
   size?: 'small' | 'medium' | 'large';
   shadow?: boolean;
   variant: 'primary' | 'secondary' | 'ghost';
   isDisabled?: boolean;
   fluid?: boolean;
   isLoading: boolean;
   iconRight?: Icon;
   iconLeft?: Icon;
   rounded?: boolean;
   text?: string;
}

const props = withDefaults(defineProps<IButton>(), {
  size: 'medium',
  text: 'Button',
  shadow: false,
  rounded: false,
  variant: 'primary',
  isDisabled: false,
  isLoading: false,
});

const emit = defineEmits<{
   (e: 'onClick'): void;
}>();

const buttonClasses = computed(() => {
  return {
    button: true,
    shadowed: props.shadow && props.variant !== 'ghost',
    rounded: props.rounded,
    fluid: props.fluid,
    [props.size]: props.size,
    [props.variant]: props.variant,
  };
});
const slots = useSlots();

const handleClick = () => {
  emit('onClick');
};
</script>

<style lang="scss" scoped src="./Button.style.scss"/>
