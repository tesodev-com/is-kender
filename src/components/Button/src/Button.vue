<script lang="ts" setup>
import { useSlots, computed } from 'vue';
import { Icon } from '../../../globalTypes/types';
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
const emit = defineEmits<{
   (e: 'onClick'): void;
}>();
const slots = useSlots();

const handleClick = () => {
   emit('onClick');
};
</script>

<template>
   <button @click="handleClick" :class="buttonClasses" :disabled="props.isDisabled">
      <svg v-if="props.isLoading" class="spinner"></svg>
      <component v-if="!props.isLoading && props.iconLeft" :is="props.iconLeft" alt="left-icon" />

      <div v-if="!slots.default && props.text">
         {{ props.text }}
      </div>
      <div v-else>
         <slot></slot>
      </div>
      <component v-if="!props.isLoading && props.iconRight" :is="props.iconRight" alt="right-icon" />
   </button>
</template>

<style lang="scss" scoped>
@import 'button.scss';
</style>
