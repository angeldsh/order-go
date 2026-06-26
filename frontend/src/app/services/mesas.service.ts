import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mesa } from '../interfaces/mesa.interface';


@Injectable({
  providedIn: 'root'
})
export class MesasService {
  constructor(private http: HttpClient) { }
  private mesasUrl = `${environment.orderAndGoBackendBaseUrl}/api/mesas`;

  getMesas(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(`${this.mesasUrl}`);
  }
  getMesa(mesaId: number): Observable<Mesa> {
    return this.http.get<Mesa>(`${this.mesasUrl}/${mesaId}`);
  }
  agregarMesa(mesa: Mesa): Observable<Mesa> {
    return this.http.post<Mesa>(`${this.mesasUrl}`, mesa);
  }
  actualizarMesa(mesa: Mesa): Observable<Mesa> {
    return this.http.put<Mesa>(`${this.mesasUrl}`, mesa);
  }
  eliminarMesa(mesaId: number): Observable<void> {
    return this.http.delete<void>(`${this.mesasUrl}/${mesaId}`);
  }
}