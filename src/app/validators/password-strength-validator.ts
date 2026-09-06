import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value || '';
  const hasUpperCase = /[A-Z]+/.test(value);
  const hasLowerCase = /[a-z]+/.test(value);
  const hasNumber = /[0-9]+/.test(value);

  const destination = {
    ...(!hasUpperCase ? { lacksUpperCase: !hasUpperCase } : {}),
    ...(!hasLowerCase ? { lacksLowerCase: !hasLowerCase } : {}),
    ...(!hasNumber ? { lacksNumber: !hasNumber } : {}),
  };

  if (Object.keys(destination).length > 0) {
    return destination;
  } else {
    return null;
  }
}
