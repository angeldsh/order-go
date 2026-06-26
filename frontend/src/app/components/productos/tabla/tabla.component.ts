import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { Producto } from 'src/app/interfaces/producto.interface';
import { CarritoService } from 'src/app/services/carrito.service';



@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class TablaComponent {
  page: number = 1;

  @Input() productosAgrupadosPorCategoria: { categoria: string, productos: Producto[] }[] = [];

  categoriaVisible: string | null = null;
  constructor(private carritoService: CarritoService) {

  }
  scrollHandler(event: CustomEvent) {
    const scrollOffset = event.detail.scrollTop;
    const scrollThreshold = 80; 

    for (const grupo of this.productosAgrupadosPorCategoria) {
      const categoriaElement = document.getElementById(grupo.categoria);

      if (categoriaElement) {
        const categoriaTop = categoriaElement.offsetTop;

        if (categoriaTop - scrollThreshold <= scrollOffset) {
          this.categoriaVisible = grupo.categoria;
        }
      }
    }
  }


  agregarProducto(producto: Producto): void {
    this.carritoService.agregarProductoAlCarrito(producto);
  }

  quitarProducto(producto: Producto): void {
    this.carritoService.quitarProductoDelCarrito(producto);
  }

  obtenerCantidadEnCarrito(producto: Producto): number {
    const productosEnCarrito = this.carritoService.getProductosEnCarrito();
    const itemEnCarrito = productosEnCarrito.find(item => item.producto.id === producto.id);
    return itemEnCarrito ? itemEnCarrito.cantidad : 0;
  }

  scrollToCategoria(categoria: string): void {
    const element = document.getElementById(categoria);
    if (element) {
      element.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }


}
