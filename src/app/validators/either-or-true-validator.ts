import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function eitherOrTrueValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!(control instanceof FormGroup)) {
      return null;
    }

    const selectedCount = Object.values(control.controls).filter((control) => control.value).length;

    if (selectedCount > 1) {
      return { discoveryHasManyOptionsSelected: true };
    }
    if (selectedCount === 0) {
      return { discoveryHasOnlyOneOptionSelected: true };
    }

    return null;
  };
}
