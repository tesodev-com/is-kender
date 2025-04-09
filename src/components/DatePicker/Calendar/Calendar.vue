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
            v-if="props.header?.view && props.selectionMode === 'range'"
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
            @click="onUpdateCalendarDate(new Date())"
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
      <div class="calendar-footer">
        <div class="calendar-time">
          <div class="time">
            <Svg
              :src="keyboardArrowUpIcon"
              class="time-icon"
              @click="onHourChange('up')"
            ></Svg>
            <span class="time-text">15</span>
            <Svg
              :src="keyboardArrowDownIcon"
              class="time-icon"
              @click="onHourChange('down')"
            ></Svg>
          </div>
          <span>:</span>
          <div class="time">
            <Svg
              :src="keyboardArrowUpIcon"
              class="time-icon"
              @click="onMinuteChange('up')"
            ></Svg>
            <span class="time-text">15</span>
            <Svg
              :src="keyboardArrowDownIcon"
              class="time-icon"
              @click="onMinuteChange('down')"
            ></Svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// imports
import { chevronLeftIcon, chevronRightIcon, keyboardArrowDownIcon, keyboardArrowUpIcon } from '@/assets/icons';
import Button from 'library-components/Button';
import Svg from 'library-components/Svg';
import { computed, ref, watchEffect } from 'vue';
import Consts from '../constants';
import Utils from '../utils';
import type { CalendarEmits, CalendarProps, DateModel, DayItem } from './types';
// constants
// composable
// props
const props = withDefaults(defineProps<CalendarProps>(), {
  firstDayOfWeek: 'sunday',
  selectionMode: 'range',
  visibleDate: () => new Date(),
  header: () => ({
    title: false,
    prev: false,
    next: false,
  }),
});
const modelValue = defineModel<DateModel>('modelValue');
// defineEmits
const emit = defineEmits<CalendarEmits>();
// states (refs and reactives)
const calendarDate = ref<Date>(props.visibleDate);
const calendarDays = ref<DayItem[]>([]);
// computed
const weekDays = computed(() => {
  const weekDays = [];
  const firstDayOfWeek = props.firstDayOfWeek === 'monday' ? 0 : 6;
  for (let i = 0; i < 7; i++) {
    const dayIndex = (firstDayOfWeek + i) % 7;
    weekDays.push(Consts.DAYS[dayIndex]);
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
    if (props.selectionMode === 'range') {
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
    year: calendarDate.value.getFullYear(),
    month: calendarDate.value.getMonth(),
    day: calendarDate.value.getDate(),
    dayText: new Intl.DateTimeFormat('tr-TR', { weekday: 'long' }).format(calendarDate.value),
    monthText: new Intl.DateTimeFormat('tr-TR', { month: 'long' }).format(calendarDate.value),
  };
});
const headerVisible = computed(() => {
  return {
    top: props.header?.title || props.header?.next || props.header?.prev,
    bottom: props.header?.view || props.header?.today,
  };
});
// watchers
watchEffect(() => {
  onUpdateCalendarDate(new Date(props.visibleDate));
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
  if (props.minDate && props.maxDate && (Utils.isBefore(day.date, props.minDate) || Utils.isAfter(day.date, props.maxDate))) return;
  const [sDate, eDate] = [...Utils.normalizeModelValue(model.value)];
  if (props.selectionMode === 'range') {
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
function onPrev() {
  calendarDate.value = Utils.previousMonth(calendarDate.value);
  emit('onPrev', calendarDate.value);
}
function onNext() {
  calendarDate.value = Utils.nextMonth(calendarDate.value);
  emit('onNext', calendarDate.value);
}
function onHourChange(direction: 'up' | 'down') {
  console.log('direction', direction);
}
function onMinuteChange(direction: 'up' | 'down') {
  console.log('direction', direction);
}
function onUpdateCalendarDate(date: Date) {
  calendarDate.value = date;
}
function updateModelValue(newDates: Array<Date | null>) {
  if (props.selectionMode === 'range') {
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
    passive: false,
    'range-start': false,
    'in-range': false,
    'range-end': false,
    'first-day-of-week': Boolean(day.isFirstDayOfWeek),
    'last-day-of-week': Boolean(day.isLastDayOfWeek),
    'out-of-month': Boolean(day.outOfMonth),
  };
  if (startDate.value && endDate.value) {
    Object.assign(classes, {
      passive: Boolean(props.selectionMode === 'range' && !classes.selected && (Utils.isBefore(day.date, startDate.value) || Utils.isAfter(day.date, endDate.value))),
      'range-start': Boolean(Utils.isSameDay(day.date, startDate.value)),
      'in-range': Boolean(Utils.isBetween(day.date, startDate.value, endDate.value)),
      'range-end': Boolean(Utils.isSameDay(day.date, endDate.value)),
    });
  }
  return classes;
}
defineExpose({ onPrev, onNext });
</script>

<style lang="scss" scoped src="./Calendar.style.scss"></style>
