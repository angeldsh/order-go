package com.ordergo.backend.auth.services.impl;


import com.ordergo.backend.auth.models.Rol;
import com.ordergo.backend.auth.models.RolEnum;
import com.ordergo.backend.auth.repository.RolRepository;
import com.ordergo.backend.auth.services.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class RolServiceImpl implements RolService {
    @Autowired
    private RolRepository rolRepository;

    @Override
    public List<Rol> findAll() {
        return rolRepository.findAll();
    }

    @Override
    public Rol findById(Long id) {
        return rolRepository.findById(id).orElse(null);
    }

    @Override
    public Rol save(Rol rol) {
        return rolRepository.save(rol);
    }

    @Override
    public void deleteById(Long id) {
        rolRepository.deleteById(id);
    }

    @Override
    public Rol getByName(RolEnum roleCliente) {
        return rolRepository.getByName(roleCliente);
    }
}
