import {HttpClient} from '@angular/common/http';
import {Injectable, Input} from '@angular/core';
import {AuthModel, SignUpModel} from '../types/AuthModel';
import {Observable, tap} from 'rxjs';
import {Router} from '@angular/router';
import {SessionStorage} from '../utils/session-storage';
import {NotificationService} from './notification.service';
import {JwtHelperService} from '@auth0/angular-jwt';

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

  private apiUrl = 'http://localhost:8080/api';
  helper = new JwtHelperService();


  signIn(credentials: AuthModel): Observable<any> {
    console.log(`${this.apiUrl}`, credentials);

    return this.http.post(`${this.apiUrl}/auth/signIn`, credentials, { responseType: 'text' }).pipe(
      tap((response: string) => {
        if (response) {
          localStorage.setItem('authToken', response);
          this.router.navigate(["/auth/sign-in"])
        }
      })
    );
  }

  signUp(userDetails: SignUpModel){
    console.log("URL", `${this.apiUrl}/user/register`)
    return this.http.post(`${this.apiUrl}/user/register`, userDetails, { responseType: 'text' }).pipe(
      tap((response: string) => {
        if (response) {}
      })
    );
  }

  signOut() {
    console.log("signout");

    localStorage.removeItem("authToken");
    this.router.navigate(["auth/sign-in"])
  }

  public getAuthUser(): boolean {
    const authToken = localStorage.getItem('authToken');

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

      let token = this.getToken();
      let decodedToken;

      if (token) {
        return decodedToken = this.helper.decodeToken(token)
      } else {

        return null
      }
    } catch (err) {
      console.log("aqui");
      return console.error(err);
      ;
    }
  }





}


