import FormValidator from '@/utils/formValidation/FormValidator';
import type { ValidationRule } from '@/utils/formValidation/types';
import { ref } from 'vue';

export function useFormValidator() {
  const validator = new FormValidator();

  const isValid = ref(true);
  const errors = ref<Record<string, string[]>>({});

  const addRule = <T>(field: string, rule: ValidationRule<T> | ValidationRule<T>[]) => {
    validator.addRule(field, rule);
  };

  const validateField = <T>(field: string, value: T) => {
    const fieldErrors = validator.validateField(field, value);
    errors.value[field] = fieldErrors;
    updateValidity();
    return fieldErrors;
  };

  const validateForm = (formData: Record<string, any>) => {
    const allErrors = validator.validateForm(formData);
    errors.value = allErrors;
    updateValidity();
    return allErrors;
  };

  const getFieldErrors = (field: string) => {
    return validator.getErrorMessages(field);
  };

  const getAllErrors = () => {
    return validator.getAllErrorMessages();
  };

  const updateValidity = () => {
    isValid.value = validator.isValid();
  };

  return {
    isValid,
    errors,
    addRule,
    validateField,
    validateForm,
    getFieldErrors,
    getAllErrors,
  };
}
