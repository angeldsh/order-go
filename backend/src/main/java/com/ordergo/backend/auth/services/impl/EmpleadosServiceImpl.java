package com.ordergo.backend.auth.services.impl;

import com.ordergo.backend.auth.models.Cliente;
import com.ordergo.backend.auth.models.Empleado;
import com.ordergo.backend.auth.repository.ClienteRepository;
import com.ordergo.backend.auth.repository.EmpleadoRepository;
import com.ordergo.backend.auth.services.ClientesService;
import com.ordergo.backend.auth.services.EmpleadosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EmpleadosServiceImpl implements EmpleadosService {
    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Empleado> findAll() {
        return empleadoRepository.findAll();
    }

    @Override
    @Transactional
    public Empleado save(Empleado empleado) {
        return empleadoRepository.save(empleado);
    }

    @Override
    @Transactional
    public Empleado findById(Long empleadoId) {
        return empleadoRepository.findById(empleadoId).orElse(null);
    }

    @Transactional
    @Override
    public void delete(Empleado empleado) {
        empleadoRepository.delete(empleado);
    }

}
