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
      type="radio"
      :name="name"
      :value="value"
      :checked="checked"
      class="radio-button__input"
      :class="radioButtonClasses.radioButtonHiddenInput"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
// imports
// import { type RadioButtonProps } from 'library/RadioButton';
import { computed } from 'vue';
import type { RadioButtonProps } from 'library/RadioButton';
// interfaces & types

// constants
// composable

// props
const props = withDefaults(defineProps<RadioButtonProps>(), {
  id: '',
  size: 'md',
  disabled: false,
});
// defineEmits
const emit = defineEmits<{
  'update:modelValue': [value: string | number];
}>();
// data
// states (refs and reactives)

// computed
const checked = computed(() => props.modelValue === props.value);
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
  emit('update:modelValue', props.value);
}
</script>

<style lang="scss" scoped src="./RadioButton.style.scss"></style>
