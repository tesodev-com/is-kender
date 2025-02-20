import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Skeleton from './Skeleton.vue';

describe('Skeleton', () => {
  function createWrapper(props = {}) {
    return shallowMount(Skeleton, { props });
  }
  it('should render correctly with default props', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.classes()).toContain('skeleton');
    expect(wrapper.classes()).toContain('skeleton-pulse');
  });

  it('should apply correct shape class', () => {
    const wrapper = createWrapper({ shape: 'circle' });
    expect(wrapper.classes()).toContain('skeleton-circle');
  });

  it('should apply correct animation class', () => {
    const wrapper = createWrapper({ animation: 'wave' });
    expect(wrapper.classes()).toContain('skeleton-wave');
  });

  it('should apply custom width, height and borderRadius styles', () => {
    const wrapper = createWrapper({ width: '50px', height: '20px', borderRadius: '5px' });
    expect(wrapper.attributes('style')).toContain('width: 50px');
    expect(wrapper.attributes('style')).toContain('height: 20px');
    expect(wrapper.attributes('style')).toContain('border-radius: 5px');
  });
});
