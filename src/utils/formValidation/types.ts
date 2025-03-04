export interface ValidationRule<T> {
  validate: (value: T) => boolean;
  errorMessage: string;
}
