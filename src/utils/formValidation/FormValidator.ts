import type { ValidationRule } from './types';

class FormValidator {
  private rules: Map<string, ValidationRule<any>[]> = new Map();
  private errorMessages: Map<string, string[]> = new Map();

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
    this.clearErrorMessages(fieldName);
    const fieldRules = this.rules.get(fieldName);
    fieldRules?.forEach(rule => {
      if (!rule.validate(value)) {
        this.setErrorMessages(fieldName, rule.errorMessage);
      }
    });
    return this.getErrorMessages(fieldName);
  }

  validateForm(formValues: Record<string, any>): Record<string, string[]> {
    const result: Record<string, string[]> = {};

    for (const fieldName of this.rules.keys()) {
      const value = formValues[fieldName];
      const errorMessages = this.validateField(fieldName, value);
      if (errorMessages.length) {
        result[fieldName] = errorMessages;
      }
    }
    return result;
  }

  isValid() {
    return this.rules.size === 0 || this.errorMessages.size === 0;
  }

  getErrorMessages(fieldName: string): string[] {
    return this.errorMessages.get(fieldName) || [];
  }

  getAllErrorMessages(): Record<string, string[]> {
    const allErrors: Record<string, string[]> = {};
    this.errorMessages.forEach((messages, fieldName) => {
      allErrors[fieldName] = messages;
    });
    return allErrors;
  }

  clearErrorMessages(fieldName: string) {
    if (this.errorMessages.has(fieldName)) {
      this.errorMessages.delete(fieldName);
    }
  }

  clearAllErrorMessages() {
    this.errorMessages.clear();
  }

  private setErrorMessages(fieldName: string, messages: string) {
    const errors = this.errorMessages.get(fieldName) || [];
    this.errorMessages.set(fieldName, [...errors, messages]);
  }
}

export default FormValidator;
