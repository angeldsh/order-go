import { Categoria } from "./categoria.interface";

export interface Producto {
  id: number;
  categoria: Categoria;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  cantidad: number;
  categoriaId: number;
  imagenCargada: boolean;
}
