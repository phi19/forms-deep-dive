import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function eitherOrTrueValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!(control instanceof FormArray)) {
      return null;
    }

    const selectedCount = control.controls.filter((control) => control.value).length;

    if (selectedCount > 1) {
      return { discoveryHasManyOptionsSelected: true };
    }
    if (selectedCount === 0) {
      return { discoveryHasOnlyOneOptionSelected: true };
    }

    return null;
  };
}
