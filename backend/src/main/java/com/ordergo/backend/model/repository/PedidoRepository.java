package com.ordergo.backend.model.repository;


import com.ordergo.backend.auth.models.Cliente;
import com.ordergo.backend.model.entity.Direccion;
import com.ordergo.backend.model.entity.Pedido;
import com.ordergo.backend.model.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    List<Pedido> findByCliente(Cliente cliente);

    List<Pedido> findByTicketId(Long ticketId);

    Long deletePedidosByTicketId(Long id);

    List<Pedido> findByTicket(Ticket ticket);

    List<Pedido> findByDireccion(Direccion direccion);
}
