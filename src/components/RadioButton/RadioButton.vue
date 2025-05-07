<template>
  <div
    class="radio-button"
    :class="radioButtonClasses.radioButton"
  >
    <div class="radio-button__circle">
      <div class="radio-button__inner-circle"></div>
    </div>
    <label
      :for="id"
      class="radio-button__label"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      :value="props.value"
      type="radio"
      :name="name"
      class="radio-button__input"
      :class="radioButtonClasses.radioButtonHiddenInput"
      @input="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
// imports
import { computed } from 'vue';
import type { RadioButtonProps } from './types';

// interfaces & types

// constants
const modelValue = defineModel<string>();

// composable

// props
const props = withDefaults(defineProps<RadioButtonProps>(), {
  id: '',
  size: 'md',
  disabled: false,
});

// defineEmits

// defineSlots

// states (refs and reactives)

// computed
const checked = computed(() => modelValue.value === props.value);
const radioButtonClasses = computed(() => {
  return {
    radioButton: {
      'radio-button--sm': props.size === 'sm',
      'radio-button--md': props.size === 'md',
      'radio-button--lg': props.size === 'lg',
      'radio-button--disabled': props.disabled,
      'radio-button--checked': checked.value,
    },
    radioButtonHiddenInput: {
      'radio-button__input--checked': checked.value,
    },
  };
});

// watchers

// lifecycles

// methods
function handleChange() {
  if (props.disabled) return;
  modelValue.value = props.value;
}
</script>

<style lang="scss" scoped src="./RadioButton.style.scss"></style>
