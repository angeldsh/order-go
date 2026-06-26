package com.ordergo.backend.api;

import com.ordergo.backend.auth.models.Cliente;
import com.ordergo.backend.auth.services.ClientesService;
import com.ordergo.backend.model.entity.Pedido;
import com.ordergo.backend.model.entity.Ticket;
import com.ordergo.backend.service.DetallesPedidosService;
import com.ordergo.backend.service.TicketsService;
import com.ordergo.backend.service.PedidosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/pedidos")
public class PedidosRestController {
    @Autowired
    private PedidosService pedidosService;

    @Autowired
    private ClientesService clientesService;

    @Autowired
    private TicketsService ticketService;

    @Autowired
    private DetallesPedidosService detallePedidoService;

    @GetMapping("")
    public List<Pedido> getAll() {
        List<Pedido> pedidos = pedidosService.findAll();
        return pedidos;
    }

    @PutMapping("/{pedidoId}/estado/{nuevoEstado}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_EMPLEADO')")
    public ResponseEntity<?> actualizarEstadoPedido(@PathVariable Long pedidoId, @PathVariable String nuevoEstado) {
        try {
            Pedido pedidoActualizado = pedidosService.actualizarEstadoPedido(pedidoId, nuevoEstado);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(pedidoActualizado);
        } catch (Exception ex) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Error al actualizar el estado del pedido");
        }
    }

    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<?> obtenerPedidosPorCliente(@PathVariable Long clienteId) {
        Cliente cliente = clientesService.findById(clienteId);
        if (cliente != null) {
            List<Pedido> pedidos = pedidosService.findByCliente(cliente);
            return ResponseEntity.status(HttpStatus.OK).body(pedidos);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente no encontrado");
        }
    }

    @GetMapping("/mesa/{codigoMesa}")
    public ResponseEntity<?> obtenerPedidosPorMesa(@PathVariable String codigoMesa) {

        Ticket ticket = ticketService.findByAccessCode(codigoMesa);
        List<Pedido> pedidos = pedidosService.findByTicketId(ticket.getId());

        return ResponseEntity.status(HttpStatus.OK).body(pedidos);
    }

    @PostMapping("")
    public ResponseEntity<?> save(@RequestBody Pedido pedido) {
        try {
            Date fechaActual = new Date();

            if (pedido.getFecha() == null)
                pedido.setFecha(fechaActual);
            if (pedido.getEstado() == null)
                pedido.setEstado("preparando");

            pedidosService.save(pedido);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(pedido);
        } catch (Exception ex) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Pedido no guardado");
        }
    }

    @GetMapping("/{pedidoId}")
    public ResponseEntity<?> getPedido(@PathVariable Long pedidoId) {
        Pedido pedido = pedidosService.findById(pedidoId);
        if (pedido != null) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(pedido);
        } else {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Pedido no encontrado");
        }
    }

    @DeleteMapping("/{pedidoId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void delete(@PathVariable Long pedidoId) {
        try {
            Pedido pedido = pedidosService.findById(pedidoId);
            if (pedido == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Pedido no encontrado");
            }
            if (!pedido.getEstado().equals("completado")) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No se puede eliminar un pedido que no está completado");
            }
            detallePedidoService.deleteDetallesByPedidoId(pedidoId);
            pedidosService.delete(pedido);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error al eliminar el pedido", ex);
        }
    }

}
