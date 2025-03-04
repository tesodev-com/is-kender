import type { ValidationRule } from './types';

// If validate method returns true, it means is valid.
// If validate method returns false, it means is not valid.
const Validators = {
  required(errorMessage: string = 'Bu alan zorunludur.'): ValidationRule<any> {
    return {
      errorMessage,
      validate(value: any) {
        if (value === null || value === undefined) return false;
        if (typeof value === 'string') return value !== '';
        if (typeof value === 'number') return value.toString() !== '';
        return true;
      },
    };
  },
  minLength(min: number, errorMessage?: string): ValidationRule<string> {
    return {
      errorMessage: errorMessage || `En az ${min} karakter olmalıdır.`,
      validate(value: string) {
        if (!value) return false;
        return value.length >= min;
      },
    };
  },
  maxLength(max: number, errorMessage?: string): ValidationRule<string> {
    return {
      errorMessage: errorMessage || `En fazla ${max} karakter olmalıdır.`,
      validate(value: string) {
        if (!value) return true;
        return value.length <= max;
      },
    };
  },
  number(errorMessage: string = 'Geçerli bir sayı giriniz.'): ValidationRule<number> {
    return {
      errorMessage,
      validate(value: number) {
        return !isNaN(Number(value));
      },
    };
  },
  min(min: number, errorMessage?: string): ValidationRule<number> {
    return {
      errorMessage: errorMessage || `En az ${min} olmalıdır.`,
      validate(value: number) {
        if (isNaN(Number(value))) return false;
        return Number(value) >= min;
      },
    };
  },
  max(max: number, errorMessage?: string): ValidationRule<number> {
    return {
      errorMessage: errorMessage || `En az ${max} olmalıdır.`,
      validate(value: number) {
        if (isNaN(Number(value))) return false;
        return Number(value) <= max;
      },
    };
  },
  rgx(regex: RegExp, errorMessage: string = 'Geçerli bir değer giriniz.'): ValidationRule<string> {
    return {
      errorMessage,
      validate(value: string) {
        if (!value) return true;
        return regex.test(value);
      },
    };
  },
  custom(validateFnc: (value: any) => boolean, errorMessage: string): ValidationRule<any> {
    return {
      errorMessage,
      validate(value: any) {
        return validateFnc(value);
      },
    };
  },
};

export default Validators;
