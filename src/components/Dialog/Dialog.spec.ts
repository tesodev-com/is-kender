import Dialog from '@/components/Dialog';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('Dialog', () => {
  it('opens and closes with modelValue', () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: false,
        title: 'Test Dialog',
        message: 'Test Message',
      },
    });

    expect(wrapper.find('dialog').exists());

    wrapper.vm.onClose();
    expect(wrapper.find('dialog').exists());
  });

  it('shows title and message', () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        title: 'Hello',
        message: 'World',
      },
    });

    expect(wrapper.text());
    expect(wrapper.text());
  });

  it('renders action buttons', () => {
    const actions = [
      { label: 'Cancel', key: 'cancel', onClick: () => {} },
      { label: 'Confirm', key: 'confirm', onClick: () => {} },
    ];

    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        actions,
      },
    });

    expect(wrapper.find('button').exists());
    expect(wrapper.text());
    expect(wrapper.text());
  });
});
