import { mount, type VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import Spinner from './Spinner.vue';
describe('Spinner.vue', () => {
  let wrapper: VueWrapper;
  function createWrapper(props = {}) {
    return mount(Spinner, {
      props: {
        ...props,
      },
    });
  }
  beforeEach(async () => {
    wrapper = createWrapper();
  });
  afterEach(() => {
    wrapper.unmount();
  });

  it('should render the component', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('should render the component with fluid prop', async () => {
    wrapper = createWrapper({ fluid: true });
    await wrapper.vm.$nextTick();
    const svgComp = wrapper.find('svg');
    expect(svgComp.attributes('width')).toEqual('100%');
    expect(svgComp.attributes('height')).toEqual('100%');
  });
});
