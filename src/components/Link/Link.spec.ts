import { mount, type VueWrapper } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import Link, { type LinkProps } from 'library/Link';

describe('Link.vue', () => {
  let wrapper: VueWrapper<any>;

  const createWrapper = (props: Partial<LinkProps> = {}) => {
    return mount(Link, {
      props: {
        to: '/default',
        ...props,
      },
      slots: {
        default: 'Link Text',
      },
      global: {
        stubs: {
          'router-link': {
            template: '<a :to="to"><slot></slot></a>',
            props: ['to'],
          },
        },
      },
    });
  };

  beforeEach(() => {
    wrapper = createWrapper();
  });

  it('renders as an anchor tag by default', () => {
    const link = wrapper.find('a');
    expect(link.exists()).toBe(true);
    expect(link.attributes('href')).toBe('/default');
    expect(link.text()).toBe('Link Text');
  });

  it('renders as router-link when useRouter is true and not external', async () => {
    wrapper = createWrapper({ useRouter: true, isExternal: false });
    await wrapper.vm.$nextTick();
    const routerLink = wrapper.find('a');
    expect(routerLink.exists()).toBe(true);
    expect(routerLink.attributes('to')).toBe('/default');
    expect(routerLink.attributes('href')).toBeUndefined();
    expect(routerLink.text()).toBe('Link Text');
  });

  it('applies correct classes based on props', () => {
    wrapper = createWrapper({
      fontSize: 'lg',
      fontWeight: 'bold',
      fontColor: 'danger',
      underline: true,
    });
    const link = wrapper.find('a');
    expect(link.classes()).toContain('link');
    expect(link.classes()).toContain('link-lg');
    expect(link.classes()).toContain('link-bold');
    expect(link.classes()).toContain('color-danger');
    expect(link.classes()).toContain('link-underline');
  });

  it('sets correct attributes for external link', () => {
    wrapper = createWrapper({
      to: 'https://example.com',
      isExternal: true,
      title: 'External Link',
      rel: 'noopener',
      target: '_blank',
    });
    const link = wrapper.find('a');
    expect(link.attributes('href')).toBe('https://example.com');
    expect(link.attributes('title')).toBe('External Link');
    expect(link.attributes('rel')).toBe('noopener');
    expect(link.attributes('target')).toBe('_blank');
  });

  it('uses href for non-router external link even with useRouter true', () => {
    wrapper = createWrapper({
      to: 'https://example.com',
      useRouter: true,
      isExternal: true,
    });
    const link = wrapper.find('a');
    expect(link.attributes('href')).toBe('https://example.com');
    expect(link.attributes('to')).toBeUndefined();
  });

  it('omits target attribute when _self', () => {
    wrapper = createWrapper({
      to: '/home',
      target: '_self',
    });
    const link = wrapper.find('a');
    expect(link.attributes('target')).toBeUndefined();
    expect(link.attributes('href')).toBe('/home');
  });

  it('renders slot content', () => {
    wrapper = createWrapper();
    expect(wrapper.text()).toBe('Link Text');
  });

  it('applies default props correctly', () => {
    const link = wrapper.find('a');
    expect(link.classes()).toContain('link-sm');
    expect(link.classes()).toContain('link-normal');
    expect(link.classes()).toContain('color-primary');
    expect(link.attributes('target')).toBeUndefined();
  });
});
