import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  first,
  map,
  Observable,
  of,
  switchMap,
  timer,
} from 'rxjs';
import { AuthService } from '../auth/auth-service';

export function uniqueEmailValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<{ emailExists: boolean } | null> => {
    if (!control.value) {
      return of(null);
    }

    return timer(500).pipe(
      switchMap(() => authService.checkEmailExists(control.value)),
      map((res) => (res.emailExists ? { emailExists: true } : null)),
      catchError(() => of(null)),
    );
  };
}
