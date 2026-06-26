import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AutenticacionService } from 'src/app/auth/services/autenticacion.service';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { DetallePedido } from 'src/app/interfaces/detallePedido.interface';
import { Direccion } from 'src/app/interfaces/direccion.interface';
import { Pedido } from 'src/app/interfaces/pedido.interface';
import { Producto } from 'src/app/interfaces/producto.interface';
import { CarritoService } from 'src/app/services/carrito.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { PedidosService } from 'src/app/services/pedidos.service';

import { DireccionPedidoModalPage } from 'src/app/components/modal-direccion/direccion-modal';
import { PaypalModalPage } from 'src/app/components/modal-paypal/paypal-modal';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage {

  productosEnCarrito: { producto: Producto, cantidad: number }[] = [];
  totalPrecio: number = 0;
  pedidoConfirmado: boolean = false;

  clienteId: number | null = null;
  cliente: Cliente | undefined ;

  direccionSeleccionada: Direccion | undefined;

  constructor(private carritoService: CarritoService,
    private pedidoService: PedidosService,
    private alertController: AlertController,
    private router: Router,
    private autenticacionService: AutenticacionService,
    private clientesService: ClientesService,
    private modalController: ModalController,
  ) { }

  ngAfterViewInit() {
    this.carritoService.obtenerCantidadCarritoObservable().subscribe(() => {
      this.actualizarProductosEnCarrito();
      this.calcularTotalPrecio();
    });
  }
  


  private actualizarProductosEnCarrito(): void {
    this.productosEnCarrito = this.carritoService.getProductosEnCarrito();
  }

  aumentarCantidad(producto: Producto): void {
    this.carritoService.agregarProductoAlCarrito(producto);
    this.actualizarProductosEnCarrito();
    this.calcularTotalPrecio();
  }

  reducirCantidad(producto: Producto): void {
    this.carritoService.quitarProductoDelCarrito(producto);
    this.actualizarProductosEnCarrito();
    this.calcularTotalPrecio();
  }

  eliminarProducto(producto: Producto): void {
    this.carritoService.eliminarProductosPorId(producto);
    this.actualizarProductosEnCarrito();
    this.calcularTotalPrecio();
  }

  calcularTotalPrecio(): void {
    this.totalPrecio = this.productosEnCarrito.reduce((total, item) => {
      return total + (item.producto.precio * item.cantidad);
    }, 0);
    this.totalPrecio = parseFloat(this.totalPrecio.toFixed(2));
  }

  async tramitarPedido() {
    this.cliente = await this.clientesService.getCliente(this.clienteId!).toPromise();

    const nuevoPedido: Pedido = {
      id: null,
      fecha: new Date(),
      estado: 'pendiente',
      tipo: 'domicilio',
      direccion: this.direccionSeleccionada,
      cliente: this.cliente
    };

    this.pedidoService.crearPedido(nuevoPedido).subscribe((pedidoCreado) => {
      const detallesPedido: DetallePedido[] = this.productosEnCarrito.map(item => ({
        pedido: pedidoCreado,
        producto: item.producto,
        cantidad: item.cantidad,
        precio: item.producto.precio
      }));

      this.pedidoService.crearDetallesPedido(detallesPedido).subscribe(() => {
        this.pedidoConfirmado = true;
        this.carritoService.vaciarCarrito();
        setTimeout(() => {
          this.router.navigate(['clientes/mis-pedidos']);
        }, 500);
        this.mostrarMensajePedidoConfirmado();
      });
    });
  }
  
  async validarCarrito() {
    if (this.productosEnCarrito.length === 0) {
      this.mostrarMensajeProductosRequeridos();
      return;
    }

    if (this.direccionSeleccionada === undefined) {
      await this.seleccionarDireccion();
      return;
    }

    this.clienteId = await firstValueFrom(this.autenticacionService.obtenerClienteId());
    if (this.clienteId === null) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.tramitarPedidoPaypal();

  }


  async abrirModalDirecciones(): Promise<void> {
    this.clienteId = await firstValueFrom(this.autenticacionService.obtenerClienteId());

    if (!this.clienteId) {
      return;
    }

    const direcciones = await firstValueFrom(this.clientesService.obtenerDireccionesCliente(this.clienteId));
    const modal = await this.modalController.create({
      component: DireccionPedidoModalPage,
      componentProps: {
        clienteId: this.clienteId,
        direcciones: direcciones
      }
    });

    modal.onDidDismiss().then(data => {
      const direccionSeleccionada = data?.data;
      if (direccionSeleccionada) {
        this.direccionSeleccionada = direccionSeleccionada;
        this.tramitarPedidoPaypal();
      }
    });

    await modal.present();
  }

  async tramitarPedidoPaypal() {
    const totalRedondeado = this.totalPrecio.toFixed(2);

    const modal = await this.modalController.create({
        component: PaypalModalPage,
        componentProps: {
            totalPrecio: totalRedondeado,
            tramitarPedido: this.tramitarPedido.bind(this) 
        }
    });

    await modal.present();
}

  async seleccionarDireccion(): Promise<void> {
    if (this.direccionSeleccionada === undefined) {
      const sesionIniciada = await this.autenticacionService.isSesionIniciada().toPromise();
      if (!sesionIniciada) {
        this.router.navigate(['/auth/login']);
        return;
      }
      await this.abrirModalDirecciones();
    }
  }

  async mostrarMensajePedidoConfirmado() {
    const alert = await this.alertController.create({
      header: 'Pedido Confirmado',
      message: 'Tu pedido ha sido realizado con éxito.'
    });

    await alert.present();
    setTimeout(() => {
      alert.dismiss();
    }, 2500);
  }

  mostrarMensajeProductosRequeridos() {
    this.alertController.create({
      header: 'Error',
      message: 'Necesitas agregar al menos un producto para poder tramitar el pedido.',
      buttons: ['OK']
    }).then(alert => {
      alert.present();
    });
  }
  

}
