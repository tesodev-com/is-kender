import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Button, { type IButton } from './Button.vue';

describe('Button.vue', () => {
  function createWrapper(props: IButton = { variant: 'primary', isLoading: false }) {
    return shallowMount(Button, { props });
  }
  it('renders correctly with default props', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Button');
  });
});