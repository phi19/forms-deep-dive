import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { catchError, map, Observable, of, switchMap, timer } from 'rxjs';
import { AuthService } from '../auth/auth-service';

export function existingEmailValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<{ nonExistentEmail: boolean } | null> => {
    if (!control.value) {
      return of(null);
    }

    return timer(500).pipe(
      switchMap(() => authService.checkEmailExists(control.value)),
      map((res) => (res.emailExists ? null : { nonExistentEmail: true })),
      catchError(() => of(null)),
    );
  };
}
