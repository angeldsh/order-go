package com.ordergo.backend.auth.services;

import com.ordergo.backend.auth.models.Empleado;

import java.util.List;

public interface EmpleadosService {
    List<Empleado> findAll();

    Empleado save(Empleado empleado);

    Empleado findById(Long empleadoId);

    void delete(Empleado empleado);
}
