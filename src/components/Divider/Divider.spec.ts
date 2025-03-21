import { shallowMount } from '@vue/test-utils';
import Divider, { type DividerProps } from 'library-components/Divider';
import { describe, expect, it } from 'vitest';

describe('Divider.vue', () => {
  function createWrapper(props: Partial<DividerProps> = {}) {
    return shallowMount(Divider, {
      props: {
        is: 'div',
        layout: 'horizontal',
        roundedFull: true,
        ...props,
      },
    });
  }

  it('renders correctly with default props', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.classes()).toContain('divider');
    expect(wrapper.classes()).toContain('horizontal');
    expect(wrapper.classes()).toContain('rounded');
  });

  it('applies vertical class when layout is vertical', () => {
    const wrapper = createWrapper({ layout: 'vertical' });
    expect(wrapper.classes()).toContain('divider');
    expect(wrapper.classes()).toContain('vertical');
    expect(wrapper.classes()).not.toContain('horizontal');
  });

  it('applies custom class when provided', () => {
    const wrapper = createWrapper({ customClass: 'my-custom-class' });
    expect(wrapper.classes()).toContain('divider');
    expect(wrapper.classes()).toContain('horizontal');
    expect(wrapper.classes()).toContain('my-custom-class');
  });

  it('applies rounded class when roundedFull is true', () => {
    const wrapper = createWrapper({ roundedFull: true });
    expect(wrapper.classes()).toContain('rounded');
  });

  it('does not apply rounded class when roundedFull is false', () => {
    const wrapper = createWrapper({ roundedFull: false });
    expect(wrapper.classes()).not.toContain('rounded');
  });
});
