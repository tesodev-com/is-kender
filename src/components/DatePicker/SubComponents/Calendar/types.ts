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
  id: 'start' | 'end';
  calendarDate: Date;
  showPrevIcon?: boolean;
  showNextIcon?: boolean;
  events: {
    onPrev: () => void;
    onNext: () => void;
    onRenderDate: (id: 'start' | 'end', date: Date) => void;
  };
  firstDayOfWeek?: 'monday' | 'sunday';
  selectionMode?: 'single' | 'multiple' | 'range';
  min?: Date | string;
  max?: Date | string;
  disabledDates?: Array<Date | string>;
}
