package com.ordergo.backend.auth.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/keep-alive")
    public String keepAlive() {
        try {
            jdbcTemplate.execute("SELECT * FROM productos");
            jdbcTemplate.execute("SELECT * FROM categorias");
            jdbcTemplate.execute("SELECT * FROM roles");
            jdbcTemplate.execute("SELECT * FROM usuarios");
            jdbcTemplate.execute("SELECT p.id, p.nombre, p.precio, c.nombre as categoria FROM productos p JOIN categorias c ON p.categoria_id = c.id");
            
            return "OK - Supabase activity registered";
        } catch (Exception e) {
            return "Error maintaining keep-alive: " + e.getMessage();
        }
    }

    @GetMapping("/all")
    public String allAccess() {
        return "Acceso público";
    }

    @GetMapping("/cliente")
    @PreAuthorize("hasRole('CLIENTE') or hasRole('EMPLEADO')")
    public String userAccess() {
        return "Acceso a usuarios y empleados";
    }

    @GetMapping("/empleado")
    @PreAuthorize("hasRole('EMPLEADO')")
    public String empleadoAccess() {
        return "Acceso de empleado.";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {
        return "Acceso de administrador";
    }
}
