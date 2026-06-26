import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ticket } from '../interfaces/ticket.interface';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketsUrl = `${environment.orderAndGoBackendBaseUrl}/api/tickets`;
  private ticketsSubject = new BehaviorSubject<Ticket[]>([]);
  tickets$ = this.ticketsSubject.asObservable();

  constructor(private http: HttpClient) { }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.ticketsUrl);
  }
  getOpenTickets(): void {
    this.http.get<Ticket[]>(`${this.ticketsUrl}/open`).subscribe(
      tickets => this.ticketsSubject.next(tickets),
    );
  }

  closeTicket(mesaNum: number): Observable<any> {
    const url = `${this.ticketsUrl}/close?numMesa=${mesaNum}`;
    return this.http.post<any>(url, {}).pipe(
      map(response => {
        this.getOpenTickets();
        return response;
      })
    );
  }

  createTicket(mesaNum: number): Observable<any> {
    const url = `${this.ticketsUrl}?numMesa=${mesaNum}`;
    return this.http.post<any>(url, {}).pipe(
      map(response => {
        this.getOpenTickets();
        return response;
      })
    );
  }

  verificarCodigo(codigoMesa: string): Observable<boolean> {
    const url = `${this.ticketsUrl}/validate/${codigoMesa}`;
    return this.http.get<boolean>(url);
}


  getTicket(codigoMesa: string): Observable<Ticket> {
    const url = `${this.ticketsUrl}/codigo/${codigoMesa}`;
    return this.http.get<Ticket>(url);
  }
}
