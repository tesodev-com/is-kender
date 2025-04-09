<template>
  <div class="datepicker-panel">
    <div
      v-if="fastActions.length"
      class="datepicker-aside"
    >
      <div class="datepicker-aside-actions">
        <span
          v-for="(action, index) in fastActions"
          :key="index"
          class="action-item"
          :class="{
            'action-item-active': activeFastAction === action.type,
          }"
          @click="fastAction(action)"
        >
          {{ action.label }}
        </span>
      </div>
    </div>
    <div class="datepicker-body">
      <div class="datepicker-calendars">
        <Calendar
          v-for="calendar in calendars"
          :key="calendar.id"
          v-model="model"
          v-bind="calendar"
          v-on="calendar.events"
        />
      </div>
      <div
        v-if="props.showActionBar"
        class="datepicker-actions"
      >
        <Button
          color="secondary"
          variant="outline"
          size="sm"
          class="today-button"
          @click="onGo(new Date())"
        >
          Bugün
        </Button>
        <Button
          color="secondary"
          variant="outline"
          class="clear-button"
          size="sm"
          @click="onClear"
        >
          Temizle
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'library-components/Button';
import { computed, ref } from 'vue';
import Calendar, { type CalendarProps, type DateModel } from './Calendar';
import Consts from './constants';
import type { DatePickerEmits, DatePickerProps, FastAction } from './types';
import Utils from './utils';
const modelValue = defineModel<DateModel>();
const emit = defineEmits<DatePickerEmits>();
const props = withDefaults(defineProps<DatePickerProps>(), {
  firstDayOfWeek: 'monday',
});
const activeDate = ref(new Date());
const activeFastAction = ref<(typeof Consts.ACTIONS)[number]['type'] | null>(null);
const calendars = computed(() => {
  const commonProps: { [key: string]: any } & Partial<CalendarProps> = {
    firstDayOfWeek: props.firstDayOfWeek,
    selectionMode: props.selectionMode,
    minDate: props.minDate,
    maxDate: props.maxDate,
    showTime: props.showTime,
    events: {
      onPrev: onPrev,
      onNext: onNext,
    },
  };
  const calendars = [
    {
      id: 'start',
      visibleDate: new Date(activeDate.value.getFullYear(), activeDate.value.getMonth()),
      header: {
        title: true,
        prev: true,
        next: props.multipleMonths ? false : true,
      },
      ...commonProps,
    },
  ] as ({ [key: string]: any } & CalendarProps)[];

  if (props.multipleMonths) {
    calendars.push({
      id: 'end',
      visibleDate: new Date(activeDate.value.getFullYear(), activeDate.value.getMonth() + 1),
      header: {
        title: true,
        prev: props.multipleMonths ? false : true,
        next: true,
      },
      ...commonProps,
    });
  }

  return calendars;
});
const model = computed({
  get() {
    return Utils.normalizeModelValue(modelValue.value);
  },
  set(val: typeof modelValue.value) {
    if (Array.isArray(val)) {
      const start = val[0] ? new Date(val[0]) : null;
      const end = val[1] ? new Date(val[1]) : null;
      if (start && end) {
        activeDate.value = new Date(end.getFullYear(), end.getMonth());
      }
    }
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
const fastActions = computed(() => {
  if (Array.isArray(props.fastActions) && props.fastActions.length) {
    return Consts.ACTIONS.filter(action => props.fastActions?.includes(action.type));
  } else {
    return [];
  }
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
  } else if (diff.months >= 1 && props.multipleMonths) {
    activeDate.value = new Date(date.getFullYear(), date.getMonth() - 1);
  } else {
    activeDate.value = new Date(date.getFullYear(), date.getMonth());
  }
}
function onGo(date: Date) {
  activeDate.value = new Date(date.getFullYear(), date.getMonth());
}
function onClear() {
  model.value = null;
  activeFastAction.value = null;
}
function fastAction(action: FastAction) {
  const act = Consts.ACTIONS.find(a => a.type === action.type);
  if (!act) return;
  model.value = act.fnc();
  activeFastAction.value = action.type;
}
defineExpose({
  prev: onPrev,
  next: onNext,
  go: onGo,
});
</script>

<style lang="scss" scoped src="./DatePicker.style.scss"></style>
