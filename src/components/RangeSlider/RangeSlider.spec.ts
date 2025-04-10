import { shallowMount, type VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import RangeSlider from './RangeSlider.vue';
import type { RangeSliderProps } from './types';

describe('RangeSlider.vue', () => {
  let wrapper: VueWrapper<any>;

  function createWrapper(props: Partial<RangeSliderProps> = {}) {
    return shallowMount(RangeSlider, {
      props: {
        modelValue: props.isRange ? [0, 100] : 0,
        ...props,
      },
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

  describe('Range Mode', () => {
    it('should render two inputs in range mode', () => {
      const wrapper = createWrapper({
        isRange: true,
        modelValue: [20, 80],
      });

      expect(wrapper.findAll('.range-input')).toHaveLength(2);
      expect(wrapper.find('.range-input-min').exists()).toBe(true);
      expect(wrapper.find('.range-input-max').exists()).toBe(true);
    });

    it('should add is-range class when in range mode', () => {
      const wrapper = createWrapper({
        isRange: true,
        modelValue: [20, 80],
      });

      expect(wrapper.classes()).toContain('is-range');
    });

    it('should update modelValue correctly when min input changes', async () => {
      const wrapper = createWrapper({
        isRange: true,
        modelValue: [20, 80],
      });

      const minInput = wrapper.find('.range-input-min');
      await minInput.setValue(30);
      await minInput.trigger('input');

      expect(wrapper.emitted('update:modelValue')?.[0][0]).toEqual([30, 80]);
    });

    it('should update modelValue correctly when max input changes', async () => {
      const wrapper = createWrapper({
        isRange: true,
        modelValue: [20, 80],
      });

      const maxInput = wrapper.find('.range-input-max');
      await maxInput.setValue(70);
      await maxInput.trigger('input');

      expect(wrapper.emitted('update:modelValue')?.[0][0]).toEqual([20, 70]);
    });

    it('should prevent min value from exceeding max value', async () => {
      const wrapper = createWrapper({
        isRange: true,
        modelValue: [20, 80],
      });

      const minInput = wrapper.find('.range-input-min');
      await minInput.setValue(90);
      await minInput.trigger('input');

      expect(wrapper.emitted('update:modelValue')?.[0][0]).toEqual([80, 80]);
    });

    it('should prevent max value from going below min value', async () => {
      const wrapper = createWrapper({
        isRange: true,
        modelValue: [20, 80],
      });

      const maxInput = wrapper.find('.range-input-max');
      await maxInput.setValue(10);
      await maxInput.trigger('input');

      expect(wrapper.emitted('update:modelValue')?.[0][0]).toEqual([20, 20]);
    });

    it('should display both values with units in range mode', async () => {
      const wrapper = createWrapper({
        isRange: true,
        modelValue: [20, 80],
        unit: 'px',
      });

      const currentValues = wrapper.findAll('.current-value');
      expect(currentValues).toHaveLength(2);
      expect(currentValues[0].text()).toBe('20px');
      expect(currentValues[1].text()).toBe('80px');
    });

    it('should handle range mode with custom min/max values', async () => {
      const wrapper = createWrapper({
        isRange: true,
        modelValue: [100, 500],
        min: 0,
        max: 1000,
        step: 100,
      });

      expect(wrapper.find('.range-input-min').attributes('min')).toBe('0');
      expect(wrapper.find('.range-input-min').attributes('max')).toBe('1000');
      expect(wrapper.find('.range-input-min').attributes('step')).toBe('100');
      expect(wrapper.find('.range-input-max').attributes('min')).toBe('0');
      expect(wrapper.find('.range-input-max').attributes('max')).toBe('1000');
      expect(wrapper.find('.range-input-max').attributes('step')).toBe('100');
    });
  });
});
