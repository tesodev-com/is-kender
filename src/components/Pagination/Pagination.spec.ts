import { mount, type VueWrapper } from '@vue/test-utils';
import Pagination from 'library-components/Pagination';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('Pagination.vue', () => {
  let wrapper: VueWrapper<any>;

  const createWrapper = (props = {}) => {
    return mount(Pagination, {
      props: {
        totalItems: 50,
        itemsPerPage: 10,
        currentPage: 1,
        ...props,
      },
      global: {
        stubs: {
          Button: {
            template: '<button :disabled="disabled" :class="{ rounded: rounded === \'full\' }" :variant="variant"><slot></slot></button>',
            props: ['color', 'size', 'variant', 'disabled', 'rounded'],
          },
          Svg: {
            template: '<span class="svg-stub"></span>',
            props: ['src', 'size'],
          },
        },
      },
    });
  };

  beforeEach(() => {
    wrapper = createWrapper();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders default variant correctly', () => {
    expect(wrapper.find('.pagination').exists()).toBe(true);
    expect(wrapper.find('.pagination-left-button').exists()).toBe(true);
    expect(wrapper.find('.pagination-numbers').exists()).toBe(true);
    expect(wrapper.find('.pagination-right-button').exists()).toBe(true);
  });

  it('renders minimal variant correctly', () => {
    wrapper = createWrapper({ variant: 'minimal' });
    expect(wrapper.find('.pagination-minimal').exists()).toBe(true);
    expect(wrapper.find('.pagination-minimal-info').text()).toBe('Page 1 of 5');
  });

  it('renders button-group variant correctly', () => {
    wrapper = createWrapper({ variant: 'button-group' });
    expect(wrapper.find('.pagination-button-group').exists()).toBe(true);
  });

  it('shows top border when showTopBorder is true', () => {
    wrapper = createWrapper({ showTopBorder: true });
    expect(wrapper.find('.pagination-top-border').exists()).toBe(true);
  });

  it('disables previous button on first page', () => {
    const prevButton = wrapper.find('.pagination-left-button button');
    expect(prevButton.attributes('disabled')).toBe('');
  });

  it('enables next button when not on last page', () => {
    const nextButton = wrapper.find('.pagination-right-button button');
    expect(nextButton.attributes('disabled')).toBeUndefined();
  });

  it('navigates to next page on next button click', async () => {
    const nextButton = wrapper.find('.pagination-right-button button');
    await nextButton.trigger('click');
    expect(wrapper.emitted('update:currentPage')?.[0]).toEqual([2]);
  });

  it('navigates to specific page on page number click', async () => {
    const pageButtons = wrapper.findAll('.pagination-numbers button');
    await pageButtons[1].trigger('click');
    expect(wrapper.emitted('update:currentPage')?.[0]).toEqual([2]);
  });

  it('calculates total pages correctly', () => {
    expect(wrapper.vm.totalPages).toBe(5);
  });

  it('displays correct page numbers when total pages <= 3', () => {
    wrapper = createWrapper({ totalItems: 30, itemsPerPage: 15 });
    const pageNumbers = wrapper.findAll('.pagination-numbers button');
    expect(pageNumbers.length).toBe(2);
    expect(pageNumbers[0].text()).toBe('1');
    expect(pageNumbers[1].text()).toBe('2');
  });

  it('shows ellipsis when total pages > 3', async () => {
    wrapper = createWrapper({ totalItems: 100, itemsPerPage: 10, currentPage: 5 });
    const paginationNumbers = wrapper.find('.pagination-numbers');
    expect(paginationNumbers.find('.ellipsis').exists()).toBe(true);
  });

  it('disables next button on last page', async () => {
    wrapper = createWrapper({ currentPage: 5 });
    const nextButton = wrapper.find('.pagination-right-button button');
    expect(nextButton.attributes('disabled')).toBe('');
  });

  it('handles zero items correctly', () => {
    wrapper = createWrapper({ totalItems: 0 });
    expect(wrapper.vm.totalPages).toBe(0);
    expect(wrapper.find('.pagination-left-button button').attributes('disabled')).toBe('');
    expect(wrapper.find('.pagination-right-button button').attributes('disabled')).toBe('');
  });

  it('applies active class to current page', () => {
    wrapper = createWrapper({ currentPage: 2 });
    const pageButtons = wrapper.findAll('.pagination-numbers button');
    expect(pageButtons[1].classes()).toContain('active-number');
  });

  it('respects roundedNumbers prop', () => {
    wrapper = createWrapper({ roundedNumbers: true });
    const pageButtons = wrapper.findAll('.pagination-numbers button');
    expect(pageButtons[0].classes()).toContain('rounded');
  });

  it('respects outlineButtons prop', () => {
    wrapper = createWrapper({ outlineButtons: true });
    const prevButton = wrapper.find('.pagination-left-button button');
    expect(prevButton.attributes('variant')).toBe('outline');
  });
});
