import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import DatePicker from './DatePicker.vue';
import type { DatePickerProps } from './types';

// Mock the Utils class
vi.mock('./utils', () => ({
  default: {
    addMonths: vi.fn(date => {
      const d = new Date(date);
      d.setMonth(d.getMonth() + 1);
      return d;
    }),
    formatDate: vi.fn(date => {
      const d = new Date(date);
      return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`;
    }),
    setTimeZero: vi.fn(date => {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      return d;
    }),
    isSameDay: vi.fn((date1, date2) => {
      const d1 = new Date(date1);
      const d2 = new Date(date2);
      return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
    }),
    isBefore: vi.fn((date1, date2) => {
      const d1 = new Date(date1);
      const d2 = new Date(date2);
      return d1.getTime() < d2.getTime();
    }),
    isAfter: vi.fn((date1, date2) => {
      const d1 = new Date(date1);
      const d2 = new Date(date2);
      return d1.getTime() > d2.getTime();
    }),
    isBetween: vi.fn((date, startDate, endDate) => {
      const d = new Date(date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return d.getTime() > start.getTime() && d.getTime() < end.getTime();
    }),
    getString: vi.fn(date => date.toISOString()),
    normalizeModelValue: vi.fn(value => {
      if (value === null || value === undefined) {
        return [null, null];
      }
      if (Array.isArray(value)) {
        return value;
      }
      return [value, null];
    }),
  },
}));

// Mock the sub-components
vi.mock('./SubComponents', () => ({
  Calendar: {
    name: 'Calendar',
    template: '<div class="calendar-container"><div class="calendar"></div></div>',
  },
  QuickSelection: {
    name: 'QuickSelection',
    template: '<div class="quick-selection"></div>',
    methods: {
      onClear: vi.fn(),
    },
  },
}));

describe('DatePicker', () => {
  const defaultProps: DatePickerProps = {
    selectionItems: ['today', 'thisWeek', 'thisMonth'],
    selectionMode: 'single',
    multipleMonth: false,
    actionBar: true,
    inline: false,
  };

  it('renders correctly with default props', () => {
    const wrapper = mount(DatePicker, {
      props: defaultProps,
    });

    expect(wrapper.find('.datepicker-wrapper').exists()).toBe(true);
    expect(wrapper.find('.datepicker-container').exists()).toBe(false); // Initially hidden
  });

  it('renders input when inline is false', () => {
    const wrapper = mount(DatePicker, {
      props: defaultProps,
    });

    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('does not render input when inline is true', () => {
    const wrapper = mount(DatePicker, {
      props: {
        ...defaultProps,
        inline: true,
      },
    });

    expect(wrapper.find('input').exists()).toBe(false);
    expect(wrapper.find('.datepicker-container').exists()).toBe(true); // Always visible when inline
  });

  it('shows datepicker when input is clicked', async () => {
    const wrapper = mount(DatePicker, {
      props: defaultProps,
    });

    await wrapper.find('input').trigger('click');
    expect(wrapper.find('.datepicker-container').exists()).toBe(true);
  });

  it('hides datepicker when clicking outside', async () => {
    const wrapper = mount(DatePicker, {
      props: defaultProps,
    });

    // Show datepicker
    await wrapper.find('input').trigger('click');
    expect(wrapper.find('.datepicker-container').exists()).toBe(true);

    // Simulate click outside
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(event);

    // Wait for Vue to update
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.datepicker-container').exists()).toBe(false);
  });

  it('does not hide datepicker when clicking inside', async () => {
    const wrapper = mount(DatePicker, {
      props: defaultProps,
    });

    // Show datepicker
    await wrapper.find('input').trigger('click');
    expect(wrapper.find('.datepicker-container').exists()).toBe(true);

    // Simulate click inside
    await wrapper.find('.datepicker-container').trigger('click');
    expect(wrapper.find('.datepicker-container').exists()).toBe(true);
  });

  it('renders quick selection when selectionItems is provided', async () => {
    const wrapper = mount(DatePicker, {
      props: defaultProps,
    });

    await wrapper.find('input').trigger('click');
    expect(wrapper.find('.datepicker-sidebar').exists()).toBe(true);
  });

  it('does not render quick selection when selectionItems is empty', async () => {
    const wrapper = mount(DatePicker, {
      props: {
        ...defaultProps,
        selectionItems: [],
      },
    });

    await wrapper.find('input').trigger('click');
    expect(wrapper.find('.datepicker-sidebar').exists()).toBe(false);
  });

  it('renders action bar when actionBar is true', async () => {
    const wrapper = mount(DatePicker, {
      props: defaultProps,
    });

    await wrapper.find('input').trigger('click');
    expect(wrapper.find('.datepicker-footer').exists()).toBe(true);
    expect(wrapper.find('.datepicker-actions').exists()).toBe(true);
  });

  it('does not render action bar when actionBar is false', async () => {
    const wrapper = mount(DatePicker, {
      props: {
        ...defaultProps,
        actionBar: false,
      },
    });

    await wrapper.find('input').trigger('click');
    expect(wrapper.find('.datepicker-footer').exists()).toBe(false);
  });

  it('renders single calendar when multipleMonth is false', async () => {
    const wrapper = mount(DatePicker, {
      props: defaultProps,
    });

    await wrapper.find('input').trigger('click');
    await wrapper.vm.$nextTick();
    const calendars = wrapper.findAll('.calendar-container');
    expect(calendars).toHaveLength(1);
  });

  it('renders multiple calendars when multipleMonth is true', async () => {
    const wrapper = mount(DatePicker, {
      props: {
        ...defaultProps,
        multipleMonth: true,
      },
    });

    await wrapper.find('input').trigger('click');
    await wrapper.vm.$nextTick();
    const calendars = wrapper.findAll('.calendar-container');
    expect(calendars).toHaveLength(2);
  });

  it('emits onApply event when apply button is clicked', async () => {
    const testDate = new Date('2024-04-10');
    const wrapper = mount(DatePicker, {
      props: {
        ...defaultProps,
        modelValue: testDate,
      },
    });

    await wrapper.find('input').trigger('click');
    await wrapper.find('.datepicker-actions button:last-child').trigger('click');

    const emitted = wrapper.emitted('onApply');
    expect(emitted).toBeDefined();
    expect(emitted![0][0]).toEqual(testDate);
  });

  it('clears model value when clear button is clicked', async () => {
    const testDate = new Date('2024-04-10');
    const wrapper = mount(DatePicker, {
      props: {
        ...defaultProps,
        modelValue: testDate,
      },
    });

    await wrapper.find('input').trigger('click');
    await wrapper.find('.datepicker-actions button:first-child').trigger('click');

    expect(wrapper.vm.modelValue).toBeNull();
  });

  it('formats input value correctly for single selection', async () => {
    const testDate = new Date('2024-04-10');
    const wrapper = mount(DatePicker, {
      props: {
        ...defaultProps,
        modelValue: testDate,
      },
    });

    expect(wrapper.find('input').element.value).toBe('10.04.2024');
  });

  it('formats input value correctly for range selection', async () => {
    const testDates = [new Date('2024-04-10'), new Date('2024-04-15')];
    const wrapper = mount(DatePicker, {
      props: {
        ...defaultProps,
        selectionMode: 'range',
        modelValue: testDates,
      },
    });

    expect(wrapper.find('input').element.value).toBe('10.04.2024 - 15.04.2024');
  });

  it('formats input value correctly for multiple selection', async () => {
    const testDates = [new Date('2024-04-10'), new Date('2024-04-15'), new Date('2024-04-20')];
    const wrapper = mount(DatePicker, {
      props: {
        ...defaultProps,
        selectionMode: 'multiple',
        modelValue: testDates,
      },
    });

    expect(wrapper.find('input').element.value).toBe('10.04.2024, 15.04.2024, 20.04.2024');
  });
});
