package com.ordergo.backend.auth.services;

public interface RenovarPasswordService {
    void solicitarRestablecimientoDeContrasena(String email);

    void cambiarContrasena(String token, String nuevaContrasena);


}
