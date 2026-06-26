package com.ordergo.backend.service.impl;

import com.ordergo.backend.model.entity.Categoria;
import com.ordergo.backend.model.repository.CategoriaRepository;
import com.ordergo.backend.service.CategoriasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoriasServiceImpl implements CategoriasService {
    @Autowired
    private CategoriaRepository categoriaRepository;


    @Override
    @Transactional(readOnly = true)
    public List<Categoria> findAll() {
        return categoriaRepository.findAll();
    }

    @Override
    @Transactional
    public Categoria save(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    @Transactional(readOnly = true)
    @Override
    public Categoria findById(Long id) {
        return categoriaRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(Categoria categoria) {
        categoriaRepository.delete(categoria);
    }


}
