import { shallowMount, VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import Container from './Container.vue';

describe('Container.vue', () => {
  let wrapper: VueWrapper<any>;
  type Tag = InstanceType<typeof Container>['tag'];
  const tags:Tag[] = ['div', 'section', 'main', 'article'];
  function createWrapper(props = {}) {
    return shallowMount(Container, {
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
    expect(wrapper.classes()).toContain('container');
  });

  tags.forEach((tag:Tag) => {
    it(`should apply correct classes for tag=${tag}`, () => {
      const wrapper = createWrapper({ tag });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.classes()).toContain('container');
      expect(wrapper.classes()).toContain(`container--${tag}`);
    });
  });
  it('should apply correct classes for fluid', () => {
    const wrapper = createWrapper({ fluid: true });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.classes()).toContain('container');
    expect(wrapper.classes()).toContain('container--fluid');
    expect(wrapper.attributes('style')).toBe('max-width: none; padding: 0px 1rem;');
  });
  it('should apply max-width style', () => {
    const wrapper = createWrapper({ maxWidth: '100px' });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.classes()).toContain('container');
    expect(wrapper.attributes('style')).toBe('max-width: 100px; padding: 0px 1rem;');
  });
  it('should not apply max-width style when fluid is true', () => {
    const wrapper = createWrapper({ maxWidth: '100px', fluid: true });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.classes()).toContain('container');
    expect(wrapper.classes()).toContain('container--fluid');
    expect(wrapper.attributes('style')).toBe('max-width: none; padding: 0px 1rem;');
  });
  it('should apply correct padding value', () => {
    const wrapper = createWrapper({ padding: '10px' });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.classes()).toContain('container');
    expect(wrapper.attributes('style')).toBe('max-width: 75rem; padding: 0px 10px;');
  });

});