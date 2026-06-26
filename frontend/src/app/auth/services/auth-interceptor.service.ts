import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private autenticacionService: AutenticacionService
  ) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.autenticacionService.getJwtToken();

    let peticion: HttpRequest<any>;

    if (token != null) {

      peticion = request.clone({

        setHeaders: {
          Authorization: `Bearer ${token}`,
        },

      });
    } else {

      peticion = request;
    }

    return next.handle(peticion);
  }
}
