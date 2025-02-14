import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Text, { type IHeading } from './Text.vue';

describe('Text.vue', () => {
  function createWrapper(props: Partial<IHeading> = {}) {
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
    expect(wrapper.element.tagName.toLowerCase()).toBe('h1');
    expect(wrapper.classes()).toContain('heading');
    expect(wrapper.classes()).toContain('heading-lg-bold-black');
  });

  it('renders with different size', () => {
    const wrapper = createWrapper({ size: 'h2' });
    expect(wrapper.element.tagName.toLowerCase()).toBe('h2');
  });

  it('applies correct class based on props', () => {
    const wrapper = createWrapper({ fontSize: 'xl', fontWeight: 'semibold', fontColor: 'success' });
    expect(wrapper.classes()).toContain('heading-xl-semibold-success');
  });

  it('renders slot content correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.text()).toBe('Test Text');
  });
});
