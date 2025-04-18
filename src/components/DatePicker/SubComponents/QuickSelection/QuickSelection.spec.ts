import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import QuickSelection from './QuickSelection.vue';
import { QUICK_SELECTION_ITEM } from './constants';
import type { QuickSelectionProps } from './types';

// Mock the Utils class and date functions
vi.mock('../../utils', () => ({
  default: {
    getString: vi.fn(date => date.toISOString().split('.')[0] + 'Z'), // Remove milliseconds
    setTimeZero: vi.fn(date => {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      return d;
    }),
  },
}));

describe('QuickSelection', () => {
  const defaultProps: QuickSelectionProps = {
    selectionItems: ['today', 'thisWeek', 'thisMonth'],
  };

  it('renders correctly with default props', () => {
    const wrapper = mount(QuickSelection, {
      props: defaultProps,
    });

    expect(wrapper.find('.quick-selection-list').exists()).toBe(true);
    const items = wrapper.findAll('.quick-selection-list-item');
    expect(items).toHaveLength(3);
  });

  it('does not render when selectionItems is empty', () => {
    const wrapper = mount(QuickSelection, {
      props: {
        selectionItems: [],
      },
    });

    expect(wrapper.find('.quick-selection-list').exists()).toBe(false);
  });

  it('renders correct labels for selection items', () => {
    const wrapper = mount(QuickSelection, {
      props: defaultProps,
    });

    const items = wrapper.findAll('.quick-selection-list-item');
    expect(items[0].text()).toBe('Bugün');
    expect(items[1].text()).toBe('Bu hafta');
    expect(items[2].text()).toBe('Bu ay');
  });

  it('emits onSelect event with correct value when clicking today', async () => {
    const wrapper = mount(QuickSelection, {
      props: defaultProps,
    });

    const todayItem = wrapper.findAll('.quick-selection-list-item')[0];
    await todayItem.trigger('click');

    const emitted = wrapper.emitted('onSelect');
    expect(emitted).toBeDefined();
    expect(emitted![0]).toBeDefined();

    // Today's date should be emitted
    const todayFunc = QUICK_SELECTION_ITEM.find(item => item.key === 'today')!.func;
    const emittedDate = new Date(emitted![0][0] as string);
    const expectedDate = new Date(todayFunc() as string);

    // Compare only date parts (year, month, day)
    expect(emittedDate.getFullYear()).toBe(expectedDate.getFullYear());
    expect(emittedDate.getMonth()).toBe(expectedDate.getMonth());
    expect(emittedDate.getDate()).toBe(expectedDate.getDate());
  });

  it('emits onSelect event with correct value when clicking this week', async () => {
    const wrapper = mount(QuickSelection, {
      props: defaultProps,
    });

    const thisWeekItem = wrapper.findAll('.quick-selection-list-item')[1];
    await thisWeekItem.trigger('click');

    const emitted = wrapper.emitted('onSelect');
    expect(emitted).toBeDefined();
    expect(emitted![0]).toBeDefined();

    // This week's date range should be emitted
    const thisWeekFunc = QUICK_SELECTION_ITEM.find(item => item.key === 'thisWeek')!.func;
    const emittedDates = (emitted![0][0] as string[]).map(d => new Date(d));
    const expectedDates = (thisWeekFunc() as string[]).map(d => new Date(d));

    // Compare date ranges
    emittedDates.forEach((emittedDate, index) => {
      const expectedDate = expectedDates[index];
      expect(emittedDate.getFullYear()).toBe(expectedDate.getFullYear());
      expect(emittedDate.getMonth()).toBe(expectedDate.getMonth());
      expect(emittedDate.getDate()).toBe(expectedDate.getDate());
    });
  });

  it('emits onSelect event with correct value when clicking this month', async () => {
    const wrapper = mount(QuickSelection, {
      props: defaultProps,
    });

    const thisMonthItem = wrapper.findAll('.quick-selection-list-item')[2];
    await thisMonthItem.trigger('click');

    const emitted = wrapper.emitted('onSelect');
    expect(emitted).toBeDefined();
    expect(emitted![0]).toBeDefined();

    // This month's date range should be emitted
    const thisMonthFunc = QUICK_SELECTION_ITEM.find(item => item.key === 'thisMonth')!.func;
    const emittedDates = (emitted![0][0] as string[]).map(d => new Date(d));
    const expectedDates = (thisMonthFunc() as string[]).map(d => new Date(d));

    // Compare date ranges
    emittedDates.forEach((emittedDate, index) => {
      const expectedDate = expectedDates[index];
      expect(emittedDate.getFullYear()).toBe(expectedDate.getFullYear());
      expect(emittedDate.getMonth()).toBe(expectedDate.getMonth());
      expect(emittedDate.getDate()).toBe(expectedDate.getDate());
    });
  });

  it('adds active class to clicked item', async () => {
    const wrapper = mount(QuickSelection, {
      props: defaultProps,
    });

    const items = wrapper.findAll('.quick-selection-list-item');
    await items[0].trigger('click');

    expect(items[0].classes()).toContain('quick-selection-list-item-active');
    expect(items[1].classes()).not.toContain('quick-selection-list-item-active');
    expect(items[2].classes()).not.toContain('quick-selection-list-item-active');
  });

  it('clears active item when onClear is called', async () => {
    const wrapper = mount(QuickSelection, {
      props: defaultProps,
    });

    const items = wrapper.findAll('.quick-selection-list-item');
    await items[0].trigger('click');
    expect(items[0].classes()).toContain('quick-selection-list-item-active');

    await wrapper.vm.onClear();
    expect(items[0].classes()).not.toContain('quick-selection-list-item-active');
  });

  it('updates active item when clicking different items', async () => {
    const wrapper = mount(QuickSelection, {
      props: defaultProps,
    });

    const items = wrapper.findAll('.quick-selection-list-item');

    // Click first item
    await items[0].trigger('click');
    expect(items[0].classes()).toContain('quick-selection-list-item-active');
    expect(items[1].classes()).not.toContain('quick-selection-list-item-active');

    // Click second item
    await items[1].trigger('click');
    expect(items[0].classes()).not.toContain('quick-selection-list-item-active');
    expect(items[1].classes()).toContain('quick-selection-list-item-active');
  });
});
