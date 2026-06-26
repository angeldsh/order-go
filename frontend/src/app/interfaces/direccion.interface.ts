import { Cliente } from "./cliente.interface";

export interface Direccion {
  id?: number;
  direccion: string;
  cp: string;
  cliente: Cliente;
  cpValido?: boolean;
}
