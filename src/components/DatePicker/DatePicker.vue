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
      <div class="datepicker-body">
        <Calendar
          v-model="modelValue"
          showPrevIcon
          :calendarDate="calendarVisibleDates.start"
          :selectionMode="selectionMode"
          @on-prev="onPrev"
          @on-next="onNext"
        />
        <Calendar
          v-model="modelValue"
          showNextIcon
          :calendarDate="calendarVisibleDates.end"
          :selectionMode="selectionMode"
          @on-prev="onPrev"
          @on-next="onNext"
        />
      </div>
      <div class="datepicker-footer">Footer</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Calendar, QuickSelection, type DateModel } from './SubComponents';
import type { DatePickerProps } from './types';
import Utils from './utils';
// imports

// interfaces & types

// constants

// composable

// props
withDefaults(defineProps<DatePickerProps>(), {
  selectionItems: () => [],
  selectionMode: 'single',
});
const modelValue = defineModel<DateModel>();
// defineEmits

// states (refs and reactives)
const visibleDate = ref<Date>(new Date());
// computed
const calendarVisibleDates = computed(() => {
  return {
    start: new Date(visibleDate.value.getFullYear(), visibleDate.value.getMonth()),
    end: new Date(visibleDate.value.getFullYear(), visibleDate.value.getMonth() + 1),
  };
});
// watchers

// lifecycles

// methods
function onPrev() {
  visibleDate.value = Utils.addMonths(visibleDate.value, -1);
}
function onNext() {
  visibleDate.value = Utils.addMonths(visibleDate.value, 1);
}
</script>

<style lang="scss" scoped src="./DatePicker.style.scss"></style>
