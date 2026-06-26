package com.ordergo.backend.service;

import com.ordergo.backend.auth.models.Cliente;
import com.ordergo.backend.model.entity.Direccion;
import com.ordergo.backend.model.entity.Pedido;
import com.ordergo.backend.model.entity.Ticket;

import java.util.List;

public interface PedidosService {
    List<Pedido> findAll();

    Pedido save(Pedido pedido);

    Pedido actualizarEstadoPedido(Long pedidoId, String nuevoEstado);

    Pedido findById(Long pedidoId);

    List<Pedido> findByCliente(Cliente cliente);

    List<Pedido> findByTicketId(Long ticketId);

    Long deletePedidosByTicketId(Long id);

    List<Pedido> findByTicket(Ticket ticket);

    List<Pedido> findByDireccion(Direccion direccion);

    void delete(Pedido pedido);
}
