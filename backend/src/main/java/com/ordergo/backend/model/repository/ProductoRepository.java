package com.ordergo.backend.model.repository;


import com.ordergo.backend.model.entity.Categoria;
import com.ordergo.backend.model.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    List<Producto> findByCategoria(Categoria categoria);
}
