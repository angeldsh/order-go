import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { LoginRequest, JwtResponse } from '../interfaces/auth.interface';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { Cliente } from 'src/app/interfaces/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private loginUrl: string = `${environment.orderAndGoBackendBaseUrl}/api/auth/login`;

  private authUrl: string = `${environment.orderAndGoBackendBaseUrl}/api/auth`;
  private jwtToken: string | null = null;


  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  obtenerClienteId(): Observable<number> {
    return this.httpClient.get<number>(`${this.authUrl}/clienteId`).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  obtenerUsuario(): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.authUrl}/usuario`, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`
      }
    }).pipe(
      catchError(error => {
        throw error;
      })
    );
  }


  solicitarResetContrasena(email: string): Observable<void> {
    const params = new HttpParams().set('email', email);

    return this.httpClient.post<void>(`${this.authUrl}/reset-password`, null, { params });
  }

  cambiarPassword(codigo: string, password: string): Observable<void> {
    const params = new HttpParams()
      .set('codigo', codigo)
      .set('password', password);
    return this.httpClient.post<void>(`${this.authUrl}/reset-password/confirm`, null, { params });
  }

  iniciarSesion(credentials: LoginRequest): Observable<boolean> {
    return this.httpClient.post<JwtResponse>(this.loginUrl, credentials)
      .pipe(
        map((response) => {

          this.jwtToken = response.token;

          return true;
        })
      );
  }
  getJwtToken(): string | null {
    return this.jwtToken;
  }

  isSesionIniciada(): Observable<boolean> {

    if (this.jwtToken) {
      return of(true);
    } else {
      return of(false);
    }
  }
  cerrarSesion(): void {
    this.jwtToken = null;
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  signUp(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>(`${this.authUrl}/signup`, cliente);
  }

}
