import { shallowMount, VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import Col from './Col.vue';

describe('Col.vue', () => {
  let wrapper:VueWrapper<any>;
  type PropType = keyof InstanceType<typeof Col>;
  const propsList: PropType[] = ['cols', 'sm', 'md', 'lg', 'xl', 'xxl'];
  function createWrapper(props = {}) {
    return shallowMount(Col, {
      props: {
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
    expect(wrapper.classes()).toContain('col');
  });
  propsList.forEach((prop:PropType) => {
    it(`should apply correct ${prop} `, () => {
      const wrapper = createWrapper({ [prop]: 12 });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.classes()).toContain('col');
      expect(wrapper.classes()).toContain(`col--${prop}-12`);
    });
  }
  );
});

