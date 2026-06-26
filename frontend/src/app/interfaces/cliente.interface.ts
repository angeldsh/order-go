import { Usuario } from "./usuario.interface";

export interface Cliente {
  id?: number;
  nif: string;
  telefono: string | null; 
  usuario: Usuario; 
}