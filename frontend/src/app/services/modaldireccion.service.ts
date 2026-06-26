import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Direccion } from '../interfaces/direccion.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalDireccionService {

  private direccionSeleccionada: Direccion | undefined;

  constructor(private http: HttpClient) { }
  private direccionsUrl = `${environment.orderAndGoBackendBaseUrl}/api/direcciones`;


  agregarDireccion(nuevaDireccion: Direccion): Observable<Direccion> {
    return this.http.post<any>(`${this.direccionsUrl}`, nuevaDireccion);
  }
  editarDireccion(direccion: Direccion): Observable<Direccion> {
    return this.http.put<any>(`${this.direccionsUrl}`, direccion);
  }
  setDireccionSeleccionada(direccion: Direccion): void {
    this.direccionSeleccionada = direccion;
  }
  eliminarDireccion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.direccionsUrl}/${id}`);
  }

  async esperarDireccionSeleccionada(): Promise<Direccion> {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (this.direccionSeleccionada) {
          clearInterval(interval);
          resolve(this.direccionSeleccionada);
        }
      }, 100);
    });
  }
}
