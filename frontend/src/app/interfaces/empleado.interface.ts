import { Usuario } from "./usuario.interface";

export interface Empleado {
  id?: number;
  disponible: boolean;
  nif: string;
  puesto: string;
  telefono: string;
  usuario: Usuario;
}