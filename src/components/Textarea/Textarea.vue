<template>
  <div class="textarea-wrapper">
    <label
      v-if="label"
      :for="id"
      class="textarea-label"
    >
      {{ label }}
      <span
        v-if="required"
        class="required-asterisk"
      >
        *
      </span>
    </label>
    <div class="textarea-container">
      <textarea
        :id="id"
        ref="textareaRef"
        v-model="modelValue"
        class="textarea"
        :class="{
          'textarea-error': error,
          'no-resize': hideResize || autoResize,
          'fixed-size': hideResize,
        }"
        :style="textareaStyle"
        :rows="computedRows"
        :cols="cols"
        :placeholder="placeholder"
        :disabled="disabled"
      ></textarea>
      <span
        v-if="maxLength"
        class="char-counter"
        :class="{ 'limit-exceeded': modelValueLength > maxLength }"
      >
        {{ modelValueLength }}/{{ maxLength }}
      </span>
    </div>
    <div
      v-if="hasMessages"
      class="message-area"
    >
      <div
        class="message-content"
        :style="`max-width:${contentWidth}`"
      >
        <div
          v-if="error && errorMessage"
          class="error-message"
        >
          {{ errorMessage }}
        </div>
        <div
          v-else-if="hintMessage"
          class="hint-message"
        >
          {{ hintMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// imports
import { computed, ref } from 'vue';
import type { TextareaProps } from './types';
// injects

// interfaces & types

// Constants
const textareaRef = ref<HTMLTextAreaElement | null>(null);
const lineHeight = 24;
const characterWidth = 8;
const paddingOffset = 16;
// composable

// Props with defaults
const props = withDefaults(defineProps<TextareaProps>(), {
  rows: 4,
  cols: 50,
  resize: 'both',
  id: '0',
  autoResize: false,
  hideResize: false,
});

// Emits
const emit = defineEmits(['update:modelValue']);
// states (refs and reactives)

// Computed properties
const modelValue = computed({
  get: () => props.modelValue || '',
  set: value => emit('update:modelValue', value),
});

const computedRows = computed(() => {
  if (props.hideResize) return props.rows;
  return props.autoResize ? 1 : props.rows;
});

const contentWidth = computed(() => `${props.cols * characterWidth}px`);

const textareaStyle = computed(() => ({
  resize: props.hideResize || props.autoResize ? 'none' : props.resize,
  width: props.hideResize ? contentWidth.value : '100%',
  height: props.hideResize ? `${props.rows * lineHeight + paddingOffset}px` : 'auto',
}));

const modelValueLength = computed(() => modelValue.value.length);
const hasMessages = computed(() => (props.error && props.errorMessage) || props.hintMessage);
// watchers

// lifecycles

// methods
</script>

<style lang="scss" scoped src="./Textarea.style.scss" />
