package com.ordergo.backend.api;

import com.ordergo.backend.model.entity.Categoria;
import com.ordergo.backend.model.entity.Producto;
import com.ordergo.backend.service.CategoriasService;
import com.ordergo.backend.service.ProductosService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/categorias")
public class CategoriasRestController {

    @Autowired
    private CategoriasService categoriasService;
    @Autowired
    private ProductosService productoService;

    @PutMapping("/{categoriaId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> actualizarCategoria(@PathVariable Long categoriaId, @RequestBody Categoria categoria) {
        Categoria categoriaExistente = categoriasService.findById(categoriaId);
        if (categoriaExistente == null) {
            return ResponseEntity.notFound().build();
        }
        BeanUtils.copyProperties(categoria, categoriaExistente, getNullPropertyNames(categoria));
        Categoria categoriaGuardada = categoriasService.save(categoriaExistente);
        return ResponseEntity.ok(categoriaGuardada);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> crearCategoria(@RequestBody Categoria categoria) {
        Categoria categoriaGuardada = categoriasService.save(categoria);
        return ResponseEntity.ok(categoriaGuardada);
    }

    @DeleteMapping("/{categoriaId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> eliminarCategoria(@PathVariable Long categoriaId) {
        Categoria categoria = categoriasService.findById(categoriaId);
        List <Producto>  productos = productoService.findByCategoria(categoria);
        if (!productos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("No se puede eliminar la categoría porque tiene productos asociados");
        }
        if (categoria == null) {
            return ResponseEntity.notFound().build();
        }
        categoriasService.delete(categoria);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("")
    public List<Categoria> getAll() {
        List<Categoria> categorias = categoriasService.findAll();
        return categorias;
    }

    @GetMapping("/{categoriaId}")
    public Categoria getCategoria(@PathVariable Long categoriaId) {
        Categoria categoria = categoriasService.findById(categoriaId);
        return categoria;
    }

    private String[] getNullPropertyNames(Object source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();

        Set<String> emptyNames = new HashSet<>();
        for (java.beans.PropertyDescriptor pd : pds) {
            Object srcValue = src.getPropertyValue(pd.getName());
            if (srcValue == null) emptyNames.add(pd.getName());
        }
        String[] result = new String[emptyNames.size()];
        return emptyNames.toArray(result);
    }
}
