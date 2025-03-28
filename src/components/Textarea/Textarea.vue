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
    <textarea
      :id="id"
      v-model="model"
      class="textarea"
      :class="[{ 'textarea-error': error }]"
      :style="textareaStyle"
      :rows="rows"
      :cols="cols"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxLength"
    ></textarea>
    <div
      v-if="(error && errorMessage) || (!error && hintMessage) || maxLength"
      class="message-area"
    >
      <div>
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
      <div
        v-if="maxLength"
        class="character-count"
      >
        {{ model?.length || 0 }}/{{ maxLength }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { TextareaProps } from './types';
const props = withDefaults(defineProps<TextareaProps>(), {
  rows: 4,
  cols: 50,
  resize: 'both',
  id: '0',
});

const model = defineModel<string>();

const textareaStyle = computed(() => ({
  resize: props.resize,
}));
</script>

<style lang="scss" scoped src="./Textarea.style.scss" />
