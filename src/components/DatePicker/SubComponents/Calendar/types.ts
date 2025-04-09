export type DateModel = Date | Array<Date | null> | null;

export interface Day {
  date: Date;
  text: string;
  isActive?: boolean;
  isDisabled?: boolean;
  isToday?: boolean;
  beginOfWeek?: boolean;
  endOfWeek?: boolean;
  outOfMonth?: boolean;
}

export interface CalendarProps {
  calendarDate: Date;
  firstDayOfWeek?: 'monday' | 'sunday';
  showPrevIcon?: boolean;
  showNextIcon?: boolean;
}

export interface CalendarEmits {
  (event: 'onPrev', date: Date): void;
  (event: 'onNext', date: Date): void;
}
