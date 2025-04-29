import { mount } from '@vue/test-utils';
import Textarea from 'library-components/Textarea';
import { describe, expect, it } from 'vitest';

describe('Textarea.vue', () => {
  it('renders error message when error is true', () => {
    const wrapper = mount(Textarea, {
      props: {
        error: true,
        errorMessage: 'Test error',
      },
    });
    expect(wrapper.find('.error-message').exists()).toBe(true);
    expect(wrapper.find('.error-message').text()).toBe('Test error');
  });

  it('shows required asterisk when required is true', () => {
    const wrapper = mount(Textarea, {
      props: {
        label: 'Test Label',
        required: true,
      },
    });
    expect(wrapper.find('.required-asterisk').exists()).toBe(true);
  });

  it('updates model value on input', async () => {
    const wrapper = mount(Textarea);
    const textarea = wrapper.find('textarea');
    await textarea.setValue('test value');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test value']);
  });

  it('shows character count when maxLength is provided', () => {
    const wrapper = mount(Textarea, {
      props: {
        maxLength: 100,
        modelValue: 'test',
      },
    });
    expect(wrapper.find('.character-count').text()).toBe('4/100');
  });
});
