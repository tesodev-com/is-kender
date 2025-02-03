import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Button from './src/Button.vue';
describe('Button', () => {
  it('renders with default props', () => {
    const wrapper = mount(Button);
    expect(wrapper.text()).toBe('Button');
    expect(wrapper.attributes().class).toBe('button medium primary');
    expect(wrapper.attributes().disabled).toBe(undefined);
  });
  it('emits onClick event when clicked', () => {
    const wrapper = mount(Button, {
      propsData: {
        size: 'medium',
        shadow: false,
        rounded: false,
        type: 'primary',
        disabled: false,
        isLoading: false,
      },
    });
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted().onClick).toBeTruthy();
  });
  it('has correct class when shadow prop is true', () => {
    const wrapper = mount(Button, {
      propsData: {
        shadow: true,
      },
    });
    expect(wrapper.classes()).toContain('shadowed');
  });
  it('has correct class when rounded prop is true', () => {
    const wrapper = mount(Button, {
      propsData: {
        rounded: true,
      },
    });
    expect(wrapper.classes()).toContain('rounded');
  });
  it('displays spinner when isLoading prop is true', () => {
    const wrapper = mount(Button, {
      propsData: {
        size: 'medium',
        shadow: false,
        rounded: false,
        type: 'primary',
        disabled: false,
        isLoading: true,
      },
    });
    expect(wrapper.find('.spinner').isVisible()).toBe(true);
  });
});
