import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatchValidator(
  controlName1: string,
  controlName2: string
) {
  return (control: AbstractControl): ValidationErrors | null => {
    const control1 = control.get(controlName1);
    const control2 = control.get(controlName2);

    return (control1?.value.length === 0 && control2?.value.length === 0) ||
      control1?.value !== control2?.value
      ? { doNotMatch: true }
      : null;
  };
}
