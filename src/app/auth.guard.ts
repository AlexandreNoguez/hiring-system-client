import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {



  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.verifyLogin(url);
  }

  verifyLogin(url: string): boolean {
    console.log(url);
    console.log("entrei no authguard");
    if (!this.isLoggedIn()) {
      this.router.navigate(['/sign-in']);
      return false;
    }
    else {
      return true;
    }
  }

  public isLoggedIn(): boolean {
    let status = false;

    if (localStorage.getItem('authToken') == "true") {
      console.log(status);
      status = true;
    }
    else {
      status = false;
    }
    return status;
  }
}
