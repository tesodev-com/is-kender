<template>
  <div
    class="checkbox"
    :class="checkboxClasses.checkbox"
  >
    <input
      type="checkbox"
      :name="name"
      :value="value"
      :disabled="disabled"
      class="checkbox__input"
      @change="handleChange"
    />
    <div class="checkbox__box">
      <Svg
        v-if="checked"
        class="checkbox__icon"
        :src="tickIcon"
      ></Svg>
    </div>
    <label
      :for="name"
      class="checkbox__label"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { tickIcon } from '@/assets/icons';
import type { CheckboxProps } from 'library/Checkbox';
import Svg from 'library/Svg';
import { computed } from 'vue';
// imports

// interfaces & types

// constants
const modelValue = defineModel<string[]>({ required: true });
// composable

// props
const props = withDefaults(defineProps<CheckboxProps>(), {
  disabled: false,
  size: 'md',
});
// defineEmits

// states (refs and reactives)

// computed
const checked = computed(() => modelValue.value.includes(props.value));
const checkboxClasses = computed(() => {
  return {
    checkbox: {
      'checkbox--sm': props.size === 'sm',
      'checkbox--md': props.size === 'md',
      'checkbox--lg': props.size === 'lg',
      'checkbox--checked': checked.value,
      'checkbox--disabled': props.disabled,
    },
  };
});

// watchers

// lifecycles

// methods
function handleChange() {
  if (props.disabled) return;
  if (checked.value) {
    modelValue.value = modelValue?.value.filter(v => v !== props.value);
  } else {
    modelValue.value = [...modelValue.value, props.value];
  }
}
</script>

<style lang="scss" scoped src="./Checkbox.style.scss"></style>
