package com.ordergo.backend.auth.controllers;

import com.ordergo.backend.auth.jwt.JwtUtils;
import com.ordergo.backend.auth.models.*;
import com.ordergo.backend.auth.payload.request.LoginRequest;
import com.ordergo.backend.auth.payload.response.JwtResponse;
import com.ordergo.backend.auth.repository.ClienteRepository;
import com.ordergo.backend.auth.repository.RolRepository;
import com.ordergo.backend.auth.repository.UsuariosRepository;
import com.ordergo.backend.auth.services.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UsuariosRepository userRepository;

    @Autowired
    RolRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private RenovarPasswordService renovarPasswordService;

    @Autowired
    private ClientesService clientesService;

    @Autowired
    private UsuariosService usuariosService;

    @Autowired
    private RolService rolService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtils jwtUtils;

    @GetMapping("/user")
    public UserDetailsImpl getUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userDetails;
    }

    @GetMapping("/clienteId")
    public Long getClienteId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof UserDetailsImpl) {
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Long userId = userDetails.getId();

            Cliente cliente = clienteRepository.findByUsuarioId(userId);

            Long clienteId = cliente != null ? cliente.getId() : null;

            return clienteId;
        } else {
            return null;
        }
    }

    @GetMapping("/usuario")
    public Usuario getUsuario() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetailsImpl) {
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Long userId = userDetails.getId();

            Usuario usuario = userRepository.findById(userId).orElse(null);

            return usuario;
        } else {
            return null;
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Void> solicitarRestablecimientoDeContrasena(@RequestParam String email) {
        renovarPasswordService.solicitarRestablecimientoDeContrasena(email);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reset-password/confirm")
    public ResponseEntity<Void> cambiarContrasena(@RequestParam String codigo, @RequestParam String password) {
        renovarPasswordService.cambiarContrasena(codigo, password);
        return ResponseEntity.ok().build();
    }

    @PostMapping("signup")
    public ResponseEntity<?> crearCliente(@RequestBody Cliente cliente) {
        if (cliente.getUsuario() == null) {
            return ResponseEntity.badRequest().body("El cliente debe tener un usuario asociado.");
        }

        Usuario usuario = cliente.getUsuario();

        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));

        Rol rolCliente = rolService.getByName(RolEnum.ROLE_CLIENTE);
        if (rolCliente == null) {
            return ResponseEntity.badRequest().body("El rol de cliente no existe.");
        }
        usuario.getRoles().add(rolCliente);

        Usuario usuarioGuardado = usuariosService.save(usuario);

        cliente.setUsuario(usuarioGuardado);

        Cliente clienteGuardado = clientesService.save(cliente);

        return ResponseEntity.ok(clienteGuardado);
    }


}
