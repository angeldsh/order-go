package com.ordergo.backend.service;

import com.ordergo.backend.model.entity.Direccion;

import java.util.List;

public interface DireccionesService {
    List<Direccion> findAll();

    Direccion save(Direccion direccion);

    List<Direccion> findByClienteId(Long clienteId);

    Direccion findById(Long direccionId);

    void deleteById(Long direccionId);
}
