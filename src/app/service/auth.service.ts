import { HttpClient } from '@angular/common/http';
import { Injectable, Input, SimpleChanges } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthModel } from '../types/AuthModel';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { tokenGetter } from '../app.module';
import { Router, Routes } from '@angular/router';
import { SessionStorage } from '../utils/session-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: SessionStorage
  ) { }

  @Input() token: string | null = null;

  private apiUrl = 'http://localhost:8080/api/auth/signIn';

  signIn(credentials: AuthModel): Observable<any> {
    console.log(`${this.apiUrl}`, credentials);

    return this.http.post(this.apiUrl, credentials, { responseType: 'text' }).pipe(
      tap((response: string) => {
        if (response) {
          localStorage.setItem('authToken', response);
          this.router.navigate(["/"])
        }
      })
    );


  }

  getAuthUser() {
    console.log(this.storage.getItem('auth'));
    if (this.storage.getItem('auth')) {
      var value = this.storage.getItem('auth')?.toString();
      if (value) {
        return JSON.parse(value);
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
