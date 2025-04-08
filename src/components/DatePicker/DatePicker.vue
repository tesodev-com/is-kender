<template>
  <div class="calendar">
    <div class="calendar-content">
      <div
        v-if="headerVisible.top || headerVisible.bottom"
        class="calendar-header"
      >
        <div
          v-if="headerVisible.top"
          class="calendar-header-top"
        >
          <Svg
            v-if="props.header?.prev"
            :src="chevronLeftIcon"
            size="1.5rem"
            class="calendar-navigation"
            @click="onPrev"
          ></Svg>
          <span
            v-if="props.header?.title"
            class="calendar-title"
          >
            {{ activeCalendar.monthText }} - {{ activeCalendar.year }}
          </span>
          <Svg
            v-if="props.header?.next"
            :src="chevronRightIcon"
            size="1.5rem"
            class="calendar-navigation"
            @click="onNext"
          ></Svg>
        </div>
        <div
          v-if="headerVisible.bottom"
          class="calendar-header-bottom"
        >
          <span
            v-if="props.header?.view"
            class="selected-date"
          >
            {{ Utils.formatDate(startDate ?? new Date()) }}
          </span>
          <span
            v-if="props.header?.view && props.selectMode === 'range'"
            class="selected-date"
          >
            {{ Utils.formatDate(endDate ?? new Date()) }}
          </span>
          <Button
            v-if="props.header?.today"
            color="secondary"
            variant="outline"
            size="sm"
            class="today-button"
            @click="onUpdateVisibleDate(new Date())"
          >
            Bugün
          </Button>
        </div>
      </div>
      <div class="calendar-body">
        <div class="week-days">
          <span
            v-for="(day, index) in weekDays"
            :key="index"
            class="calendar-cell"
          >
            {{ day }}
          </span>
        </div>
        <div class="month-days">
          <div
            v-for="(day, index) in calendarDays"
            :key="index"
            class="calendar-cell day"
            :class="getDayClasses(day)"
            @click="onClickDay(day)"
          >
            <span class="day-content">
              {{ day.text }}
            </span>
          </div>
        </div>
      </div>
      <div
        v-if="footerVisible"
        class="calendar-footer"
      >
        <Button
          v-if="props.footer?.clear"
          color="secondary"
          variant="outline"
          size="sm"
          fluid
          @click="onClear"
        >
          Temizle
        </Button>
        <Button
          v-if="props.footer?.apply"
          color="primary"
          size="sm"
          fluid
          @click="onApply"
        >
          Seç
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// imports
import { chevronLeftIcon, chevronRightIcon } from '@/assets/icons';
import Button from 'library-components/Button';
import Svg from 'library-components/Svg';
import { computed, ref, watchEffect } from 'vue';
import { DAYS } from './constants';
import type { CalendarEmits, CalendarProps, DateModel, DayItem } from './types';
import Utils from './utils';
// constants
// composable
// props
const props = withDefaults(defineProps<CalendarProps>(), {
  firstDayOfWeek: 'sunday',
  selectMode: 'range',
  header: () => ({
    title: false,
    prev: false,
    next: false,
  }),
  footer: () => ({
    clear: false,
  }),
});
const modelValue = defineModel<DateModel>('modelValue');
// defineEmits
const emit = defineEmits<CalendarEmits>();
// states (refs and reactives)
const isRender = ref(false);
const calendarDays = ref<DayItem[]>([]);
const visibleDate = ref<Date>(new Date());
// computed
const weekDays = computed(() => {
  const weekDays = [];
  const firstDayOfWeek = props.firstDayOfWeek === 'monday' ? 0 : 6;
  for (let i = 0; i < 7; i++) {
    const dayIndex = (firstDayOfWeek + i) % 7;
    weekDays.push(DAYS[dayIndex]);
  }
  return weekDays;
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
const activeCalendar = computed(() => {
  return {
    year: visibleDate.value.getFullYear(),
    month: visibleDate.value.getMonth(),
    day: visibleDate.value.getDate(),
    dayText: new Intl.DateTimeFormat('tr-TR', { weekday: 'long' }).format(visibleDate.value),
    monthText: new Intl.DateTimeFormat('tr-TR', { month: 'long' }).format(visibleDate.value),
  };
});
const headerVisible = computed(() => {
  return {
    top: props.header?.title || props.header?.next || props.header?.prev,
    bottom: props.header?.view || props.header?.today,
  };
});
const footerVisible = computed(() => {
  return props.footer?.clear || props.footer?.apply;
});
// watchers
watchEffect(() => {
  if (!isRender.value && modelValue.value) {
    onUpdateVisibleDate(new Date(model.value[0] ?? new Date()));
    isRender.value = true;
  }
  calendarDays.value = generateCalendar();
});
// lifecycles
// methods
function generateCalendar() {
  const days: DayItem[] = [];
  const activeYear = activeCalendar.value.year;
  const activeMonth = activeCalendar.value.month;
  const isMondayStart = props.firstDayOfWeek === 'monday';

  const firstDayOfMonth = new Date(activeYear, activeMonth, 1);
  let firstWeekDay = firstDayOfMonth.getDay();
  if (isMondayStart) firstWeekDay = firstWeekDay === 0 ? 6 : firstWeekDay - 1;

  const lastDateOfMonth = new Date(activeYear, activeMonth + 1, 0);
  const lastDayOfMonth = lastDateOfMonth.getDate();

  for (let i = firstWeekDay; i > 0; i--) {
    const date = new Date(activeYear, activeMonth, -i + 1);
    let weekDay = date.getDay();
    if (isMondayStart) weekDay = weekDay === 0 ? 6 : weekDay - 1;
    days.push({
      date,
      text: date.getDate().toString(),
      isFirstDayOfWeek: weekDay === 0,
      isLastDayOfWeek: weekDay === 6,
      outOfMonth: true,
    });
  }

  for (let i = 1; i <= lastDayOfMonth; i++) {
    const date = new Date(activeYear, activeMonth, i);
    let weekDay = date.getDay();
    if (isMondayStart) weekDay = weekDay === 0 ? 6 : weekDay - 1;
    days.push({
      date,
      text: i.toString(),
      isToday: Boolean(Utils.isSameDay(date, new Date())),
      isFirstDayOfWeek: weekDay === 0,
      isLastDayOfWeek: weekDay === 6,
    });
  }

  let lastWeekDay = lastDateOfMonth.getDay();
  if (isMondayStart) lastWeekDay = lastWeekDay === 0 ? 6 : lastWeekDay - 1;
  const remainingDays = 6 - lastWeekDay;
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(activeYear, activeMonth + 1, i);
    let weekDay = date.getDay();
    if (isMondayStart) weekDay = weekDay === 0 ? 6 : weekDay - 1;
    days.push({
      date,
      text: i.toString(),
      isFirstDayOfWeek: weekDay === 0,
      isLastDayOfWeek: weekDay === 6,
      outOfMonth: true,
    });
  }

  return days;
}
function onClickDay(day: DayItem) {
  const [sDate, eDate] = [...Utils.normalizeModelValue(model.value)];
  if (props.selectMode === 'range') {
    if (!sDate || (sDate && eDate)) {
      updateModelValue([day.date, null]);
    } else {
      if (Utils.isBefore(day.date, sDate)) {
        updateModelValue([day.date, sDate]);
      } else {
        updateModelValue([sDate, day.date]);
      }
    }
  } else {
    const isSameDay = sDate && Utils.isSameDay(day.date, sDate);
    updateModelValue([isSameDay ? null : day.date, null]);
  }
}
function onClear() {
  model.value = [null, null];
}
function onApply() {
  if (typeof props.footer?.apply === 'function') {
    props.footer?.apply({
      startDate: startDate.value,
      endDate: endDate.value,
    });
  }
}
function onPrev() {
  visibleDate.value = Utils.previousMonth(visibleDate.value);
}
function onNext() {
  visibleDate.value = Utils.nextMonth(visibleDate.value);
}
function onUpdateVisibleDate(date: Date) {
  visibleDate.value = date;
}
function updateModelValue(newDates: Array<Date | null>) {
  if (props.selectMode === 'range') {
    modelValue.value = newDates;
  } else {
    modelValue.value = newDates[0];
  }
}
function getDayClasses(day: DayItem) {
  const classes = {
    today: Boolean(day.isToday),
    selected: Boolean((startDate.value && Utils.isSameDay(day.date, startDate.value)) || (endDate.value && Utils.isSameDay(day.date, endDate.value))),
    disabled: Boolean(day.isDisabled),
    'out-of-month': Boolean(day.outOfMonth),
    'first-day-of-week': Boolean(day.isFirstDayOfWeek),
    'last-day-of-week': Boolean(day.isLastDayOfWeek),
  };
  if (startDate.value && endDate.value) {
    Object.assign(classes, {
      passive: Boolean(props.selectMode === 'range' && !classes.selected && (Utils.isBefore(day.date, startDate.value) || Utils.isAfter(day.date, endDate.value))),
      'range-start': Boolean(Utils.isSameDay(day.date, startDate.value)),
      'in-range': Boolean(Utils.isBetween(day.date, startDate.value, endDate.value)),
      'range-end': Boolean(Utils.isSameDay(day.date, endDate.value)),
    });
  }
  return classes;
}
defineExpose({ onPrev, onNext });
</script>

<style lang="scss" scoped src="./DatePicker.style.scss"></style>
