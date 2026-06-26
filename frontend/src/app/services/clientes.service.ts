import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente.interface';
import { Direccion } from '../interfaces/direccion.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private clientesUrl = `${environment.orderAndGoBackendBaseUrl}/api/clientes`;

  constructor(
    private httpClient: HttpClient
  ) { }


  obtenerDireccionesCliente(clienteId: number): Observable<Direccion[]> {
    const url = `${this.clientesUrl}/${clienteId}/direcciones`;
    return this.httpClient.get<Direccion[]>(url);
  }
  getClientes(): Observable<Cliente[]> {

    let url: string = `${this.clientesUrl}`;

    return this.httpClient.get<Cliente[]>(url);
  }
  actualizarCliente(cliente: Cliente): Observable<any> {
    const url = `${this.clientesUrl}/${cliente.id}`;
    return this.httpClient.put(url, cliente);
  }
  agregarCliente(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>(this.clientesUrl, cliente);
  }

  eliminarCliente(clienteId: number): Observable<any> {
    const url = `${this.clientesUrl}/${clienteId}`;
    return this.httpClient.delete(url);
  }
  getCliente(clienteId: number): Observable<Cliente> {
    const url = `${this.clientesUrl}/${clienteId}`;
    return this.httpClient.get<Cliente>(url);
  }
}