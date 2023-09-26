import { AbstractControl, ValidationErrors } from '@angular/forms';

export const passwordValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const errors = {
    invalidLength: control.value.length < 12,
    noUppercase: !/[A-Z]/.test(control.value),
    noLowercase: !/[a-z]/.test(control.value),
    noNumber: !/\d/.test(control.value),
    noSpecialChar: !/[`!@#$%^&*()_+\-=\]{};':\",./<>?~`]/.test(control.value),
  };

  return Object.values(errors).every((error) => {
    return error === false;
  })
    ? null
    : errors;
};
