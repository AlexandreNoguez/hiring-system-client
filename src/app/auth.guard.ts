import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './service/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // const usuarioEstaLogado = this.autorizadoService.obterLoginStatus();
    // if (usuarioEstaLogado)
    //   return true;

    let isAuthenticated = this.authService.getAuthUser()

    if (isAuthenticated) {
      return true
    }


    this.router.navigate(["/sign-in"])
    return false;
    // this.routerService.navigate(["/login"]);
    // return false;
  }
};
