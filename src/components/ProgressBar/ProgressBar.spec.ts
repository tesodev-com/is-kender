import { shallowMount } from '@vue/test-utils';
import ProgressBar, { type ProgressBarProps } from 'library-components/ProgressBar';
import { describe, expect, it } from 'vitest';

describe('ProgressBar.vue', () => {
  function createWrapper(props: Partial<ProgressBarProps> = {}) {
    return shallowMount(ProgressBar, {
      props: {
        value: 0,
        ...props,
      },
    });
  }
  it('renders correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.classes()).toContain('progress-bar-container');
  });

  it('applies correct class when showPercentage is true', () => {
    const wrapper = createWrapper({ showPercentage: true, percentageLocation: 'bottom' });
    expect(wrapper.classes()).toContain('progress-bar-bottom');
  });

  it('applies correct class when showTooltip is true', () => {
    const wrapper = createWrapper({ showTooltip: true, tooltipLocation: 'bottom' });
    expect(wrapper.classes()).toContain('progress-bar-tooltip-bottom');
  });

  it('applies correct class when hoverTooltip is true', () => {
    const wrapper = createWrapper({ hoverTooltip: true });
    expect(wrapper.classes()).toContain('progress-bar-tooltip-hover');
  });

  it('computes correct progress bar width', () => {
    const wrapper = createWrapper({ value: 50, maxValue: 100 });
    const progressBar = wrapper.find('.progress-bar');
    expect(progressBar.attributes('style')).toContain('width: 50%');
  });

  it('renders tooltip when showTooltip is true', () => {
    const wrapper = createWrapper({ showTooltip: true, value: 30 });
    const tooltip = wrapper.find('.progress-bar-tooltip');
    expect(tooltip.exists()).toBe(true);
    expect(tooltip.text()).toBe('30%');
  });

  it('renders percentage when showPercentage is true', () => {
    const wrapper = createWrapper({ showPercentage: true, value: 75 });
    const percentageText = wrapper.find('.progress-bar-percentage');
    expect(percentageText.exists()).toBe(true);
    expect(percentageText.text()).toBe('75%');
  });

  it('hides tooltip when showTooltip is false', () => {
    const wrapper = createWrapper({ showTooltip: false });
    const tooltip = wrapper.find('.progress-bar-tooltip');
    expect(tooltip.exists()).toBe(false);
  });

  it('hides percentage when showPercentage is false', () => {
    const wrapper = createWrapper({ showPercentage: false });
    const percentageText = wrapper.find('.progress-bar-percentage');
    expect(percentageText.exists()).toBe(false);
  });
});
