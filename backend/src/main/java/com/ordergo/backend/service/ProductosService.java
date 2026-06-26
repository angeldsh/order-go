package com.ordergo.backend.service;

import com.ordergo.backend.model.entity.Categoria;
import com.ordergo.backend.model.entity.Producto;

import org.springframework.web.multipart.MultipartFile;


import java.util.List;

public interface ProductosService {
    List<Producto> findAll();

    Producto save(Producto producto);

    void delete(Producto producto);

    void saveImagen(Producto producto, MultipartFile fichero);

    Producto findById(Long id);

    Producto update(Long id, Producto productoActualizado, MultipartFile nuevaImagen);

    List <Producto> findByCategoria(Categoria categoria);
}
