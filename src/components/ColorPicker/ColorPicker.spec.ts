import { shallowMount, type VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ColorPicker from './ColorPicker.vue';
import type { ColorPickerProps } from './types';

describe('ColorPicker.vue', () => {
  let wrapper: VueWrapper<any>;

  function createWrapper(props: Partial<Omit<ColorPickerProps, 'modelValue'>> = {}) {
    return shallowMount(ColorPicker, {
      props,
      global: {
        stubs: {
          Button: {
            template: '<button :class="$attrs.class"><slot /></button>',
          },
          Text: {
            template: '<span :class="$attrs.class"><slot /></span>',
          },
          Svg: true,
          Teleport: {
            template: '<div><slot /></div>',
          },
        },
      },
    });
  }

  beforeEach(() => {
    global.window.EyeDropper = vi.fn().mockImplementation(() => ({
      open: vi.fn().mockResolvedValue({ sRGBHex: '#FF0000' }),
    }));
    wrapper = createWrapper();
  });
  afterEach(() => {
    wrapper.unmount();
  });

  it('should render correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.color-picker-container').exists()).toBe(true);
    expect(wrapper.find('button.color-select-button').exists()).toBe(true);
  });

  it('should render with default texts', async () => {
    await wrapper.find('button.color-select-button').trigger('click');

    const buttonText = wrapper.find('button.color-select-button').text();
    expect(buttonText).toContain('Renk Seç');

    const popup = wrapper.find('.color-picker-popup');
    expect(popup.find('h3').text()).toBe('Renk Seçici');
    expect(popup.find('.suggested-colors-title').text()).toBe('Önerilen Renkler');
  });

  it('should render with custom texts', async () => {
    const wrapper = createWrapper({
      texts: {
        selectColor: 'Custom Select',
        colorPicker: 'Custom Picker',
        suggestedColors: 'Custom Colors',
      },
    });

    await wrapper.find('button.color-select-button').trigger('click');

    const buttonText = wrapper.find('button.color-select-button').text();
    expect(buttonText).toContain('Custom Select');

    const popup = wrapper.find('.color-picker-popup');
    expect(popup.find('h3').text()).toBe('Custom Picker');
    expect(popup.find('.suggested-colors-title').text()).toBe('Custom Colors');
  });

  it('should render with default suggested colors', async () => {
    await wrapper.find('button.color-select-button').trigger('click');

    const colorItems = wrapper.findAll('.color-item');
    expect(colorItems.length).toBe(9);
  });

  it('should render with custom suggested colors', async () => {
    const customColors = ['#FF0000', '#00FF00', '#0000FF'];
    const wrapper = createWrapper({
      suggestedColors: customColors,
    });

    await wrapper.find('button.color-select-button').trigger('click');

    const colorItems = wrapper.findAll('.color-item');
    expect(colorItems.length).toBe(customColors.length + 1);
  });

  it('should render with default color formats', async () => {
    await wrapper.find('button.color-select-button').trigger('click');

    const formatButtons = wrapper.findAll('.format-selector button');
    expect(formatButtons.length).toBe(3);
    expect(formatButtons[0].text()).toBe('HEX');
    expect(formatButtons[1].text()).toBe('RGB');
    expect(formatButtons[2].text()).toBe('HSB');
  });

  it('should render with custom color formats', async () => {
    const wrapper = createWrapper({
      colorFormats: ['hex', 'rgb'],
    });

    await wrapper.find('button.color-select-button').trigger('click');

    const formatButtons = wrapper.findAll('.format-selector button');
    expect(formatButtons.length).toBe(2);
    expect(formatButtons[0].text()).toBe('HEX');
    expect(formatButtons[1].text()).toBe('RGB');
  });

  it('should open and close color picker popup', async () => {
    const colorSelectButton = wrapper.find('button.color-select-button');
    expect(colorSelectButton.exists()).toBe(true);

    expect(wrapper.find('.color-picker-popup').exists()).toBe(false);

    await colorSelectButton.trigger('click');
    expect(wrapper.find('.color-picker-popup').exists()).toBe(true);

    const closeButton = wrapper.find('.close-button');
    expect(closeButton.exists()).toBe(true);
    await closeButton.trigger('click');
    expect(wrapper.find('.color-picker-popup').exists()).toBe(false);
  });

  it('should emit update:modelValue when a color is selected', async () => {
    const colorSelectButton = wrapper.find('button.color-select-button');
    expect(colorSelectButton.exists()).toBe(true);
    await colorSelectButton.trigger('click');

    const colorItem = wrapper.find('.color-item');
    expect(colorItem.exists()).toBe(true);
    await colorItem.trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
  });

  it('should handle draggable mode', async () => {
    const wrapper = createWrapper({
      isDraggable: true,
    });

    const colorSelectButton = wrapper.find('button.color-select-button');
    expect(colorSelectButton.exists()).toBe(true);
    await colorSelectButton.trigger('click');

    const popup = wrapper.find('.color-picker-popup');
    expect(popup.exists()).toBe(true);
    expect(popup.classes()).toContain('draggable');
  });

  it('should show eye dropper button when supported', async () => {
    const colorSelectButton = wrapper.find('button.color-select-button');
    expect(colorSelectButton.exists()).toBe(true);
    await colorSelectButton.trigger('click');

    const eyeDropperButton = wrapper.find('.eye-dropper-button');
    expect(eyeDropperButton.exists()).toBe(true);
  });

  it('should handle transparent color selection', async () => {
    const colorSelectButton = wrapper.find('button.color-select-button');
    expect(colorSelectButton.exists()).toBe(true);
    await colorSelectButton.trigger('click');

    const transparentButton = wrapper.find('.color-item.transparent');
    expect(transparentButton.exists()).toBe(true);
    await transparentButton.trigger('click');

    const emittedValue = wrapper.emitted('update:modelValue')?.[0][0];
    expect(emittedValue).toBe('rgba(0, 0, 0, 0)');
  });
});
