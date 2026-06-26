import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {

  productos: Producto[] = [];
  productosAgrupadosPorCategoria: { categoria: string, productos: Producto[] }[] = [];
  constructor(private productosService: ProductosService) { }


  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productosService.getProductos()
      .subscribe(
        productos => {
          this.productos = productos;
          this.productosAgrupadosPorCategoria = this.agruparProductosPorCategoria(this.productos);
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

  private agruparProductosPorCategoria(productos: Producto[]): { categoria: string, productos: Producto[] }[] {
    const categorias: { [key: string]: Producto[] } = {};

    productos.forEach(producto => {
      if (!categorias[producto.categoria.nombre]) {
        categorias[producto.categoria.nombre] = [];
      }
      categorias[producto.categoria.nombre].push(producto);
    });

    return Object.keys(categorias).map(categoria => ({ categoria, productos: categorias[categoria] }));
  }
}
