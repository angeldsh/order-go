import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto.interface';
import { ProductoAdm } from '../interfaces/productoAdm.interface';
import { Categoria } from '../interfaces/categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private productosUrl = `${environment.orderAndGoBackendBaseUrl}/api/productos`;

  constructor(
    private httpClient: HttpClient
  ) { }

  getProductos(): Observable<Producto[]> {

    let url: string = `${this.productosUrl}`;

    return this.httpClient.get<Producto[]>(url);
  }
  getProducto(id: number): Observable<Producto> {
    let url: string = `${this.productosUrl}/${id}`;

    return this.httpClient.get<Producto>(url);
  }
  getFotoProducto(id: number): Observable<Blob> {
    let url: string = `${this.productosUrl}/foto/${id}`;

    return this.httpClient.get(url, { responseType: 'blob' });
  }

  eliminarProducto(id: number): Observable<any> {
    let url: string = `${this.productosUrl}/delete/${id}`;

    return this.httpClient.delete(url);
  }

  agregarProducto(producto: ProductoAdm, imagen: File): Observable<ProductoAdm> {
    const formData = new FormData();
    Object.keys(producto).forEach(key => {
      formData.append(key, producto[key]);
    });
    formData.append('file_imagen', imagen);

    return this.httpClient.post<ProductoAdm>(this.productosUrl, formData);
  }


  actualizarProductoConImagen(id: number, producto: ProductoAdm, imagen: File): Observable<Producto> {
    const formData = new FormData();
    formData.append('file_imagen', imagen);
    Object.keys(producto).forEach(key => {
      formData.append(key, producto[key]);
    });

    return this.httpClient.put<Producto>(`${this.productosUrl}/update/${id}`, formData);
  }

  actualizarProducto(id: number, producto: ProductoAdm): Observable<Producto> {
    const formData = new FormData();
    Object.keys(producto).forEach(key => {
      formData.append(key, producto[key]);
    });

    return this.httpClient.put<Producto>(`${this.productosUrl}/update/${id}`, formData);
  }

  getCategorias(): Observable<Categoria[]> {

    return this.httpClient.get<Categoria[]>(`${this.productosUrl}/categorias`);
  }
}