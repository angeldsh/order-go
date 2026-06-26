package com.ordergo.backend.api;

import com.ordergo.backend.model.entity.Mesa;
import com.ordergo.backend.model.entity.Ticket;
import com.ordergo.backend.service.MesasService;
import com.ordergo.backend.service.TicketsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/mesas")
public class MesaRestController {
    @Autowired
    private MesasService mesaService;
    @Autowired
    private TicketsService ticketService;

    @GetMapping("")
    public ResponseEntity<?> getAll() {
        try {
            return ResponseEntity.ok(mesaService.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al obtener las mesas");
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getMesaById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(mesaService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al obtener la mesa");
        }
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> createMesa(@RequestBody Mesa mesa) {
        try {
            return ResponseEntity.ok(mesaService.save(mesa));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear la mesa");
        }
    }

    @PutMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateMesa(@RequestBody Mesa mesa) {
        try {

            return ResponseEntity.ok(mesaService.save(mesa));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar la mesa");
        }
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteMesa(@PathVariable Long id) {
        List<Ticket> ticket = ticketService.findByMesaId(id);
        if (!ticket.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "No se puede eliminar la mesa porque tiene tickets asociados");
        }
        mesaService.deleteById(id);
    }
}
