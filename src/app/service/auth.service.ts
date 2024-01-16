import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { AuthModel } from '../types/AuthModel';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { SessionStorage } from '../utils/session-storage';
import { NotificationService } from './notification.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: SessionStorage,
    private notification: NotificationService
  ) { }

  @Input() token: string | null = null;

  private apiUrl = 'http://localhost:8080/api/auth/signIn';
  helper = new JwtHelperService();


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

  signOut() {
    console.log("signout");

    localStorage.removeItem("authToken");
    this.router.navigate(["/sign-in"])
  }

  public getAuthUser() {
    const authToken = localStorage.getItem('authToken');
    console.log("authToken", authToken);

    if (authToken) {
      return true
    }
    return false

  }

  public getToken() {
    return localStorage.getItem('authToken');

  }

  public decodePayloadJWT(): any {
    try {
      // console.log(jwt_decode(this.getToken()));
      // return jwt_decode(this.getToken());
      let token = this.getToken();
      console.log("tokenteste", token);
      let decodedToken;

      if (token) {
        return decodedToken = this.helper.decodeToken(token)
      } else {
        // this.notification.errorMessage("Falha na autenticação, entre novamente por favor!")
        return null
      }
    } catch (err) {
      console.log("aqui");
      return console.error(err);
      ;
    }
  }



}


