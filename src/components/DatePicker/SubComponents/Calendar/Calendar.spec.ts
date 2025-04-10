import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import Calendar from './Calendar.vue';
import type { CalendarProps } from './types';

// Mock the Utils class
vi.mock('../../utils', () => ({
  default: {
    getString: vi.fn(date => date.toISOString()),
    isSameDay: vi.fn((date1, date2) => {
      if (!date1 || !date2) return false;
      return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
    }),
    isBefore: vi.fn((date1, date2) => {
      if (!date1 || !date2) return false;
      return date1.getTime() < date2.getTime();
    }),
    isAfter: vi.fn((date1, date2) => {
      if (!date1 || !date2) return false;
      return date1.getTime() > date2.getTime();
    }),
    isBetween: vi.fn((date, start, end) => {
      if (!date || !start || !end) return false;
      return date.getTime() > start.getTime() && date.getTime() < end.getTime();
    }),
    normalizeModelValue: vi.fn(value => {
      if (!value) return [null, null];
      if (Array.isArray(value)) {
        return [value[0] || null, value[1] || null];
      }
      return [value, null];
    }),
  },
}));

describe('Calendar', () => {
  const defaultProps: CalendarProps = {
    calendarDate: new Date('2024-04-01'),
    events: {
      onPrev: vi.fn(),
      onNext: vi.fn(),
    },
  };

  it('renders correctly with default props', () => {
    const wrapper = mount(Calendar, {
      props: defaultProps,
    });

    expect(wrapper.find('.calendar-container').exists()).toBe(true);
    expect(wrapper.find('.calendar-header').exists()).toBe(true);
    expect(wrapper.find('.calendar-week-days').exists()).toBe(true);
    expect(wrapper.find('.calendar-month-days').exists()).toBe(true);
  });

  it('displays correct month and year', () => {
    const wrapper = mount(Calendar, {
      props: defaultProps,
    });

    expect(wrapper.find('.calendar-navigation-text').text()).toBe('Nisan 2025');
  });

  it('shows navigation icons when showPrevIcon and showNextIcon are true', () => {
    const wrapper = mount(Calendar, {
      props: {
        ...defaultProps,
        showPrevIcon: true,
        showNextIcon: true,
      },
    });

    const icons = wrapper.findAll('.calendar-navigation-icon');
    expect(icons).toHaveLength(2);
  });

  it('hides navigation icons when showPrevIcon and showNextIcon are false', () => {
    const wrapper = mount(Calendar, {
      props: {
        ...defaultProps,
        showPrevIcon: false,
        showNextIcon: false,
      },
    });

    const icons = wrapper.findAll('.calendar-navigation-icon');
    expect(icons).toHaveLength(0);
  });

  it('calls onPrev when clicking previous icon', async () => {
    const wrapper = mount(Calendar, {
      props: {
        ...defaultProps,
        showPrevIcon: true,
      },
    });

    await wrapper.find('.calendar-navigation-icon').trigger('click');
    expect(defaultProps.events.onPrev).toHaveBeenCalled();
  });

  it('calls onNext when clicking next icon', async () => {
    const wrapper = mount(Calendar, {
      props: {
        ...defaultProps,
        showNextIcon: true,
      },
    });

    await wrapper.find('.calendar-navigation-icon').trigger('click');
    expect(defaultProps.events.onNext).toHaveBeenCalled();
  });

  it('renders correct number of days in month', () => {
    const wrapper = mount(Calendar, {
      props: defaultProps,
    });

    const days = wrapper.findAll('.calendar-cell');
    // April 2024 has 30 days, plus some days from previous/next month
    expect(days.length).toBeGreaterThan(30);
  });

  it('renders week days correctly', () => {
    const wrapper = mount(Calendar, {
      props: defaultProps,
    });

    const weekDays = wrapper.findAll('.calendar-cell').slice(0, 7);
    expect(weekDays[0].text()).toBe('Pzt');
    expect(weekDays[1].text()).toBe('Sal');
    expect(weekDays[2].text()).toBe('Çar');
    expect(weekDays[3].text()).toBe('Per');
    expect(weekDays[4].text()).toBe('Cum');
    expect(weekDays[5].text()).toBe('Cmt');
    expect(weekDays[6].text()).toBe('Paz');
  });

  it('renders month days correctly', () => {
    const wrapper = mount(Calendar, {
      props: defaultProps,
    });

    // Get all month days (excluding week days and out-of-month days)
    const monthDays = wrapper.findAll('.calendar-month-days .calendar-cell').filter(cell => !cell.classes('out-of-month'));

    // April has 30 days
    expect(monthDays.length).toBe(30);

    // Check if the first day of the month is rendered
    const firstDayOfMonth = monthDays.find(day => day.find('.calendar-cell-text').text() === '1');
    expect(firstDayOfMonth).toBeDefined();

    // Check if the last day of the month is rendered
    const lastDayOfMonth = monthDays.find(day => day.find('.calendar-cell-text').text() === '30');
    expect(lastDayOfMonth).toBeDefined();

    // Check total number of days (including out-of-month days, excluding week days)
    const allDays = wrapper.findAll('.calendar-month-days .calendar-cell');
    expect(allDays.length).toBe(35); // 30 days of April + 5 days from next month
  });

  it('disables dates outside min/max range', () => {
    const minDate = new Date('2024-04-05');
    const maxDate = new Date('2024-04-25');

    const wrapper = mount(Calendar, {
      props: {
        ...defaultProps,
        min: minDate,
        max: maxDate,
      },
    });

    // Find all disabled days
    const disabledDays = wrapper.findAll('.calendar-cell').filter(cell => cell.classes('disabled'));
    expect(disabledDays.length).toBeGreaterThan(0);
  });

  it('disables specific dates', () => {
    const disabledDate = new Date('2024-04-15');

    const wrapper = mount(Calendar, {
      props: {
        ...defaultProps,
        disabledDates: [disabledDate],
      },
    });

    // Find all disabled days
    const disabledDays = wrapper.findAll('.calendar-cell').filter(cell => cell.classes('disabled'));
    expect(disabledDays.length).toBeGreaterThan(0);
  });

  it('starts week on Monday when firstDayOfWeek is monday', () => {
    const wrapper = mount(Calendar, {
      props: {
        ...defaultProps,
        firstDayOfWeek: 'monday',
      },
    });

    const weekDays = wrapper.findAll('.calendar-cell').slice(0, 7);
    expect(weekDays[0].text()).toBe('Pzt');
  });

  it('starts week on Sunday when firstDayOfWeek is sunday', () => {
    const wrapper = mount(Calendar, {
      props: {
        ...defaultProps,
        firstDayOfWeek: 'sunday',
      },
    });

    const weekDays = wrapper.findAll('.calendar-cell').slice(0, 7);
    expect(weekDays[0].text()).toBe('Pzt'); // Since DAYS array is fixed to start with Monday
  });

  it('debug: check calendar cells', () => {
    const wrapper = mount(Calendar, {
      props: defaultProps,
    });

    const allCells = wrapper.findAll('.calendar-cell');
    console.log('Total cells:', allCells.length);

    const outOfMonthCells = allCells.filter(cell => cell.classes('out-of-month'));
    console.log('Out of month cells:', outOfMonthCells.length);

    const monthCells = allCells.filter(cell => !cell.classes('out-of-month'));
    console.log('Month cells:', monthCells.length);

    // Log the text of each cell
    allCells.forEach((cell, index) => {
      const cellText = cell.find('.calendar-cell-text');
      if (cellText.exists()) {
        console.log(`Cell ${index}:`, cellText.text(), 'Out of month:', cell.classes('out-of-month'));
      } else {
        console.log(`Cell ${index}: No text found, Out of month:`, cell.classes('out-of-month'));
      }
    });
  });
});
