import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ProductoModalPage } from '../edit/modal-producto';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
})
export class TablaAdmComponent implements OnInit {
  @Input() productos: Producto[] = [];

  constructor(
    private modalController: ModalController,
    private productosService: ProductosService,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    this.productosService.getProductos().subscribe(
      productos => {
        this.productos = productos || [];
      }
    );
  }

  async editarProducto(producto: Producto) {
    const modal = await this.modalController.create({
      component: ProductoModalPage,
      componentProps: { producto }
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data && data.producto) {
      const productoActualizado = data.producto;
      const index = this.productos.findIndex(p => p.id === productoActualizado.id);

      if (index !== -1) {
        this.productos[index] = productoActualizado;
      } else {
        this.productos.push(productoActualizado);
      }
    }
  }

  async eliminarProducto(producto: Producto) {
    if (producto.id) {
      const confirmacion = await this.mostrarConfirmacion();
      if (confirmacion) {
        this.productosService.eliminarProducto(producto.id).subscribe(
          () => {
            this.productos = this.productos.filter(p => p.id !== producto.id);
          },
          (error: any) => {
            this.mostrarMensajeError();
          }
        );
      }
    }
  }

  async mostrarConfirmacion(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.alertController.create({
        header: 'Confirmation',
        message: 'Are you sure you want to delete this product?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              resolve(false);
            }
          },
          {
            text: 'Accept',
            handler: () => {
              resolve(true);
            }
          }
        ]
      }).then(alert => alert.present());
    });
  }

  async mostrarMensajeError() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'There was an error deleting the product.',
      buttons: ['OK']
    });
    await alert.present();
  }
}
