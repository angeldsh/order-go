import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private productosEnCarrito: { producto: Producto, cantidad: number }[] = [];
  private cantidadCarritoSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  private actualizarCantidadCarrito(): void {
    const cantidad = this.productosEnCarrito.reduce((total, producto) => total + producto.cantidad, 0);
    this.cantidadCarritoSubject.next(cantidad);
  }

  getProductosEnCarrito(): { producto: Producto, cantidad: number }[] {
    return this.productosEnCarrito;
  }

  vaciarCarrito(): void {
    this.productosEnCarrito = [];
    this.actualizarCantidadCarrito();

  }
  agregarProductoAlCarrito(producto: Producto): void {
    const index = this.productosEnCarrito.findIndex(p => p.producto.id === producto.id);
    if (index !== -1) {
      this.productosEnCarrito[index].cantidad++;
    } else {
      this.productosEnCarrito.push({ producto: producto, cantidad: 1 });
    }
    this.actualizarCantidadCarrito();
  }

  quitarProductoDelCarrito(producto: Producto): void {
    const index = this.productosEnCarrito.findIndex(p => p.producto.id === producto.id);
    if (index !== -1) {
      if (this.productosEnCarrito[index].cantidad > 1) {
        this.productosEnCarrito[index].cantidad--;
      } else {
        this.productosEnCarrito.splice(index, 1);
      }
      this.actualizarCantidadCarrito();
    }
  }

  obtenerCantidadCarritoObservable(): Observable<number> {
    return this.cantidadCarritoSubject.asObservable();
  }


  eliminarProductosPorId(producto: Producto): void {
    this.productosEnCarrito = this.productosEnCarrito.filter(p => p.producto.id !== producto.id);
    this.actualizarCantidadCarrito();
  }

}