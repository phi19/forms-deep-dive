import { AbstractControl, ValidationErrors } from '@angular/forms';

export function mustContainQuestionMarkValidator(
  control: AbstractControl,
): ValidationErrors | null {
  if (control.value.includes('?')) {
    return null;
  }

  return { doesNotContainQuestionMark: true };
}
