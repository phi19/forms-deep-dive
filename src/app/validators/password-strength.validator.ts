
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value || '';
  const hasUpperCase = /[A-Z]+/.test(value);
  const hasLowerCase = /[a-z]+/.test(value);
  const hasNumber = /[0-9]+/.test(value);

  const isValid = hasUpperCase && hasLowerCase && hasNumber;
  return !isValid ? { passwordStrength: true } : null;
}