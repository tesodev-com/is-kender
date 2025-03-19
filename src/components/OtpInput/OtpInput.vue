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
      ref="inputContainer"
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
          :class="[`otp-input-${size}`]"
          maxlength="1"
          autocomplete="one-time-code"
          @input="handleInput($event, index)"
          @keydown="handleKeyDown($event, index)"
        />
      </template>
    </div>
    <div
      v-if="slots.hint || hint"
      class="otp-hint"
    >
      <slot
        name="hint"
        :hint="hint"
      >
        {{ hint }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OtpInputEmits, OtpInputProps, OtpInputSlots } from 'library/OtpInput';
import { computed, onMounted, useId, useTemplateRef } from 'vue';

const props = withDefaults(defineProps<OtpInputProps>(), {
  size: 'md',
  digits: 4,
  showDivider: false,
  isPassword: false,
  placeholder: '',
  focusOnMount: false,
  numericOnly: true,
});

const emit = defineEmits<OtpInputEmits>();

const slots = defineSlots<OtpInputSlots>();

const inputId = useId();

const otp = defineModel<string>({ required: true });
const inputContainer = useTemplateRef('inputContainer');

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

onMounted(() => {
  if (props.focusOnMount) {
    focusInput(0);
  }
});

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

function handleInput(event: Event, index: number) {
  const target = event.target as HTMLInputElement;
  let value = target.value.trim();

  if (value.length > 1) {
    value = value.slice(-1);
    target.value = value;
  }

  if (props.numericOnly && value && !/^\d$/.test(value)) {
    target.value = '';
    value = '';
  }

  const newOtp = (otp.value || '').padEnd(props.digits, '').split('');
  newOtp[index] = value;
  otp.value = newOtp.join('');

  if (value && index < props.digits - 1) {
    focusInput(index + 1);
  }

  if (otp.value?.length === props.digits) {
    emit('complete', otp.value);
  }
}

function handleKeyDown(event: KeyboardEvent, index: number) {
  const target = event.target as HTMLInputElement;

  if (event.key === 'Backspace' && !target.value && index > 0) {
    const newOtp = otp.value.padEnd(props.digits, '').split('');
    newOtp[index - 1] = '';
    otp.value = newOtp.join('');
    focusInput(index - 1);
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
