package com.ordergo.backend.auth.services;

import com.ordergo.backend.auth.models.Cliente;

import java.util.List;

public interface ClientesService {
    List<Cliente> findAll();

    Cliente save(Cliente cliente);

    Cliente findById(Long clienteId);

    void delete(Cliente cliente);
}
