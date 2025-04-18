/**
 * Parses a value to number, removing any unit if present
 */
export const parseValue = (value: string | number | undefined | null, unit: string = '', defaultValue: number = 0): number => {
  if (value === undefined || value === null) return defaultValue;
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    return parseFloat(value.replace(unit, '')) || defaultValue;
  }
  return defaultValue;
};

/**
 * Rounds a value to the nearest step with precision handling
 */
export const roundToStep = (value: number, step: number): number => {
  const precision = step.toString().split('.')[1]?.length || 0;
  const factor = Math.pow(10, precision);
  return Math.round((value * factor) / (step * factor)) * step;
};

/**
 * Scales a value from one range to another
 */
export const scaleValue = (value: number, oldMin: number, oldMax: number, newMin: number, newMax: number, step: number): number => {
  const oldRange = oldMax - oldMin;
  const newRange = newMax - newMin;
  const scaledValue = newMin + ((value - oldMin) / oldRange) * newRange;
  return roundToStep(scaledValue, step);
};

/**
 * Clamps a value between min and max
 */
export const clampValue = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Formats a value with a unit if needed
 */
export const formatWithUnit = (value: number, unit: string): string => {
  return `${value}${unit}`;
};

/**
 * Parses range values from model value
 */
export const parseRangeValues = (value: unknown, min: number, max: number, unit: string = ''): [number, number] => {
  if (Array.isArray(value) && value.length === 2) {
    const [minVal, maxVal] = value.map(v => parseValue(v, unit, min));
    return [minVal, maxVal];
  }

  if (typeof value === 'number' || typeof value === 'string') {
    const val = parseValue(value, unit, min);
    const midPoint = (max - min) / 2;
    return [Math.max(val - midPoint / 2, min), Math.min(val + midPoint / 2, max)];
  }

  return [min, max];
};
