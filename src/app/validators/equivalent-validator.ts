import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function equivalentValidator(
  firstControlName: string,
  secondControlName: string,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstControl = control.get(firstControlName);
    const secondControl = control.get(secondControlName);

    if (secondControl && secondControl.value !== firstControl?.value) {
      secondControl.setErrors({ notEqual: true });
    }

    return null;
  };
}
