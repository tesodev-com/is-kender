import { EventBus } from '@/utils';
import { mount, type VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import Toast from './Toast.vue';
import ToastMessage from './ToastMessage.vue';

describe('Toast', () => {
  let wrapper: VueWrapper;
  function createWrapper() {
    return mount(Toast, {});
  }
  beforeEach(() => {
    wrapper = createWrapper();
  });
  it('should render correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('should add a toast message when event is emitted', async () => {
    EventBus.emit('toast:add', { message: 'Test Messge', color: 'success' });
    await wrapper.vm.$nextTick();
    expect(wrapper.findAllComponents(ToastMessage).length).toBe(1);
    const toastMessage = wrapper.findComponent(ToastMessage);
    expect(toastMessage.props('message')).toBe('Test Messge');
    expect(toastMessage.props('color')).toBe('success');
  });
});
