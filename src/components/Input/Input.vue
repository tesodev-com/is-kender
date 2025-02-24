<template>
  <div
    id="input-container"
    class="input-container"
    :class="inputContainerClasses"
  >
    <label
      v-if="label"
      class="input-label"
    >
      {{ label }}
      <span
        v-if="props.required"
        class="input-label--required"
      >
        *
      </span>
    </label>
    <div
      class="input-wrapper"
      :class="inputWrapperClasses"
      @click="(e: Event) => emit('clickInput', e)"
    >
      <slot name="left">
        <BaseSvg
          v-if="defaultLeftIcon.state"
          :src="defaultLeftIcon.icon"
          class="input-wrapper__left-icon"
        />
      </slot>
      <input
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        class="input"
        :class="inputClasses"
        :maxlength="maxlength"
        :minlength="minlength"
      />
      <slot name="right" />
    </div>
    <div
      v-if="errorList?.length"
      class="error-list"
    >
      <div
        v-for="error in errorList"
        :key="error"
        class="error-list__item"
      >
        {{ error }}
      </div>
    </div>
    <div
      v-if="hint && !errorList?.length"
      class="hint"
    >
      {{ hint }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { emailIcon, passwordIcon, telIcon } from '@/assets/icons';
import { computed } from 'vue';
import BaseSvg from '@/components/Svg/Svg.vue';
import type { InputProps } from './Input.d.ts';

const props = withDefaults(defineProps<InputProps>(), {
  fluid: false,
  size: 'sm',
  type: 'text',
});
const emit = defineEmits<{
  'update:modelValue': [value: any];
  clickInput: [e: Event];
}>();

const inputValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});
const inputClasses = computed(() => ({}));
const inputWrapperClasses = computed(() => ({
  'input-wrapper--fluid': props.fluid,
  'input-wrapper--error': props.errorList?.length,
  'input-wrapper--disabled': props.disabled,
  [`input-wrapper--${props.size}`]: true,
}));
const inputContainerClasses = computed(() => ({
  'input-container--fluid': props.fluid,
}));

const defaultLeftIcon = computed(() => {
  const defaultIconList = ['email', 'password', 'tel'];
  const typeObj: Record<(typeof defaultIconList)[number], string> = {
    email: emailIcon,
    password: passwordIcon,
    tel: telIcon,
  };
  return { state: defaultIconList.includes(props.type), icon: typeObj[props.type] };
});
</script>

<style lang="scss" scoped src="./Input.style.scss"></style>
