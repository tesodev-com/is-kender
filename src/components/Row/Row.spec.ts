import { shallowMount, VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import Row from './Row.vue';

describe('Row.vue', () => {
  let wrapper: VueWrapper<any>;
  type Justify = InstanceType<typeof Row>['justify'];
  type Align = InstanceType<typeof Row>['align'];
  type Direction = InstanceType<typeof Row>['direction'];
  type Gutter = InstanceType<typeof Row>['gutter'];
  const justifies:Justify[] = ['start', 'end', 'center', 'space-around', 'space-between'];
  const aligns:Align[] = ['top', 'center', 'bottom'];
  const directions:Direction[] = ['row', 'row-reverse', 'column', 'column-reverse'];
  const gutters:(Gutter)[] = [0, 1, 2, 3, 4, 5, 6];
  function createWrapper(props = {}) {
    return shallowMount(Row, {
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
    expect(wrapper.classes()).toContain('row');
  });

  aligns.forEach((align:Align) => {
    it(`should apply correct classes for align=${align}`, () => {
      const wrapper = createWrapper({ align });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.classes()).toContain('row');
      expect(wrapper.classes()).toContain(`row--align-${align}`);
    });
  });
  justifies.forEach((justify:Justify) => {
    it(`should apply correct classes for justify=${justify}`, () => {
      const wrapper = createWrapper({ justify });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.classes()).toContain('row');
      expect(wrapper.classes()).toContain(`row--justify-${justify}`);
    });
  });
  directions.forEach((direction:Direction) => {
    it(`should apply correct classes for direction=${direction}`, () => {
      const wrapper = createWrapper({ direction });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.classes()).toContain('row');
      expect(wrapper.classes()).toContain(`row--direction-${direction}`);
    });
  });
  gutters.forEach((gutter:Gutter) => {
    it(`should apply correct classes for  gutter=${gutter}`, () => {
      const wrapper = createWrapper({ gutter });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.classes()).toContain('row');
      if (gutter === 0) {
        expect(wrapper.classes()).not.toContain(`row--gutter-${gutter}`);
        return;
      }
      expect(wrapper.classes()).toContain(`row--gutter-${gutter}`);
    });
  });

});