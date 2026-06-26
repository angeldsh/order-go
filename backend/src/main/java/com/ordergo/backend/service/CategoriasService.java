package com.ordergo.backend.service;


import com.ordergo.backend.model.entity.Categoria;

import java.util.List;

public interface CategoriasService {
    List<Categoria> findAll();

    Categoria save(Categoria categoria);

    Categoria findById(Long id);

    void delete(Categoria categoria);
}
