import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TOKEN_NAME } from '../_shared/constants';
import { tap } from 'rxjs/operators';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private serviceSecurity: SecurityService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("sessionStorage:",sessionStorage)
    let token = sessionStorage.getItem(TOKEN_NAME);
    console.log("token:",token)
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          //no hacemos nada porque todo está ok
        }
      }, err => {
        console.log("err: "+JSON.stringify(err));
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 403) {
            //alert("Ocurrio un error al validar su token... intente loguearse nuevamente");
            alert("Ocurrio un error al validar su token o no tiene permisos");
            this.serviceSecurity.cerrarSesion();
          }
        }
      })
    );
  }
}
