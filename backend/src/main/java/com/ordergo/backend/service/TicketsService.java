package com.ordergo.backend.service;

import com.ordergo.backend.model.entity.Mesa;
import com.ordergo.backend.model.entity.Ticket;

import java.util.List;

public interface TicketsService {
    List<Ticket> findAll();

    Ticket save(Ticket pedidoMesa);

    List<Ticket> findByMesaId(Long mesaId);

    Ticket createNewTicket(Mesa mesa);

    String generateUniqueAccessCode();

    Ticket findTicketById(Long ticketId);

    boolean validateTicketAccessCode(String codigoAcceso);

    List <Ticket> findByMesa(Mesa mesa);

    void delete(Ticket ticket);

    Ticket findByAccessCode(String codigoAcceso);

    List<Ticket> findOpenTickets();

}
