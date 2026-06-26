import { Mesa } from "./mesa.interface";

export interface Ticket {
  id: number;
  codigoAcceso: string;
  status: string;
  mesa?: Mesa | null; 
}