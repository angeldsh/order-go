import { Cliente } from "./cliente.interface";
import { Direccion } from "./direccion.interface";
import { Ticket } from "./ticket.interface";

export interface Pedido {
 
  id: number | null;
  fecha: Date;
  estado: string;
  tipo: string;
  direccion?: Direccion;
  cliente?: Cliente;
  ticket?: Ticket;
}
