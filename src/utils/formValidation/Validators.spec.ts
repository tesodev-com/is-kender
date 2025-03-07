import { describe, expect, it } from 'vitest';
import Validators from './Validators';

describe('Validators', () => {
  // required validator tests
  describe('required', () => {
    const requiredValidator = Validators.required();

    it('should return false for null value', () => {
      expect(requiredValidator.validate(null)).toBe(false);
    });

    it('should return false for undefined value', () => {
      expect(requiredValidator.validate(undefined)).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(requiredValidator.validate('')).toBe(false);
    });

    it('should return true for non-empty string', () => {
      expect(requiredValidator.validate('test')).toBe(true);
    });

    it('should return true for number 0', () => {
      expect(requiredValidator.validate(0)).toBe(true);
    });

    it('should return true for boolean false', () => {
      expect(requiredValidator.validate(false)).toBe(true);
    });

    it('should return true for empty array', () => {
      expect(requiredValidator.validate([])).toBe(true);
    });

    it('should include custom error message', () => {
      const customMessage = 'Bu alan gereklidir!';
      const customValidator = Validators.required(customMessage);
      expect(customValidator.errorMessage).toBe(customMessage);
    });
  });

  // minLength validator tests
  describe('minLength', () => {
    const minLengthValidator = Validators.minLength(3);

    it('should return false for empty string', () => {
      expect(minLengthValidator.validate('')).toBe(false);
    });

    it('should return false for string shorter than min length', () => {
      expect(minLengthValidator.validate('ab')).toBe(false);
    });

    it('should return true for string equal to min length', () => {
      expect(minLengthValidator.validate('abc')).toBe(true);
    });

    it('should return true for string longer than min length', () => {
      expect(minLengthValidator.validate('abcdef')).toBe(true);
    });

    it('should include min length in default error message', () => {
      expect(minLengthValidator.errorMessage).toContain('3');
    });

    it('should include custom error message', () => {
      const customMessage = 'Çok kısa!';
      const customValidator = Validators.minLength(5, customMessage);
      expect(customValidator.errorMessage).toBe(customMessage);
    });
  });

  // maxLength validator tests
  describe('maxLength', () => {
    const maxLengthValidator = Validators.maxLength(5);

    it('should return true for empty string', () => {
      expect(maxLengthValidator.validate('')).toBe(true);
    });

    it('should return true for string shorter than max length', () => {
      expect(maxLengthValidator.validate('abc')).toBe(true);
    });

    it('should return true for string equal to max length', () => {
      expect(maxLengthValidator.validate('abcde')).toBe(true);
    });

    it('should return false for string longer than max length', () => {
      expect(maxLengthValidator.validate('abcdef')).toBe(false);
    });

    it('should include max length in default error message', () => {
      expect(maxLengthValidator.errorMessage).toContain('5');
    });

    it('should include custom error message', () => {
      const customMessage = 'Çok uzun!';
      const customValidator = Validators.maxLength(10, customMessage);
      expect(customValidator.errorMessage).toBe(customMessage);
    });
  });

  // number validator tests
  describe('number', () => {
    const numberValidator = Validators.number();

    it('should return true for integer', () => {
      expect(numberValidator.validate(42)).toBe(true);
    });

    it('should return true for float', () => {
      expect(numberValidator.validate(3.14)).toBe(true);
    });

    it('should return true for zero', () => {
      expect(numberValidator.validate(0)).toBe(true);
    });

    it('should return true for negative number', () => {
      expect(numberValidator.validate(-10)).toBe(true);
    });

    it('should return false for NaN', () => {
      expect(numberValidator.validate(NaN)).toBe(false);
    });

    it('should include custom error message', () => {
      const customMessage = 'Sayı değil!';
      const customValidator = Validators.number(customMessage);
      expect(customValidator.errorMessage).toBe(customMessage);
    });
  });

  // min validator tests
  describe('min', () => {
    const minValidator = Validators.min(5);

    it('should return false for value less than min', () => {
      expect(minValidator.validate(4)).toBe(false);
    });

    it('should return true for value equal to min', () => {
      expect(minValidator.validate(5)).toBe(true);
    });

    it('should return true for value greater than min', () => {
      expect(minValidator.validate(6)).toBe(true);
    });

    it('should return false for NaN', () => {
      expect(minValidator.validate(NaN)).toBe(false);
    });

    it('should include min value in default error message', () => {
      expect(minValidator.errorMessage).toContain('5');
    });

    it('should include custom error message', () => {
      const customMessage = 'Çok küçük!';
      const customValidator = Validators.min(10, customMessage);
      expect(customValidator.errorMessage).toBe(customMessage);
    });
  });

  // max validator tests
  describe('max', () => {
    const maxValidator = Validators.max(10);

    it('should return true for value less than max', () => {
      expect(maxValidator.validate(9)).toBe(true);
    });

    it('should return true for value equal to max', () => {
      expect(maxValidator.validate(10)).toBe(true);
    });

    it('should return false for value greater than max', () => {
      expect(maxValidator.validate(11)).toBe(false);
    });

    it('should return false for NaN', () => {
      expect(maxValidator.validate(NaN)).toBe(false);
    });

    it('should include max value in default error message', () => {
      expect(maxValidator.errorMessage).toContain('10');
    });

    it('should include custom error message', () => {
      const customMessage = 'Çok büyük!';
      const customValidator = Validators.max(100, customMessage);
      expect(customValidator.errorMessage).toBe(customMessage);
    });
  });

  // rgx validator tests
  describe('rgx', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValidator = Validators.rgx(emailRegex, 'Geçersiz e-posta adresi');

    it('should return true for empty string', () => {
      expect(emailValidator.validate('')).toBe(true);
    });

    it('should return true for valid email', () => {
      expect(emailValidator.validate('test@example.com')).toBe(true);
    });

    it('should return false for invalid email', () => {
      expect(emailValidator.validate('invalid-email')).toBe(false);
    });

    it('should include custom error message', () => {
      expect(emailValidator.errorMessage).toBe('Geçersiz e-posta adresi');
    });

    it('should use default error message if not provided', () => {
      const defaultValidator = Validators.rgx(/^\d+$/);
      expect(defaultValidator.errorMessage).toBe('Geçerli bir değer giriniz.');
    });
  });

  // custom validator tests
  describe('custom', () => {
    const isEven = (value: number) => value % 2 === 0;
    const evenValidator = Validators.custom(isEven, 'Çift sayı olmalıdır');

    it('should return true when custom function returns true', () => {
      expect(evenValidator.validate(2)).toBe(true);
    });

    it('should return false when custom function returns false', () => {
      expect(evenValidator.validate(3)).toBe(false);
    });

    it('should include custom error message', () => {
      expect(evenValidator.errorMessage).toBe('Çift sayı olmalıdır');
    });

    it('should support complex validation logic', () => {
      const hasUpperCase = (value: string) => /[A-Z]/.test(value);
      const hasNumber = (value: string) => /\d/.test(value);

      const passwordValidator = Validators.custom(value => hasUpperCase(value) && hasNumber(value), 'Şifre büyük harf ve rakam içermelidir');

      expect(passwordValidator.validate('abc')).toBe(false);
      expect(passwordValidator.validate('Abc')).toBe(false);
      expect(passwordValidator.validate('abc1')).toBe(false);
      expect(passwordValidator.validate('Abc1')).toBe(true);
    });
  });
});
