import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import FileUpload from './FileUpload.vue';
import type { CustomFile } from './types';

describe('FileUpload', () => {
  let wrapper: ReturnType<typeof mount<typeof FileUpload>>;

  beforeEach(() => {
    wrapper = mount(FileUpload);
  });

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('emits onUpload event when files are uploaded', async () => {
    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const customFile: CustomFile = {
      ...mockFile,
      id: '1',
      raw: mockFile,
      isReady: false,
      isImage: true,
      preview: 'test-preview',
      uploadedDate: Date.now(),
      readFile: vi.fn(),
    };

    await (wrapper.vm as any).onUpload([customFile]);
    expect(wrapper.emitted('onUpload')).toBeTruthy();
    expect(wrapper.emitted('onUpload')![0][0]).toEqual([customFile]);
  });

  it('removes file when onDelete is called', async () => {
    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const customFile: CustomFile = {
      ...mockFile,
      id: '1',
      raw: mockFile,
      isReady: false,
      isImage: true,
      preview: 'test-preview',
      uploadedDate: Date.now(),
      readFile: vi.fn(),
    };

    await (wrapper.vm as any).onUpload([customFile]);
    await (wrapper.vm as any).onDelete(customFile);
    expect((wrapper.vm as any).files).toHaveLength(0);
  });

  it('clears files and errors when onClear is called', async () => {
    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const customFile: CustomFile = {
      ...mockFile,
      id: '1',
      raw: mockFile,
      isReady: false,
      isImage: true,
      preview: 'test-preview',
      uploadedDate: Date.now(),
      readFile: vi.fn(),
    };

    await (wrapper.vm as any).onUpload([customFile]);
    (wrapper.vm as any).errorList = [{ message: 'Test error' }];

    await (wrapper.vm as any).onClear();
    expect((wrapper.vm as any).files).toHaveLength(0);
    expect((wrapper.vm as any).errorList).toHaveLength(0);
  });

  it('adds error to errorList when onError is called', async () => {
    const error = { message: 'Test error' };
    await (wrapper.vm as any).onError([error]);
    expect((wrapper.vm as any).errorList).toEqual([error]);
  });
});
