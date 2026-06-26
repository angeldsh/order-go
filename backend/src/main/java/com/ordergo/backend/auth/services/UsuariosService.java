package com.ordergo.backend.auth.services;

import com.ordergo.backend.auth.models.Usuario;

import java.util.List;
import java.util.Optional;

public interface UsuariosService {
    Optional<Usuario> findByUsername(String username);

    List<Usuario> findAll();

    Usuario save(Usuario usuario);

    void delete(Usuario usuario);

    Boolean findByEmail(String email);
}
