<template>
  <div class="datepicker-container">
    <!-- Aside -->
    <div
      v-if="selectionItems.length"
      class="datepicker-sidebar"
    >
      <QuickSelection :selectionItems="selectionItems" />
    </div>
    <!-- Body -->
    <div class="datepicker-content">
      <div class="datepicker-body">Body</div>
      <div class="datepicker-footer">Footer</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QuickSelection } from './SubComponents';
import type { DatePickerProps } from './types';

// imports

// interfaces & types

// constants

// composable

// props
withDefaults(defineProps<DatePickerProps>(), {
  selectionItems: () => [],
});
// defineEmits

// states (refs and reactives)

// computed

// watchers

// lifecycles

// methods
</script>

<style lang="scss" scoped src="./DatePicker.style.scss"></style>
