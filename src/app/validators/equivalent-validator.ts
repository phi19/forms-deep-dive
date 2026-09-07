import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function equivalentValidator(controlName1: string, controlName2: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const control1 = control.get(controlName1);
    const control2 = control.get(controlName2);

    if (!control1 || !control2) {
      return null;
    }

    const val1 = control1.value;
    const val2 = control2.value;

    if (val1 !== val2) {
      control2.setErrors({ ...control2.errors, notEqual: true });
    } else if (control2.hasError('notEqual')) {
      const errors = { ...control2.errors };
      delete errors['notEqual'];

      const newErrors = Object.keys(errors).length > 0 ? errors : null;
      control2.setErrors(newErrors);
    }

    return null;
  };
}
