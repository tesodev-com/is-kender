import { shallowMount, type VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import RangeSlider from './RangeSlider.vue';
import type { RangeSliderProps } from './types';

describe('RangeSlider.vue', () => {
  let wrapper: VueWrapper<any>;

  function createWrapper(props: Partial<Omit<RangeSliderProps, 'modelValue'>> = {}) {
    return shallowMount(RangeSlider, {
      props,
    });
  }

  beforeEach(() => {
    wrapper = createWrapper();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.range-slider-wrapper').exists()).toBe(true);
    expect(wrapper.find('.range-input').exists()).toBe(true);
  });

  it('should render with default props', () => {
    expect(wrapper.find('.range-label').text()).toBe('Value');
    expect(wrapper.find('.range-limit.min').text()).toBe('0');
    expect(wrapper.find('.range-limit.max').text()).toBe('100');
    expect(wrapper.find('.range-input').attributes('min')).toBe('0');
    expect(wrapper.find('.range-input').attributes('max')).toBe('100');
    expect(wrapper.find('.range-input').attributes('step')).toBe('1');
  });

  it('should render with custom props', () => {
    const wrapper = createWrapper({
      min: 10,
      max: 200,
      step: 5,
      unit: 'px',
      label: 'Custom Label',
      color: 'success',
    });

    expect(wrapper.find('.range-label').text()).toBe('Custom Label (px)');
    expect(wrapper.find('.range-limit.min').text()).toBe('10px');
    expect(wrapper.find('.range-limit.max').text()).toBe('200px');
    expect(wrapper.find('.range-input').attributes('min')).toBe('10');
    expect(wrapper.find('.range-input').attributes('max')).toBe('200');
    expect(wrapper.find('.range-input').attributes('step')).toBe('5');
    expect(wrapper.find('.range-slider-wrapper').classes()).toContain('range-slider-success');
  });

  it('should update modelValue when input changes', async () => {
    const wrapper = createWrapper({
      min: 0,
      max: 100,
      step: 1,
    });

    const input = wrapper.find('.range-input');
    await input.setValue(50);
    await input.trigger('input');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe(50);
  });

  it('should handle unit display correctly', async () => {
    const wrapper = createWrapper({
      min: 0,
      max: 100,
      step: 1,
      unit: 'px',
      alwaysReturnWithUnit: true,
    });

    const input = wrapper.find('.range-input');
    await input.setValue(50);
    await input.trigger('input');

    expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe('50px');
  });

  it('should display current value correctly', async () => {
    const wrapper = createWrapper({
      min: 0,
      max: 100,
      step: 1,
      unit: 'px',
    });

    const input = wrapper.find('.range-input');
    await input.setValue(50);
    await input.trigger('input');

    const currentValue = wrapper.find('.current-value');
    expect(currentValue.text()).toBe('50px');
  });

  it('should clamp values to min and max', async () => {
    const wrapper = createWrapper({
      min: 10,
      max: 100,
      step: 1,
    });

    const input = wrapper.find('.range-input');
    await input.setValue(5);
    await input.trigger('input');

    const emittedEvents = wrapper.emitted('update:modelValue');
    expect(emittedEvents).toBeTruthy();
    expect(emittedEvents![0][0]).toBe(10);

    await input.setValue(150);
    await input.trigger('input');

    const lastEmittedValue = emittedEvents![emittedEvents!.length - 1][0];
    expect(lastEmittedValue).toBe(100);
  });
});
