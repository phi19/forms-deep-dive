import { AbstractControl, ValidationErrors } from '@angular/forms';

export function mustContainQuestionMarkValidator(
  control: AbstractControl,
): ValidationErrors | null {
  if (control.value.includes('?')) {
    return null;
  }

  return { doesNotContainQuestionMark: true };
}

/**
 * function checkEmailExistsValidator(control: AbstractControl) {
  return this.userService
    .isEmailTaken(control.value)
    .pipe(map((isTaken) => (isTaken ? { emailTaken: true } : null)));
}

 */
// fix(css): color the input if it's invalid
