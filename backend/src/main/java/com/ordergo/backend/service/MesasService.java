package com.ordergo.backend.service;

import com.ordergo.backend.model.entity.Mesa;

import java.util.List;

public interface MesasService {
    List<Mesa> findAll();

    Mesa save(Mesa mesa);

    Object findById(Long id);

    Object findByNum(Long numero);


    void deleteById(Long id);
}
