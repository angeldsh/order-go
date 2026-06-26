package com.ordergo.backend.model.repository;


import com.ordergo.backend.model.entity.Mesa;
import com.ordergo.backend.model.entity.Ticket;
import com.ordergo.backend.model.entity.TicketStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    List<Ticket>  findByMesaId(Long mesaId);

    Ticket findByCodigoAcceso(String codigoAcceso);

    List <Ticket> findByMesa(Mesa mesa);

    List<Ticket> findByStatus(TicketStatus ticketStatus);
}







