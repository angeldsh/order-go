package com.ordergo.backend.service;

import com.ordergo.backend.model.entity.DetallePedido;
import com.ordergo.backend.model.entity.Producto;

import java.util.List;

public interface DetallesPedidosService {
    List<DetallePedido> findAll();

    DetallePedido save(DetallePedido detallesPedidos);

    void saveAll(List<DetallePedido> detallesPedidos);

    List<DetallePedido> findByPedidoId(Long pedidoId);


    Long deleteDetallesByPedidoId(Long id);

    DetallePedido findByProducto(Producto producto);
}
