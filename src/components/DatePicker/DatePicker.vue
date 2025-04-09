<template>
  <div class="datepicker-container">
    <!-- Aside -->
    <div
      v-if="selectionItems.length"
      class="datepicker-sidebar"
    >
      <QuickSelection
        ref="quickSelectionRef"
        :selectionItems="selectionItems"
        @on-select="onQuickSelect"
      />
    </div>
    <!-- Body -->
    <div class="datepicker-content">
      <div class="datepicker-body">
        <Calendar
          v-model="modelValue"
          showPrevIcon
          :showNextIcon="!multipleMonth"
          :calendarDate="calendarVisibleDates.start"
          :selectionMode="selectionMode"
          @on-prev="onPrev"
          @on-next="onNext"
        />
        <Calendar
          v-if="multipleMonth"
          v-model="modelValue"
          :showPrevIcon="!multipleMonth"
          showNextIcon
          :calendarDate="calendarVisibleDates.end"
          :selectionMode="selectionMode"
          @on-prev="onPrev"
          @on-next="onNext"
        />
      </div>
      <div
        v-if="actionBar"
        class="datepicker-footer"
      >
        <div
          v-if="actionBar"
          class="datepicker-actions"
          :class="{ 'fluid-actions': !multipleMonth }"
        >
          <Button
            color="secondary"
            variant="outline"
            :fluid="!multipleMonth"
            @click="onClear"
          >
            Temizle
          </Button>
          <Button
            color="primary"
            variant="solid"
            :fluid="!multipleMonth"
          >
            Uygula
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// imports
import Button from 'library-components/Button';
import { computed, ref, useTemplateRef } from 'vue';
import { Calendar, QuickSelection, type DateModel } from './SubComponents';
import type { DatePickerProps } from './types';
import Utils from './utils';

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
const quickSelectionRef = useTemplateRef('quickSelectionRef');
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
function onClear() {
  modelValue.value = null;
  if (quickSelectionRef.value) quickSelectionRef.value.onClear();
}
function onQuickSelect(dates: Array<Date | string> | Date | string) {
  modelValue.value = dates;
}
</script>

<style lang="scss" scoped src="./DatePicker.style.scss"></style>
