import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

/**
 * Se sobrar tempo para o desenvolvimentovou tentar implementar
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return next.handle(authReq);
    }


    return next.handle(request);
  }


}
