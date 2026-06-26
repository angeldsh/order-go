package com.ordergo.backend.auth.repository;

import com.ordergo.backend.auth.models.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    Cliente findByUsuarioId(Long userId);
}
