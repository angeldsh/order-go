import { Component, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Pedido } from 'src/app/interfaces/pedido.interface';
import { DetallePedido } from 'src/app/interfaces/detallePedido.interface';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
})
export class TablaComponent {
  @Input() pedidos: Pedido[] = [];
  mostrarCompletados = false;
  @Input() detallesPedidos: { [key: string]: DetallePedido[] } = {};



  constructor(
    private pedidosService: PedidosService,
    private alertController: AlertController
  ) { }


  pedidosPorEstado(estado: string): Pedido[] {
    return this.pedidos.filter(pedido => pedido.estado === estado);
  }

  toggleMostrarCompletados() {
    this.mostrarCompletados = !this.mostrarCompletados;
  }

  actualizarEstado(pedido: Pedido): void {
    if (pedido.id !== null) {
      this.pedidosService.actualizarEstadoPedido(pedido.id, pedido.estado)
        .subscribe(
          () => {
          }
        );
    }
  }


  async mostrarMensajeError(mensaje: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
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
}
