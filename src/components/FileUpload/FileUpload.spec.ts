import { mount, VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import FileUpload from './FileUpload.vue';

describe('FileUpload.vue', () => {
  let wrapper: VueWrapper;
  function createWrapper(props = {}) {
    return mount(FileUpload, {
      props
    });
  }
  beforeEach(async () => {
    wrapper = createWrapper();
    await wrapper.vm.$nextTick();
  });
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
