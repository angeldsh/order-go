import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente.interface';
import { Direccion } from '../interfaces/direccion.interface';
import { Empleado } from '../interfaces/empleado.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private empleadosUrl = `${environment.orderAndGoBackendBaseUrl}/api/empleados`;

  constructor(
    private httpClient: HttpClient
  ) { }
  getEmpleados(): Observable<Empleado[]> {
    let url: string = `${this.empleadosUrl}`;

    return this.httpClient.get<Empleado[]>(url);
  }

  actualizarEmpleado(empleado: Empleado): Observable<any> {
    const url = `${this.empleadosUrl}/${empleado.id}`;
    return this.httpClient.put(url, empleado);
  }

  agregarEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.httpClient.post<Empleado>(this.empleadosUrl, empleado);
  }

  eliminarEmpleado(empleadoId: number): Observable<any> {
    const url = `${this.empleadosUrl}/${empleadoId}`;
    return this.httpClient.delete(url);
  }

  getEmpleado(empleadoId: number): Observable<Empleado> {
    const url = `${this.empleadosUrl}/${empleadoId}`;
    return this.httpClient.get<Empleado>(url);
  }

  verificarNombreUsuario(username: string): Promise<boolean> {
    const url = `${this.empleadosUrl}/verificar-username/${username}`;
    return this.httpClient.get<boolean>(url).toPromise() as Promise<boolean>;
  }
  verificarEmail(email: string): Promise<boolean> {
    const url = `${this.empleadosUrl}/verificar-email/${email}`;
    return this.httpClient.get<boolean>(url).toPromise() as Promise<boolean>;
  }
}