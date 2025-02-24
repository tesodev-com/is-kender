import { shallowMount } from '@vue/test-utils';
import Badge, { type BadgeProps } from 'library/Badge';
import { describe, expect, it } from 'vitest';

describe('Badge.vue', () => {
  function createWrapper(props: Partial<BadgeProps> = {}) {
    return shallowMount(Badge, {
      props,
      slots: {
        default: 'Test Badge',
      },
    });
  }

  it('renders correctly with default props', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.classes()).toContain('badge');
    expect(wrapper.classes()).toContain('badge-solid');
    expect(wrapper.classes()).toContain('badge-gray');
    expect(wrapper.classes()).toContain('badge-sm');
    expect(wrapper.classes()).toContain('badge-pill');
    expect(wrapper.classes()).not.toContain('badge-only-icon');
    expect(wrapper.find('.badge-dot-gray').exists()).toBe(false);
    expect(wrapper.text()).toBe('Test Badge');
  });

  it('applies correct class based on color prop', () => {
    const wrapper = createWrapper({ color: 'success' });
    expect(wrapper.classes()).toContain('badge-success');
  });

  it('applies correct class based on size prop', () => {
    const wrapper = createWrapper({ size: 'lg' });
    expect(wrapper.classes()).toContain('badge-lg');
  });

  it('applies correct class based on variant prop', () => {
    const wrapper = createWrapper({ variant: 'outline' });
    expect(wrapper.classes()).toContain('badge-outline');
  });

  it('applies pill class when pill prop is true', () => {
    const wrapper = createWrapper({ pill: true });
    expect(wrapper.classes()).toContain('badge-pill');
  });

  it('does not apply pill class when pill prop is false', () => {
    const wrapper = createWrapper({ pill: false });
    expect(wrapper.classes()).not.toContain('badge-pill');
  });

  it('applies only-icon class when onlyIcon prop is true', () => {
    const wrapper = createWrapper({ onlyIcon: true });
    expect(wrapper.classes()).toContain('badge-only-icon');
  });

  it('does not apply only-icon class when onlyIcon prop is false', () => {
    const wrapper = createWrapper({ onlyIcon: false });
    expect(wrapper.classes()).not.toContain('badge-only-icon');
  });

  it('renders dot element when dot prop is true', () => {
    const wrapper = createWrapper({ dot: true });
    expect(wrapper.find('.badge-dot-gray').exists()).toBe(true);
  });

  it('applies correct dot class based on color prop', () => {
    const wrapper = createWrapper({ dot: true, color: 'success' });
    expect(wrapper.find('.badge-dot-success').exists()).toBe(true);
  });

  it('does not render dot element when dot prop is false', () => {
    const wrapper = createWrapper({ dot: false });
    expect(wrapper.find('.badge-dot-gray').exists()).toBe(false);
  });

  it('renders slot content correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.text()).toBe('Test Badge');
  });
});
