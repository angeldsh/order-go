import { Pedido } from "./pedido.interface";
import { Producto } from "./producto.interface";

export interface DetallePedido {
  id?: number;
  cantidad: number;
  precio: number;
  producto: Producto;
  pedido: Pedido;
}
