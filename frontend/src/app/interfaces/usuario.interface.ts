import { Rol } from "./rol.interface";

export interface Usuario {
  id: number;
  username: string;
  email: string;
  password: string;
  nombre: string | null; 
  apellidos: string | null; 
  activo: boolean;
  bloqueado: boolean;
  roles?: Rol; 

}