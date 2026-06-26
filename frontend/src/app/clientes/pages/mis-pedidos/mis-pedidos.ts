import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/auth/services/autenticacion.service';
import { DetallePedido } from 'src/app/interfaces/detallePedido.interface';
import { Pedido } from 'src/app/interfaces/pedido.interface';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.page.html',
  styleUrls: ['./mis-pedidos.page.scss'],
})
export class MisPedidosPage implements OnInit {
  pedidos: Pedido[] = [];
  detallesPedidos: { [key: string]: DetallePedido[] } = {};
  mostrarCompletados: boolean = false; 

  constructor(
    private pedidosService: PedidosService,
    private autenticacionService: AutenticacionService
  ) { }

  ngOnInit() {
    this.actualizarPedidos();
  }

  cargarDetallesPedidos() {
    this.pedidos.forEach(pedido => {
      if (pedido.id !== null && pedido.id !== undefined) {
        this.pedidosService.obtenerDetallesPedido(pedido.id).subscribe(detalles => {
          this.detallesPedidos[pedido.id!] = detalles;
        });
      }
    });
  }

  getEstadoClase(estado: string): string {
    switch (estado) {
      case 'preparando':
        return 'preparando';
      case 'enviado':
        return 'enviado';
      default:
        return '';
    }
  }

  actualizarPedidos() {
    const ticketCode = localStorage.getItem('codigoMesa');

    if (ticketCode !== null) {
      this.pedidosService.getPedidosPorTicket(ticketCode).subscribe(pedidos => {
        this.pedidos = pedidos;
        this.ordenarPedidos();
        this.cargarDetallesPedidos();
      });
    } else {
      this.autenticacionService.obtenerClienteId().subscribe(clienteId => {
        if (clienteId) {
          this.pedidosService.getPedidosPorCliente(clienteId).subscribe(pedidos => {
            this.pedidos = pedidos;
            this.ordenarPedidos();
            this.cargarDetallesPedidos();
          });
        }
      });
    }
  }

  ordenarPedidos() {
    this.pedidos.sort((a, b) => {
      if (a.estado === 'completado' && b.estado !== 'completado') {
        return 1;
      } else if (a.estado !== 'completado' && b.estado === 'completado') {
        return -1;
      } else {
        return 0;
      }
    });
  }


  toggleMostrarCompletados() {
    this.mostrarCompletados = !this.mostrarCompletados;
  }
}
