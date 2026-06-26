package com.ordergo.backend.auth.services.impl;

import com.ordergo.backend.auth.models.RenovarPassword;
import com.ordergo.backend.auth.models.Usuario;
import com.ordergo.backend.auth.repository.RenovarPasswordRepository;
import com.ordergo.backend.auth.repository.UsuariosRepository;
import com.ordergo.backend.auth.services.RenovarPasswordService;
import com.ordergo.backend.email.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Optional;

@Service
public class RenovarPasswordServiceImpl implements RenovarPasswordService {
    @Autowired
    private RenovarPasswordRepository renovarPasswordRepository;
    @Autowired
    private UsuariosRepository usuarioRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private PasswordEncoder passwordEncoder;


    @Transactional
    @Override
    public void solicitarRestablecimientoDeContrasena(String email) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(email);
        if (!usuarioOptional.isPresent()) {
            throw new RuntimeException("No existe un usuario con el email proporcionado.");
        }

        Usuario usuario = usuarioOptional.get();
        String codigo = generarCodigo();

        RenovarPassword renovarPassword = new RenovarPassword();
        renovarPassword.setEmail(email);
        renovarPassword.setCodigo(codigo);
        renovarPassword.setUsuario(usuario);

        renovarPasswordRepository.save(renovarPassword);


        enviarEmailDeRestablecimiento(email, codigo);
    }

    private String generarCodigo() {
        SecureRandom random = new SecureRandom();
        int numero = random.nextInt(999999);
        return String.format("%06d", numero); // Ensures the code has 6 digits
    }

    private void enviarEmailDeRestablecimiento(String email, String resetLink) {
        String subject = "Restablecimiento de contraseña";
        String text = "Este es el código generado para restablecer su contraseña: " + resetLink;
        emailService.sendSimpleMessage(email, subject, text);
    }

    @Override
    @Transactional
    public void cambiarContrasena(String token, String nuevaContrasena) {
        RenovarPassword renovarPassword = (RenovarPassword) renovarPasswordRepository.findByCodigo(token)
                .orElseThrow(() -> new RuntimeException("Token no válido"));
        Usuario usuario = renovarPassword.getUsuario();

        String contrasenaEncriptada = passwordEncoder.encode(nuevaContrasena);

        usuario.setPassword(contrasenaEncriptada);
        usuarioRepository.save(usuario);

        renovarPasswordRepository.delete(renovarPassword);
    }
}
