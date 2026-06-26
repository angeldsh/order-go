import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductoModalPage } from 'src/app/components/productos/edit/modal-producto';
import { TablaAdmComponent } from 'src/app/components/productos/tabla-adm/tabla.component';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPageAdm implements OnInit {

  productos: Producto[] = [];
  productosAgrupadosPorCategoria: { categoria: string, productos: Producto[] }[] = [];
  @ViewChild(TablaAdmComponent) tablaComponent: TablaAdmComponent | undefined;


  constructor(private productosService: ProductosService, private modalController: ModalController) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  async addProducto() {
    const modal = await this.modalController.create({
      component: ProductoModalPage
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.producto) {
      this.productos.push(data.producto);
      this.cargarProductosYActualizarTabla();
    }
  }
  cargarProductosYActualizarTabla(): void {
    this.productosService.getProductos()
      .subscribe(
        productos => {
          if (this.tablaComponent) {
            this.tablaComponent.productos = productos;
          }
        }
      );
  }

  cargarProductos(): void {
    this.productosService.getProductos()
      .subscribe(
        productos => {
          this.productos = productos;

          this.productos.forEach(producto => {
            if (producto.imagen) {
              this.cargarFoto(producto);
            }
          });
        }
      );
  }

  cargarFoto(producto: Producto): void {
    this.productosService.getFotoProducto(producto.id)
      .subscribe(
        foto => {
          producto.imagen = URL.createObjectURL(foto);
          producto.imagenCargada = true;
        },
        error => {
          producto.imagenCargada = false;
        }
      );
  }


}
