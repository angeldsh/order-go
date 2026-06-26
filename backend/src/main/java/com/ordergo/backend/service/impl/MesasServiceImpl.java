package com.ordergo.backend.service.impl;


import com.ordergo.backend.model.entity.Mesa;
import com.ordergo.backend.model.repository.MesaRepository;
import com.ordergo.backend.service.MesasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MesasServiceImpl implements MesasService {
    @Autowired
    private MesaRepository mesaRepository;


    @Override
    @Transactional(readOnly = true)
    public List<Mesa> findAll() {
        return mesaRepository.findAll();
    }

    @Override
    @Transactional
    public Mesa save(Mesa mesa) {
        return mesaRepository.save(mesa);
    }

    @Override
    @Transactional
    public Object findById(Long id) {
        return mesaRepository.findById(id);
    }

    @Override
    public Object findByNum(Long numero) {
        return mesaRepository.findByNumero(numero);
    }

    @Override
    public void deleteById(Long id) {
        mesaRepository.deleteById(id);
    }
}
