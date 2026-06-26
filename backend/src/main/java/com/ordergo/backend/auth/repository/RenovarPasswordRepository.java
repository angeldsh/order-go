package com.ordergo.backend.auth.repository;

import com.ordergo.backend.auth.models.RenovarPassword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RenovarPasswordRepository extends JpaRepository<RenovarPassword, Long> {

    Optional<Object> findByCodigo(String token);
}
