import { shallowMount, type VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import Button from './Button.vue';

describe('Button.vue', () => {
  let wrapper: VueWrapper<any>;
  const sizes = ['sm', 'md', 'lg', 'xl', '2xl'];
  const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'dark'];
  const variants = ['solid', 'outline', 'ghost'];

  function createWrapper(props = {}) {
    return shallowMount(Button, {
      props: {
        text: 'Click me',
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
    expect(wrapper.text()).toBe('Click me');
  });

  sizes.forEach(size => {
    colors.forEach(color => {
      variants.forEach(variant => {
        it(`should apply correct classes for size=${size}, color=${color}, variant=${variant}`, () => {
          const wrapper = createWrapper({ size, color, variant });

          expect(wrapper.exists()).toBe(true);
          expect(wrapper.classes()).toContain('button');
          expect(wrapper.classes()).toContain(`button-${variant}`);
          expect(wrapper.classes()).toContain(`button-${color}`);
          expect(wrapper.classes()).toContain(`button-${size}`);
        });
      });
    });
  });
});
