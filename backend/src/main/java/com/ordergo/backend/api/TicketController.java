package com.ordergo.backend.api;

import com.ordergo.backend.model.entity.Mesa;
import com.ordergo.backend.model.entity.Pedido;
import com.ordergo.backend.model.entity.Ticket;
import com.ordergo.backend.model.entity.TicketStatus;
import com.ordergo.backend.service.DetallesPedidosService;
import com.ordergo.backend.service.MesasService;
import com.ordergo.backend.service.PedidosService;
import com.ordergo.backend.service.TicketsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketsService ticketService;

    @Autowired
    private MesasService mesaService;

    @Autowired
    private PedidosService pedidoService;

    @Autowired
    private DetallesPedidosService detallePedidoService;


    @GetMapping("")
    public List<Ticket> getAll() {
        List<Ticket> tickets = ticketService.findAll();
        return tickets;
    }

    @GetMapping("/open")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_EMPLEADO')")
    public List<Ticket> getOpenTickets() {
        List<Ticket> tickets = ticketService.findOpenTickets();
        return tickets;
    }


    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_EMPLEADO')")
    public Ticket createNewTicket(@RequestParam Long numMesa) {
        Mesa mesa = (Mesa) mesaService.findByNum(numMesa);

        if (mesa == null) {
            return null;
        }
        List<Ticket> tickets = ticketService.findByMesa(mesa);
        if (!tickets.isEmpty()) {
            for (Ticket existingTicket : tickets) {
                if (existingTicket.getStatus().equals(TicketStatus.ACTIVO)) {
                    return null;
                }
            }
        }
        return ticketService.createNewTicket(mesa);
    }

    @PostMapping("/close")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_EMPLEADO')")
    public ResponseEntity<?> closeTickets(@RequestParam Long numMesa) {
        Mesa mesa = (Mesa) mesaService.findByNum(numMesa);
        if (mesa != null) {
            List<Ticket> tickets = ticketService.findByMesa(mesa);
            if (!tickets.isEmpty()) {
                for (Ticket ticket : tickets) {
                    if (todosLosPedidosCompletados(ticket)) {
                        ticket.setStatus(TicketStatus.CERRADO);
                        ticketService.save(ticket);
                    } else {
                        return ResponseEntity.status(HttpStatus.CONFLICT).build();
                    }
                }
                return ResponseEntity.status(HttpStatus.OK).build();
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }


    @GetMapping("/{ticketId}")
    public String getTicketAccessCode(@PathVariable Long ticketId) {
        Ticket ticket = ticketService.findTicketById(ticketId);
        return ticket.getCodigoAcceso();
    }

    @GetMapping("/codigo/{codigoAcceso}")
    public ResponseEntity<?> getTicketByAccessCode(@PathVariable String codigoAcceso) {
        Ticket ticket = ticketService.findByAccessCode(codigoAcceso);
        if (ticket != null) {
            return ResponseEntity.ok(ticket);
        } else {
            return ResponseEntity.badRequest().body("Ticket no encontrado");
        }
    }

    @GetMapping("/validate/{codigoAcceso}")
    public ResponseEntity<Boolean> validateTicketAccessCode(@PathVariable String codigoAcceso) {
        boolean isValid = ticketService.validateTicketAccessCode(codigoAcceso);
        if (isValid) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }
    }


    private boolean todosLosPedidosCompletados(Ticket ticket) {
        List<Pedido> pedidos = pedidoService.findByTicket(ticket);
        for (Pedido pedido : pedidos) {
            if (!pedido.getEstado().equals("completado")) {
                return false;
            }
        }
        return true;
    }
}
