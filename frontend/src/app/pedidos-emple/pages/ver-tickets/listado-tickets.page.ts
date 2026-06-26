import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/interfaces/pedido.interface';
import { DetallePedido } from 'src/app/interfaces/detallePedido.interface';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado-tickets.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoTicketsPage implements OnInit {
  pedidos: Pedido[] = [];
  detallesPedidos: { [key: string]: DetallePedido[] } = {};
  pedidosPorTicket: { [key: string]: Pedido[] } = {};
  pedidosFiltradosPorFecha: { [key: string]: Pedido[] } = {};
  fechaInicio: string | undefined;
  fechaFin: string | undefined;
  filtroCodigo: string = '';
  mostrarSelectorFecha: boolean = false;

  constructor(private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.cargarPedidosYDetalles();
  }

  cargarPedidosYDetalles(): void {
    this.pedidosService.getPedidos().subscribe(pedidos => {
      this.pedidos = pedidos;
      this.agruparPedidosPorTicket();
      this.filtrarPedidos();

      this.pedidos.forEach(pedido => {
        if (pedido.id) {
          this.pedidosService.obtenerDetallesPedido(pedido.id).subscribe(detalles => {
            this.detallesPedidos[pedido.id!] = detalles;
          });
        }
      });
    });
  }

  agruparPedidosPorTicket(): void {
    this.pedidosPorTicket = this.pedidos.reduce((acc, pedido) => {
      const ticketCodigoAcceso = pedido.ticket?.codigoAcceso ?? 'A domicilio';
      if (!acc[ticketCodigoAcceso]) {
        acc[ticketCodigoAcceso] = [];
      }
      acc[ticketCodigoAcceso].push(pedido);
      return acc;
    }, {} as { [key: string]: Pedido[] });
  }

  filtrarPedidos(): void {
    const fechaInicio = this.fechaInicio ? new Date(this.fechaInicio) : new Date('1970-01-01');
    const fechaFin = this.fechaFin ? new Date(this.fechaFin) : new Date('9999-12-31');

    fechaInicio.setHours(0, 0, 0, 0);
    fechaFin.setHours(23, 59, 59, 999);

    this.pedidosFiltradosPorFecha = {};
    const codigoBusqueda = this.filtroCodigo.toLowerCase().trim();

    for (const ticketCodigoAcceso of Object.keys(this.pedidosPorTicket)) {
      // Filter by ticket code if there is text
      if (codigoBusqueda) {
        const esDomicilio = ticketCodigoAcceso === 'A domicilio';
        const matchDomicilio = esDomicilio && 'delivery'.includes(codigoBusqueda);
        const matchCodigo = ticketCodigoAcceso.toLowerCase().includes(codigoBusqueda);
        
        if (!matchCodigo && !matchDomicilio) {
          continue;
        }
      }

      const pedidosFiltrados = this.pedidosPorTicket[ticketCodigoAcceso].filter(pedido => {
        const pedidoFecha = new Date(pedido.fecha);
        return pedidoFecha >= fechaInicio && pedidoFecha <= fechaFin;
      });

      if (pedidosFiltrados.length > 0) {
        this.pedidosFiltradosPorFecha[ticketCodigoAcceso] = pedidosFiltrados;
      }
    }
  }

  validarFechas(): void {
    if (this.fechaInicio && this.fechaFin) {
      const fechaInicio = new Date(this.fechaInicio);
      const fechaFin = new Date(this.fechaFin);
      if (fechaInicio > fechaFin) {
        this.fechaFin = undefined;
      }
    }
  }

  abrirSelectorFecha(): void {
    this.mostrarSelectorFecha = true;
  }

  cerrarSelectorFecha(): void {
    this.mostrarSelectorFecha = false;
    this.filtrarPedidos();
  }

  resetearFecha(): void {
    this.fechaInicio = undefined;
    this.fechaFin = undefined;
    this.filtrarPedidos();
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
