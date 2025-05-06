<template>
  <div class="otp-container">
    <label
      v-if="slots.label || label"
      class="otp-label"
      :for="`otp-input-${inputId}-0`"
    >
      <slot
        name="label"
        :label="label"
      >
        {{ label }}
      </slot>
    </label>
    <div
      ref="inputContainerRef"
      class="otp-inputs"
      @paste="handlePaste"
    >
      <template
        v-for="(_, index) in digits"
        :key="index"
      >
        <span
          v-if="hasDivider && index === dividerPosition"
          class="otp-divider"
        >
          -
        </span>
        <input
          :id="`otp-input-${inputId}-${index}`"
          :type="inputType"
          :value="otpArray[index]"
          :placeholder="placeholder"
          class="otp-input"
          :class="[`otp-input-${size}`, { error: error }]"
          maxlength="1"
          autocomplete="one-time-code"
          @keydown="handleKeyDown($event, index)"
        />
      </template>
    </div>
    <div
      v-if="(slots.hint || hint) && !error"
      class="otp-hint"
    >
      <slot
        name="hint"
        :hint="hint"
      >
        {{ hint }}
      </slot>
    </div>
    <div
      v-if="error && errorMessage"
      class="otp-error"
      role="alert"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
// imports
import { computed, onMounted, useId, useTemplateRef } from 'vue';
import type { OtpInputEmits, OtpInputProps, OtpInputSlots } from './types';

// interfaces & types

// constants

// composable

// props
const props = withDefaults(defineProps<OtpInputProps>(), {
  size: 'md',
  digits: 4,
  showDivider: false,
  isPassword: false,
  placeholder: '',
  focusOnMount: false,
  numericOnly: true,
  error: false,
  errorMessage: '',
});

// defineEmits
const emit = defineEmits<OtpInputEmits>();

// defineSlots
const slots = defineSlots<OtpInputSlots>();

// states (refs and reactives)
const inputId = useId();
const otp = defineModel<string>({ required: true });
const inputContainer = useTemplateRef('inputContainerRef');

// computed
const inputType = computed(() => {
  return props.isPassword ? 'password' : 'text';
});

const hasDivider = computed(() => {
  return props.showDivider && props.digits % 2 === 0;
});

const dividerPosition = computed(() => {
  return props.digits / 2;
});

const otpArray = computed(() => {
  return otp.value.padEnd(props.digits, '').split('');
});

// watchers

// lifecycles
onMounted(() => {
  if (props.focusOnMount) {
    focusInput(0);
  }
});

// methods
function getInputAtIndex(index: number): HTMLInputElement | null {
  return inputContainer.value?.querySelector(`#otp-input-${inputId}-${index}`) || null;
}

function focusInput(index: number) {
  if (index >= 0 && index < props.digits) {
    const input = getInputAtIndex(index);
    if (input) {
      input.focus();
    }
  }
}

function handleKeyDown(event: KeyboardEvent, index: number) {
  const target = event.target as HTMLInputElement;

  if (props.numericOnly && event.key && !/^\d$/.test(event.key)) {
    if (!['Backspace', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault();
      return;
    }
  }

  if (event.key.length === 1) {
    event.preventDefault();
    const newOtp = (otp.value || '').padEnd(props.digits, '').split('');
    newOtp[index] = event.key;
    otp.value = newOtp.join('');

    if (index < props.digits - 1) {
      focusInput(index + 1);
    }

    if (otp.value.length === props.digits) {
      emit('complete', otp.value);
    }
    return;
  }

  if (event.key === 'Backspace') {
    if (!target.value && index > 0) {
      const newOtp = otp.value.padEnd(props.digits, '').split('');
      newOtp[index - 1] = '';
      otp.value = newOtp.join('');
      focusInput(index - 1);
    } else {
      const newOtp = otp.value.padEnd(props.digits, '').split('');
      newOtp[index] = '';
      otp.value = newOtp.join('');
    }
  }

  if (event.key === 'ArrowLeft' && index > 0) {
    event.preventDefault();
    focusInput(index - 1);
  }

  if (event.key === 'ArrowRight' && index < props.digits - 1) {
    event.preventDefault();
    focusInput(index + 1);
  }
}

function handlePaste(event: ClipboardEvent) {
  event.preventDefault();
  const pasteData = event.clipboardData?.getData('text') || '';
  let cleanData = pasteData.slice(0, props.digits);

  if (props.numericOnly) {
    cleanData = cleanData.replace(/\D/g, '');
  }

  otp.value = cleanData.padEnd(props.digits, '');

  const nextFocusIndex = Math.min(cleanData.length, props.digits - 1);
  focusInput(nextFocusIndex);

  if (otp.value.length === props.digits) {
    emit('complete', otp.value);
  }
}
</script>

<style lang="scss" scoped src="./OtpInput.style.scss"></style>
