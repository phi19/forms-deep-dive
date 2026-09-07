import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function eitherOrTrueValidator(...controlNames: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const controls = controlNames
      .map((name) => control.get(name)?.value)
      .filter((value) => !!value);

    return {
      discoveryHasManyOptionsSelected: controls.length > 1,
      discoveryHasOnlyOneOptionSelected: controls.length === 0,
    };
  };
}
