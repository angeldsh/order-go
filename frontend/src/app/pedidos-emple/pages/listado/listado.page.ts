import { Component, OnInit } from '@angular/core';
import { DetallePedido } from 'src/app/interfaces/detallePedido.interface';
import { Pedido } from 'src/app/interfaces/pedido.interface';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {

  pedidos: Pedido[] = [];
  detallesPedidos: { [key: string]: DetallePedido[] } = {};

  constructor(private pedidosService: PedidosService) { }

  ngOnInit(): void {
    this.cargarPedidosYDetalles();
  }

  actualizarPedidos(): void {
    this.cargarPedidosYDetalles();
  }

  cargarPedidosYDetalles(): void {
    this.pedidosService.getPedidosPorFecha().subscribe(
      pedidos => {
        this.pedidos = pedidos;

        this.pedidos.forEach(pedido => {
          if (pedido.id) {
            this.pedidosService.obtenerDetallesPedido(pedido.id).subscribe(detalles => {
              this.detallesPedidos[pedido.id!] = detalles;
            });
          }
        });
      }
    );
  }
}
