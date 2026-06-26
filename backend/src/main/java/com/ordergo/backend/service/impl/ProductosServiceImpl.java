package com.ordergo.backend.service.impl;

import com.ordergo.backend.model.entity.Categoria;
import com.ordergo.backend.model.entity.Producto;
import com.ordergo.backend.model.repository.ProductoRepository;
import com.ordergo.backend.service.CategoriasService;
import com.ordergo.backend.service.ProductosService;
import com.ordergo.backend.uploadFile.UploadFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.ordergo.backend.model.entity.Producto;
import com.ordergo.backend.model.repository.ProductoRepository;
import com.ordergo.backend.service.ProductosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class ProductosServiceImpl implements ProductosService {
    @Autowired
    private ProductoRepository productosRepository;

    @Autowired
    private UploadFileService uploadFileService;
    @Autowired
    private CategoriasService categoriasService;


    @Override
    @Transactional(readOnly = true)
    public List<Producto> findAll() {
        return productosRepository.findAll();
    }

    @Override
    @Transactional
    public Producto save(Producto producto) {
        return productosRepository.save(producto);
    }

    @Override
    public void delete(Producto producto) {
        if (producto.getImagen() != null && !producto.getImagen().isEmpty()) {
            Categoria categoria = categoriasService.findById(producto.getCategoria().getId());
            Map data = new HashMap() {{
                put("categoria", categoria.getNombre());
            }};
            uploadFileService.delete("productos", data, producto.getImagen());
        }
        productosRepository.delete(producto);

    }

    @Override
    @Transactional
    public void saveImagen(Producto producto, MultipartFile fichero) {
        if (!fichero.isEmpty()) {
            Categoria categoria = categoriasService.findById(producto.getCategoria().getId());
            Map data = new HashMap() {{
                put("categoria", categoria.getNombre());
            }};
            if (producto.getId() != null && producto.getId() > 0 && producto.getImagen() != null
                    && producto.getImagen().length() > 0) {
                uploadFileService.delete("productos", data, producto.getImagen());
            }
            String uniqueFilename = null;
            try {
                uniqueFilename = uploadFileService.copy("productos", data, fichero);
            } catch (IOException e) {
                e.printStackTrace();
            }
            producto.setImagen(uniqueFilename);
        }
    }

    @Override
    @Transactional
    public Producto findById(Long id) {
        Optional<Producto> productoOptional = productosRepository.findById(id);
        return productoOptional.orElse(null);
    }

    @Override
    @Transactional
    public Producto update(Long id, Producto productoActualizado, MultipartFile nuevaImagen) {
        Producto productoExistente = findById(id);
        if (productoExistente == null) {
            throw new RuntimeException("No se encontró el producto con el ID: " + id);
        }


        if (productoActualizado != null) {
            if (productoActualizado.getNombre() != null) {
                productoExistente.setNombre(productoActualizado.getNombre());
            }
            if (productoActualizado.getDescripcion() != null) {
                productoExistente.setDescripcion(productoActualizado.getDescripcion());
            }
            if (productoActualizado.getPrecio() > 0) {
                productoExistente.setPrecio(productoActualizado.getPrecio());
            }
            if (productoActualizado.getCategoria() != null) {
                productoExistente.setCategoria(productoActualizado.getCategoria());
            }
            if (nuevaImagen != null && !nuevaImagen.isEmpty()) {
                this.saveImagen(productoExistente, nuevaImagen);
            }
        }

        return save(productoExistente);
    }

    @Override
    public List <Producto> findByCategoria(Categoria categoria) {
        return productosRepository.findByCategoria(categoria);
    }


}



