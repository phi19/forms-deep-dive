import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);

  checkEmailExists(email: string): Observable<{ emailExists: boolean } | null> {
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
}
