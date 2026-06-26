import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private categoriasUrl = `${environment.orderAndGoBackendBaseUrl}/api/categorias`;

  constructor(
    private httpClient: HttpClient
  ) { }

  getCategorias(): Observable<Categoria[]> {
    let url: string = `${this.categoriasUrl}`;

    return this.httpClient.get<Categoria[]>(url);
  }

  actualizarCategoria(categoria: Categoria): Observable<any> {
    const url = `${this.categoriasUrl}/${categoria.id}`;
    return this.httpClient.put(url, categoria);
  }

  agregarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.httpClient.post<Categoria>(this.categoriasUrl, categoria);
  }

  eliminarCategoria(categoriaId: number): Observable<any> {
    const url = `${this.categoriasUrl}/${categoriaId}`;
    return this.httpClient.delete(url);
  }

  getCategoria(categoriaId: number): Observable<Categoria> {
    const url = `${this.categoriasUrl}/${categoriaId}`;
    return this.httpClient.get<Categoria>(url);
  }
}
