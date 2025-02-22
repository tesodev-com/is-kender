<template>
  <div id="input-container" :class="inputContainerClasses">
    <label v-if="label" class="input-label">{{ label }}</label>
    <div class="input-wrapper" :class="inputWrapperClasses" @click="(e:Event) => emit('clickInput', e)">
      <slot name="left"/>
      <input
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        class="input"
        :class="inputClasses"
        :maxlength="maxlength"
        :minlength="minlength"
      />
      <slot name="right"/>
      <div v-if="errorList?.length" class="error-list">
        <div v-for="error in errorList" :key="error" class="error-list__item">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" >
import { computed } from 'vue';

interface InputProps {
  type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
  placeholder: string
  errorList?: string[]
  disabled?: boolean
  modelValue: string
  fluid: boolean
  label?: string
  size: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'
  maxlength?: number
  minlength?: number
}

const props = withDefaults(defineProps<InputProps>(), {
  fluid: false,
  size: 'medium',
});
const emit = defineEmits<{
  'update:modelValue': [value:any]
  'clickInput': [e: Event]
}>();

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});
const inputClasses = computed(() => ({

}));
const inputWrapperClasses = computed(() => ({
  'input-wrapper': true,
  'input-wrapper--fluid': props.fluid,
  'input-wrapper--error': props.errorList?.length,
  'input-wrapper--disabled': props.disabled,
  [`input-wrapper--${props.size}`]: true,
}));
const inputContainerClasses = computed(() => ({
  'input-container': true,
  'input-container--fluid': props.fluid,
  'input-container--error': props.errorList?.length,
  'input-container--disabled': props.disabled,
  [`input-container--${props.size}`]: true,
}));
</script>

<style lang="scss" scoped src="./Input.style.scss"></style>