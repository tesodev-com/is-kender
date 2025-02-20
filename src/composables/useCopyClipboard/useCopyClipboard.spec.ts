import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { useCopyClipboard } from '.';

describe('useCopyClipboard', () => {
  let clipboardMock: any;

  beforeAll(() => {
    clipboardMock = {
      writeText: vi.fn(),
    };
    vi.stubGlobal('navigator', { clipboard: clipboardMock });
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should copy text using the Clipboard API if available', async () => {
    const { copiedText, copyToClipboard } = useCopyClipboard();
    const textToCopy = 'Hello, world!';

    clipboardMock.writeText.mockResolvedValueOnce(undefined);

    await copyToClipboard(textToCopy);

    expect(copiedText.value).toBe(textToCopy);
    expect(clipboardMock.writeText).toHaveBeenCalledWith(textToCopy);
  });

  it('should handle the fallback to execCommand if Clipboard API is unavailable', async () => {
    vi.stubGlobal('navigator', { clipboard: undefined });

    const { copiedText, copyToClipboard } = useCopyClipboard();
    const textToCopy = 'Hello, world!';

    const execCommandMock = vi.fn().mockReturnValue(true);
    document.execCommand = execCommandMock;

    await copyToClipboard(textToCopy);

    expect(copiedText.value).toBe(textToCopy);
    expect(execCommandMock).toHaveBeenCalledWith('copy');
  });

  it('should clear copiedText if execCommand fails', async () => {
    vi.stubGlobal('navigator', { clipboard: undefined });

    const { copiedText, copyToClipboard } = useCopyClipboard();
    const textToCopy = 'Hello, world!';

    const execCommandMock = vi.fn().mockReturnValue(false);
    document.execCommand = execCommandMock;

    await copyToClipboard(textToCopy);

    expect(copiedText.value).toBe(null);
  });

  it('should clear copiedText if an error occurs during copy', async () => {
    const { copiedText, copyToClipboard } = useCopyClipboard();
    const textToCopy = 'Hello, world!';

    clipboardMock.writeText.mockRejectedValueOnce(new Error('Clipboard write failed'));

    await copyToClipboard(textToCopy);

    expect(copiedText.value).toBe(null);
  });

  it('should clear copiedText if an error occurs in the fallback', async () => {
    vi.stubGlobal('navigator', { clipboard: undefined });

    const { copiedText, copyToClipboard } = useCopyClipboard();
    const textToCopy = 'Hello, world!';

    const execCommandMock = vi.fn().mockImplementation(() => {
      throw new Error('execCommand failed');
    });
    document.execCommand = execCommandMock;

    await copyToClipboard(textToCopy);

    expect(copiedText.value).toBe(null);
  });
});
