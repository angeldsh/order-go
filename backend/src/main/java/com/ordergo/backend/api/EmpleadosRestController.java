package com.ordergo.backend.api;

import com.ordergo.backend.auth.models.*;
import com.ordergo.backend.auth.services.EmpleadosService;
import com.ordergo.backend.auth.services.RolService;
import com.ordergo.backend.auth.services.UsuariosService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/empleados")
public class EmpleadosRestController {
    @Autowired
    private EmpleadosService empleadosService;
    @Autowired
    private UsuariosService usuariosService;
    @Autowired
    private RolService rolService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PutMapping("/{empleadoId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> actualizarEmpleado(@PathVariable Long empleadoId, @RequestBody Empleado empleado) {
        Empleado empleadoExistente = empleadosService.findById(empleadoId);
        if (empleadoExistente == null) {
            return ResponseEntity.notFound().build();
        }

        Usuario usuarioExistente = empleadoExistente.getUsuario();
        Usuario usuarioNuevo = empleado.getUsuario();

        if (usuarioExistente != null && usuarioNuevo != null) {
            if (StringUtils.hasText(usuarioNuevo.getPassword())) {
                usuarioExistente.setPassword(passwordEncoder.encode(usuarioNuevo.getPassword()));
            } else {
                BeanUtils.copyProperties(usuarioNuevo, usuarioExistente, getNullPropertyNames(usuarioNuevo, "password"));
            }
        }
        BeanUtils.copyProperties(empleado, empleadoExistente, getNullPropertyNames(empleado));

        empleadosService.save(empleadoExistente);
        if (usuarioExistente != null) {
            usuariosService.save(usuarioExistente);
        }

        return ResponseEntity.ok(empleadoExistente);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> crearEmpleado(@RequestBody Empleado empleado) {
        if (empleado.getUsuario() == null) {
            return ResponseEntity.badRequest().body("El empleado debe tener un usuario asociado.");
        }

        Usuario usuario = empleado.getUsuario();

        Rol rolEmpleado = rolService.getByName(RolEnum.ROLE_EMPLEADO);
        if (rolEmpleado == null) {
            return ResponseEntity.badRequest().body("El rol de empleado no existe.");
        }
        usuario.getRoles().add(rolEmpleado);

        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        Usuario usuarioGuardado = usuariosService.save(usuario);
        empleado.setUsuario(usuarioGuardado);
        Empleado empleadoGuardado = empleadosService.save(empleado);

        return ResponseEntity.ok(empleadoGuardado);
    }

    private String[] getNullPropertyNames(Object source, String... excludeProperties) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();

        Set<String> emptyNames = new HashSet<>();
        for (java.beans.PropertyDescriptor pd : pds) {
            Object srcValue = src.getPropertyValue(pd.getName());
            if (srcValue == null) emptyNames.add(pd.getName());
        }
        Collections.addAll(emptyNames, excludeProperties);
        String[] result = new String[emptyNames.size()];
        return emptyNames.toArray(result);
    }

    @DeleteMapping("/{empleadoId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> eliminarEmpleado(@PathVariable Long empleadoId) {
        Empleado empleado = empleadosService.findById(empleadoId);
        if (empleado == null) {
            return ResponseEntity.notFound().build();
        }

        empleadosService.delete(empleado);
        usuariosService.delete(empleado.getUsuario());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("")
    public List<Empleado> getAll() {
        List<Empleado> empleados = empleadosService.findAll();
        return empleados;
    }

    @GetMapping("/{empleadoId}")
    public Empleado getEmpleado(@PathVariable Long empleadoId) {
        Empleado empleado = empleadosService.findById(empleadoId);
        return empleado;
    }

    @GetMapping("/verificar-username/{username}")
    public boolean verificarUsername(@PathVariable String username) {
        return usuariosService.findByUsername(username).isPresent();
    }

    @GetMapping("/verificar-email/{email}")
    public boolean verificarEmail(@PathVariable String email) {
        return usuariosService.findByEmail(email);
    }


}
