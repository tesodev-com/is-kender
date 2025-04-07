/**
 * Color conversion utility functions
 */
export const colorUtils = {
  /**
   * Converts HEX color code to RGB values
   * @param hex HEX color code (in #RRGGBB format)
   * @returns RGB values or null (invalid HEX code)
   */
  hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  },

  /**
   * Converts RGB values to HEX color code
   * @param r Red value (0-255)
   * @param g Green value (0-255)
   * @param b Blue value (0-255)
   * @returns HEX color code (in #RRGGBB format)
   */
  rgbToHex(r: number, g: number, b: number) {
    const toHex = (n: number) => {
      const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  },

  /**
   * Converts RGB values to HSB values
   * @param r Red value (0-255)
   * @param g Green value (0-255)
   * @param b Blue value (0-255)
   * @returns HSB values (h: 0-360, s: 0-100, b: 0-100)
   */
  rgbToHsb(r: number, g: number, b: number) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    let h = 0;
    const s = max === 0 ? 0 : d / max;
    const v = max;

    if (max !== min) {
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      b: Math.round(v * 100),
    };
  },

  /**
   * Converts HSB values to RGB values
   * @param h Hue value (0-360)
   * @param s Saturation value (0-100)
   * @param v Brightness value (0-100)
   * @returns RGB values (r: 0-255, g: 0-255, b: 0-255)
   */
  hsbToRgb(h: number, s: number, v: number) {
    h = (h % 360) / 360;
    s = Math.min(100, Math.max(0, s)) / 100;
    v = Math.min(100, Math.max(0, v)) / 100;

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    let r = 0,
      g = 0,
      b = 0;

    switch (i % 6) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  },

  /**
   * Checks if a HEX color code is valid
   * @param hex HEX color code
   * @returns true if valid, false otherwise
   */
  isValidHex(hex: string) {
    return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(hex);
  },

  /**
   * Completes an incomplete HEX color code
   * @param input HEX value entered by the user
   * @returns Completed HEX color code
   */
  completeHex(input: string): string {
    let hex = input.replace(/#/g, '').trim().toLowerCase();
    hex = hex.replace(/[^0-9a-f]/g, '');

    if (hex.length >= 6) {
      return '#' + hex.slice(0, 6);
    }

    if (hex.length >= 3) {
      const shorthand = hex.slice(0, 3);
      return (
        '#' +
        shorthand
          .split('')
          .map(c => c + c)
          .join('')
      );
    }

    return '#000000';
  },
};
