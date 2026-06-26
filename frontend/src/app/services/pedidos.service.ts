import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pedido } from '../interfaces/pedido.interface';
import { DetallePedido } from '../interfaces/detallePedido.interface';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpClient) { }
  private pedidosUrl = `${environment.orderAndGoBackendBaseUrl}/api/pedidos`;

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.pedidosUrl}`);
  }
  getPedido(pedidoId: Number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.pedidosUrl}/${pedidoId}`);
  }
  getPedidosPorFecha(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.pedidosUrl}?sort=fecha`);
  }
  crearPedido(pedido: Pedido): Observable<any> {
    return this.http.post<any>(`${this.pedidosUrl}`, pedido);
  }
  getPedidosPorCliente(clienteId: Number): Observable<Pedido[]> {
    const url = `${this.pedidosUrl}/cliente/${clienteId}`;
    return this.http.get<Pedido[]>(url);
  }

  getPedidosPorTicket(codigoMesa: string): Observable<Pedido[]> {
    const url = `${this.pedidosUrl}/mesa/${codigoMesa}`;
    return this.http.get<Pedido[]>(url);
  }


  crearDetallesPedido(detallesPedido: DetallePedido[]): Observable<any> {
    return this.http.post<any>(`${this.pedidosUrl}/detalles`, detallesPedido);
  }
  obtenerDetallesPedido(pedidoId: Number): Observable<DetallePedido[]> {
    return this.http.get<DetallePedido[]>(`${this.pedidosUrl}/detalles/${pedidoId}`);
  }
  actualizarEstadoPedido(pedidoId: Number, nuevoEstado: string): Observable<any> {
    const url = `${this.pedidosUrl}/${pedidoId}/estado/${nuevoEstado}`;
    return this.http.put<any>(url, {});
  }
  eliminarPedido(pedidoId: Number): Observable<any> {
    return this.http.delete<any>(`${this.pedidosUrl}/${pedidoId}`);
  }


}