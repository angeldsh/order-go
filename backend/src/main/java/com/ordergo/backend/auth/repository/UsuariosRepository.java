package com.ordergo.backend.auth.repository;

import com.ordergo.backend.auth.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UsuariosRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsername(String username);

    Boolean existsByEmail(String email);

    Optional<Usuario> findByEmail(String email);
}
