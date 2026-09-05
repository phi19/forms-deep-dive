import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);

  checkEmailExists(email: string): Observable<{ emailExists: boolean }> {
    return this.httpClient.post('http://localhost:3000/check-email-exists', { email }).pipe(
      map(() => ({ emailExists: false })),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          return of({ emailExists: true });
        }
        return throwError(() => error);
      }),
    );
  }
}
