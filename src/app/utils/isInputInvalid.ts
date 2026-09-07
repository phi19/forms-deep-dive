import { AbstractControl } from "@angular/forms";

export function isInputInvalid(input: AbstractControl): boolean {
  return (input.touched || input.dirty) && input.invalid;
}
