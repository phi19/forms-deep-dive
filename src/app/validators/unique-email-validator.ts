import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { debounceTime, distinctUntilChanged, first, Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../auth/auth-service';

export function uniqueEmailValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<{ emailExists: boolean } | null> => {
    if (!control.value) {
      return of(null);
    }

    return control.valueChanges.pipe(
      // Wait 500ms after the user stops typing
      debounceTime(500),
      // Ignore duplicate consecutive values
      distinctUntilChanged(),
      // Cancel previous requests if a new value arrives
      switchMap((email) => authService.checkEmailExists(email)),
      // Complete the stream once a result as arrived
      first(),
    );
  };
}
