export type DateModel = Date | string | Array<Date | string | null> | null;

export interface Day {
  date: Date;
  text: string;
  isDisabled?: boolean;
  isToday?: boolean;
  beginOfWeek?: boolean;
  endOfWeek?: boolean;
  outOfMonth?: boolean;
}

export interface CalendarProps {
  calendarDate: Date;
  firstDayOfWeek?: 'monday' | 'sunday';
  selectionMode?: 'single' | 'multiple' | 'range';
  showPrevIcon?: boolean;
  showNextIcon?: boolean;
}

export interface CalendarEmits {
  (event: 'onPrev'): void;
  (event: 'onNext'): void;
  (event: 'onSelect', date: Date): void;
}
