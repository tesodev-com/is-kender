import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import FileUpload from './FileUpload.vue';
import type { CustomFile } from './types';

// Mock URL object
const mockRevokeObjectURL = vi.fn();
global.URL = {
  createObjectURL: vi.fn(),
  revokeObjectURL: mockRevokeObjectURL,
} as any;

describe('FileUpload', () => {
  let wrapper: ReturnType<typeof mount<typeof FileUpload>>;

  beforeEach(() => {
    wrapper = mount(FileUpload, {
      props: {
        showUploadedFiles: true,
        showErrorMessages: true,
      },
      global: {
        stubs: {
          File: true,
          Upload: {
            template: '<div></div>',
            methods: {
              clearErrorList: vi.fn(),
              onClick: vi.fn(),
            },
          },
        },
      },
    });
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
      preview: 'test-preview',
      uploadedDate: Date.now(),
      status: {
        percent: 0,
        loadedSize: 100,
        loadingState: 'uploading',
      },
    };

    await (wrapper.vm as any).handleFileUpload([customFile]);
    // Simulate upload queue completion
    (wrapper.vm as any).uploadQueue.emit();
    expect(wrapper.emitted('onUpload')).toBeTruthy();
    expect(wrapper.emitted('onUpload')![0][0]).toEqual([customFile]);
  });

  it('removes file when handleFileDelete is called', async () => {
    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const customFile: CustomFile = {
      ...mockFile,
      id: '1',
      raw: mockFile,
      preview: 'test-preview',
      uploadedDate: Date.now(),
      status: {
        percent: 0,
        loadedSize: 100,
        loadingState: 'uploading',
      },
    };

    await (wrapper.vm as any).handleFileUpload([customFile]);
    await (wrapper.vm as any).handleFileDelete(customFile);
    expect((wrapper.vm as any).files).toHaveLength(0);
  });

  it('clears files and errors when handleClear is called', async () => {
    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const customFile: CustomFile = {
      ...mockFile,
      id: '1',
      raw: mockFile,
      preview: 'test-preview',
      uploadedDate: Date.now(),
      status: {
        percent: 0,
        loadedSize: 100,
        loadingState: 'uploading',
      },
    };

    await (wrapper.vm as any).handleFileUpload([customFile]);
    (wrapper.vm as any).errorList = [{ message: 'Test error' }];

    await (wrapper.vm as any).handleClear();
    expect((wrapper.vm as any).files).toHaveLength(0);
    expect((wrapper.vm as any).errorList).toHaveLength(0);
  });

  it('adds error to errorList when handleError is called', async () => {
    const error = { message: 'Test error' };
    await (wrapper.vm as any).handleError([error]);
    expect((wrapper.vm as any).errorList).toEqual([error]);
  });
});
