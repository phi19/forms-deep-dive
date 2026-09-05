import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);

  private checkEmailExists(email: string) {
    return this.httpClient
      .post<{ data: boolean }>('http://localhost:3000/check-email-exists', { email })
      .pipe(
        map((response) => {
          return null;
        }),
        catchError((error) => {
          return of({ emailExists: true });
        }),
      );
  }

  uniqueEmailValidator(): AsyncValidatorFn {
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
        switchMap((email) => this.checkEmailExists(email)),
        // Complete the stream once a result as arrived
        first(),
      );
    };
  }
}
