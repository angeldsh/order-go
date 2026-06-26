import { Component, OnInit, Input } from '@angular/core';
import { AlertController, IonicModule, ModalController, Platform } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CarritoService } from 'src/app/services/carrito.service';
import { Router, RouterModule } from '@angular/router';
import { PedidosService } from 'src/app/services/pedidos.service';
import { MesasService } from 'src/app/services/mesas.service';
import { Pedido } from 'src/app/interfaces/pedido.interface';
import { DetallePedido } from 'src/app/interfaces/detallePedido.interface';
import { Ticket } from 'src/app/interfaces/ticket.interface';
import { Producto } from 'src/app/interfaces/producto.interface';
import { TramitarModalComponent } from '../modal-tramitar/tramitar-modal';
import { TicketService } from 'src/app/services/tickets.service';


@Component({
  selector: 'app-header-mesa',
  templateUrl: './header-mesa.component.html',
  styleUrls: ['./header-mesa.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})

export class HeaderMesaComponent implements OnInit {
  @Input() titulo: string = '';
  @Input() volver: boolean = true;

  cantidadEnCarrito: number = 0;

  productosEnCarrito: { producto: Producto, cantidad: number }[] = [];

  ticket: Ticket | undefined;

  codigoMesa = "";

  constructor(private modalController: ModalController, private carritoService: CarritoService,
    private pedidoService: PedidosService, private mesaService: MesasService, private router: Router,
    private alertController: AlertController,
    private ticketService: TicketService,) { }


  ngOnInit(): void {
    this.carritoService.obtenerCantidadCarritoObservable().subscribe(cantidad => {
      this.cantidadEnCarrito = cantidad;
    });
    this.actualizarProductosEnCarrito();
  }
  private actualizarProductosEnCarrito(): void {
    this.productosEnCarrito = this.carritoService.getProductosEnCarrito();
  }
  async abrirModalTramitarPedido() {
    this.actualizarProductosEnCarrito();
    const modal = await this.modalController.create({
      component: TramitarModalComponent,
      componentProps: {
        productosEnCarrito: this.productosEnCarrito,
        tramitarPedido: this.tramitarPedido.bind(this)
      }
    });
    return await modal.present();
  }
  async tramitarPedido() {
    this.codigoMesa = localStorage.getItem('codigoMesa') || "";
    if (this.codigoMesa != "") {
      this.ticketService.getTicket(this.codigoMesa).subscribe((ticket) => {
        this.ticket = ticket;

        const nuevoPedido: Pedido = {
          id: null,
          fecha: new Date(),
          estado: 'pendiente',
          tipo: 'mesa',
          ticket: this.ticket
        };

        this.pedidoService.crearPedido(nuevoPedido).subscribe((pedidoCreado) => {
          this.productosEnCarrito.forEach(item => {
            const detallePedido: DetallePedido = {
              pedido: pedidoCreado,
              producto: item.producto,
              cantidad: item.cantidad,
              precio: item.producto.precio
            };

            this.pedidoService.crearDetallesPedido([detallePedido]).subscribe(() => {

              this.carritoService.vaciarCarrito();
            });
          });
        });
      });
      this.mostrarMensajeExito();

      setTimeout(() => {
        this.router.navigateByUrl('/clientes/mis-pedidos');
      }, 500);
    } else {
      this.router.navigate(['/welcome']);
      this.carritoService.vaciarCarrito();
      localStorage.removeItem('codigoMesa');
      this.mostrarMensajeMesa();
      return;
    }
  }
  mostrarMensajeExito() {
    this.alertController.create({
      header: 'Order Completed',
      message: 'Your order has been placed successfully',
      buttons: ['OK']
    }).then(alert => {
      alert.present();
      this.modalController.dismiss();
    });
  }
  mostrarMensajeError(mensaje: string) {
    this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    }).then(alert => {
      alert.present();
      this.modalController.dismiss();
    });
  }
  mostrarMensajeMesa() {
    this.alertController.create({
      header: 'Error',
      message: 'No valid table code was entered',
      buttons: ['OK']
    }).then(alert => {
      alert.present();
      this.modalController.dismiss();
    });
  }
}
