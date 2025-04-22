import FormValidator from '@/utils/formValidation/FormValidator';
import type { ValidationRule } from '@/utils/formValidation/types';
import { reactive, ref } from 'vue';

export function useFormValidation() {
  const validator = new FormValidator();
  const errors = reactive<Record<string, string[]>>({});
  const isValid = ref(true);

  const addRule = <T>(fieldName: string, rule: ValidationRule<T> | ValidationRule<T>[]) => {
    validator.addRule(fieldName, rule);
    return { addRule };
  };

  const validateField = <T>(fieldName: string, value: T) => {
    const fieldErrors = validator.validateField(fieldName, value);
    if (fieldErrors.length) {
      errors[fieldName] = fieldErrors;
    } else {
      delete errors[fieldName];
    }
    isValid.value = Object.keys(errors).length === 0;
    return fieldErrors;
  };

  const validateForm = (formValues: Record<string, any>) => {
    const validationErrors = validator.validateForm(formValues);
    Object.assign(errors, validationErrors);
    isValid.value = Object.keys(validationErrors).length === 0;
    return validationErrors;
  };

  const clearErrors = () => {
    Object.keys(errors).forEach(key => delete errors[key]);
    isValid.value = true;
  };

  return {
    errors,
    isValid,
    addRule,
    validateField,
    validateForm,
    clearErrors,
  };
}
