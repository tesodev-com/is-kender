import { describe, expect, it } from 'vitest';
import FormValidator from './FormValidator';
import Validators from './Validators';

describe('FormValidator', () => {
  it('should returned not error', () => {
    const formValues = {
      username: 'field',
      password: 'field123',
    };
    const validator = new FormValidator();
    validator.addRule('username', [Validators.required()]).addRule('password', [Validators.required(), Validators.minLength(8)]);
    expect(validator.validateForm(formValues)).toEqual({});
  });
  it('should returned error', () => {
    const formValues = {
      username: 'field',
      password: 'field',
    };
    const validator = new FormValidator();
    validator.addRule('username', [Validators.required()]).addRule('password', [Validators.required(), Validators.minLength(8)]);
    expect(validator.validateForm(formValues)).toEqual({
      password: ['En az 8 karakter olmalıdır.'],
    });
  });
  it('should returned error with custom rule', () => {
    const formValues = {
      username: 'field',
      password: 'field',
    };
    const validator = new FormValidator();
    validator
      .addRule('username', [Validators.required()])
      .addRule('password', [Validators.required(), Validators.custom((value: string) => value.includes('FIELD'), 'The field must include "FIELD"')]);
    expect(validator.validateForm(formValues)).toEqual({
      password: ['The field must include "FIELD"'],
    });
  });
});
