import type { ValidationRule } from './types';

class FormValidator {
  private rules: Map<string, ValidationRule<any>[]> = new Map();

  addRule<T>(fieldName: string, rule: ValidationRule<T> | ValidationRule<T>[]) {
    if (!this.rules.has(fieldName)) {
      this.rules.set(fieldName, []);
    }

    if (Array.isArray(rule)) {
      this.rules.set(fieldName, rule);
    } else {
      this.rules.get(fieldName)?.push(rule);
    }
    return this;
  }

  validateField<T>(fieldName: string, value: T) {
    if (!this.rules.has(fieldName)) return [];
    const fieldRules = this.rules.get(fieldName);
    const errorMessages: string[] = [];
    fieldRules?.forEach(rule => {
      if (!rule.validate(value)) {
        errorMessages.push(rule.errorMessage);
      }
    });
    return errorMessages;
  }

  validateForm(formValues: Record<string, any>): Record<string, string[]> {
    const result: Record<string, string[]> = {};

    for (const [fieldName] of this.rules.entries()) {
      const value = formValues[fieldName];
      const errorMessages = this.validateField(fieldName, value);
      if (errorMessages.length) {
        result[fieldName] = errorMessages;
      }
    }
    return result;
  }
}

export default FormValidator;
