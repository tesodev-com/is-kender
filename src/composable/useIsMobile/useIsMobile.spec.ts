import { describe, it, expect, vi, afterAll } from 'vitest';
import { useIsMobile } from '.';

describe('useIsMobile', () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should return true for mobile user agents', () => {
    vi.stubGlobal('navigator', {
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/14E304 Safari/602.1',
    });

    const result = useIsMobile();
    expect(result).toBe(true);
  });

  it('should return false for non-mobile user agents', () => {
    vi.stubGlobal('navigator', {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    });

    const result = useIsMobile();
    expect(result).toBe(false);
  });

  it('should return false if navigator is undefined', () => {
    vi.stubGlobal('navigator', undefined);

    const result = useIsMobile();
    expect(result).toBe(false);
  });
});
