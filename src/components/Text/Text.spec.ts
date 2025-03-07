import { shallowMount } from '@vue/test-utils';
import Text, { type TextProps } from 'library/Text';
import { describe, expect, it } from 'vitest';

describe('Text.vue', () => {
  function createWrapper(props: Partial<TextProps> = {}) {
    return shallowMount(Text, {
      props,
      slots: {
        default: 'Test Text',
      },
    });
  }

  it('renders correctly with default props', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.element.tagName.toLowerCase()).toBe('p');
    expect(wrapper.classes()).toContain('text');
    expect(wrapper.classes()).toContain('text-sm');
    expect(wrapper.classes()).toContain('font-normal');
    expect(wrapper.classes()).toContain('color-black');
  });

  it('renders with different size', () => {
    const wrapper = createWrapper({ size: 'h2' });
    expect(wrapper.element.tagName.toLowerCase()).toBe('h2');
  });

  it('applies correct class based on props', () => {
    const wrapper = createWrapper({ fontSize: 'xl', fontWeight: 'semibold', fontColor: 'success' });
    expect(wrapper.classes()).toContain('text-xl');
    expect(wrapper.classes()).toContain('font-semibold');
    expect(wrapper.classes()).toContain('color-success');
  });

  it('renders slot content correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.text()).toBe('Test Text');
  });
});
