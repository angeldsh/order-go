package com.ordergo.backend.auth.services;

import com.ordergo.backend.auth.models.Rol;
import com.ordergo.backend.auth.models.RolEnum;

import java.util.List;

public interface RolService {
    List<Rol> findAll();

    Rol findById(Long id);

    Rol save(Rol rol);

    void deleteById(Long id);

    Rol getByName(RolEnum roleCliente);
}

