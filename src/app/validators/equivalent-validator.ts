import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function equivalentValidator(
  firstControlName: string,
  secondControlName: string,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstControl = control.get(firstControlName);
    const secondControl = control.get(secondControlName);

    if (!firstControl || !secondControl) {
      return null;
    }

    const firstControlValue = firstControl.value;
    const secondControlValue = secondControl.value;

    if (firstControlValue !== secondControlValue) {
      secondControl.setErrors({ ...secondControl.errors, notEqual: true });
    } else if (secondControl.hasError('notEqual')) {
      const errors = { ...secondControl.errors };
      delete errors['notEqual'];

      const newErrors = Object.keys(errors).length > 0 ? errors : null;
      secondControl.setErrors(newErrors);
    }

    return null;
  };
}
