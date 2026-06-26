package com.ordergo.backend.model.repository;


import com.ordergo.backend.model.entity.Mesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MesaRepository extends JpaRepository<Mesa, Long> {

    Object findByNumero(Long numero);
}
