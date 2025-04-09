<template>
  <div class="datepicker-panel">
    <div class="datepicker-aside">Filter</div>
    <div class="datepicker-body">
      <div class="datepicker-calendars">
        <Calendar
          v-model="model"
          :header="{
            prev: true,
            title: true,
          }"
          :visibleDate="visibleDates.start"
          @on-prev="onPrev"
        />
        <Calendar
          v-model="model"
          :header="{
            title: true,
            next: true,
          }"
          :visibleDate="visibleDates.end"
          @on-next="onNext"
        />
      </div>
      <div class="datepicker-actions">Actions</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Calendar from './Calendar.vue';
import type { CalendarEmits, CalendarProps, DateModel } from './types';
import Utils from './utils';
const modelValue = defineModel<DateModel>();
const emit = defineEmits<CalendarEmits>();
const props = withDefaults(defineProps<CalendarProps>(), {
  selectMode: 'range',
});
const activeDate = ref(new Date());
const visibleDates = computed(() => {
  return {
    start: new Date(activeDate.value.getFullYear(), activeDate.value.getMonth()),
    end: new Date(activeDate.value.getFullYear(), activeDate.value.getMonth() + 1),
  };
});
const model = computed({
  get() {
    return Utils.normalizeModelValue(modelValue.value);
  },
  set(val: typeof modelValue.value) {
    emit('update:modelValue', val);
  },
});
const startDate = computed({
  get() {
    if (Array.isArray(model.value)) {
      return model.value[0] ? new Date(model.value[0]) : null;
    }
    return model.value ? new Date(model.value) : null;
  },
  set(val: Date | null) {
    if (props.selectMode === 'range') {
      const end = endDate.value;
      model.value = [val, end];
    } else {
      model.value = val;
    }
  },
});
const endDate = computed({
  get() {
    if (Array.isArray(model.value)) {
      return model.value[1] ? new Date(model.value[1]) : null;
    }
    return null;
  },
  set(val: Date | null) {
    const start = startDate.value;
    model.value = [start, val];
  },
});
function onPrev(date: Date = activeDate.value) {
  if (date === activeDate.value) {
    activeDate.value = new Date(date.getFullYear(), date.getMonth() - 1);
  } else {
    activeDate.value = new Date(date.getFullYear(), date.getMonth());
  }
}
function onNext(date: Date = activeDate.value) {
  const diff = Utils.getDateDiff(activeDate.value, date);
  if (date === activeDate.value) {
    activeDate.value = new Date(date.getFullYear(), date.getMonth() + 1);
  } else if (diff.months >= 1) {
    activeDate.value = new Date(date.getFullYear(), date.getMonth() - 1);
  } else {
    activeDate.value = new Date(date.getFullYear(), date.getMonth());
  }
}
function onGo(date: Date) {
  activeDate.value = new Date(date.getFullYear(), date.getMonth());
}
defineExpose({
  prev: onPrev,
  next: onNext,
  go: onGo,
});
</script>

<style lang="scss" scoped src="./DatePicker.style.scss"></style>
