package com.ordergo.backend.api;

import com.ordergo.backend.model.entity.Categoria;
import com.ordergo.backend.model.entity.DetallePedido;
import com.ordergo.backend.model.entity.Producto;
import com.ordergo.backend.service.CategoriasService;
import com.ordergo.backend.service.DetallesPedidosService;
import com.ordergo.backend.service.ProductosService;
import com.ordergo.backend.uploadFile.UploadFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/productos")
public class ProductosRestController {
    @Autowired
    private ProductosService productosService;
    @Autowired
    private UploadFileService uploadFileService;
    @Autowired
    private CategoriasService categoriasService;
    @Autowired
    private DetallesPedidosService detallePedidosService;


    @GetMapping("")
    public List<Producto> getAll() {
        List<Producto> productos = productosService.findAll();
        return productos;
    }

    @GetMapping("/{id}")
    public Producto getOne(@PathVariable Long id) {
        Producto producto = productosService.findById(id);
        return producto;
    }


    @GetMapping("/foto/{id}")
    public ResponseEntity<Resource> getFoto(@PathVariable Long id) {
        Producto producto = productosService.findById(id);

        if (producto == null || producto.getImagen() == null || producto.getImagen().isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        try {
            Categoria categoria = producto.getCategoria();
            Map<String, String> items = new HashMap<>();
            items.put("type", "productos");
            items.put("productId", String.valueOf(producto.getId()));
            items.put("categoria", categoria.getNombre());
            Resource imageResource = uploadFileService.load("productos", items, producto.getImagen());

            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(imageResource);
        } catch (MalformedURLException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> save(Producto producto, @RequestParam("file_imagen") MultipartFile imagen) {
        try {
            System.out.println("Producto: " + producto);
            productosService.save(producto);
            productosService.saveImagen(producto, imagen);
            productosService.save(producto);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(producto);
        } catch (Exception ex) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Producto no guardado");
        }
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> update(@PathVariable Long id,
                                    Producto producto,
                                    @RequestParam(value = "file_imagen", required = false) MultipartFile imagen) {
        try {
            if (imagen != null) {

                String imagenOld = producto.getImagen();
                producto = productosService.update(id, producto, imagen);

                uploadFileService.delete("productos", Map.of("productId", String.valueOf(id)), imagenOld);
            } else {
                producto = productosService.update(id, producto, null);
            }

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(producto);
        } catch (Exception ex) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Producto no actualizado");
        }
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            Producto producto = productosService.findById(id);
            List <DetallePedido> detallePedido = detallePedidosService.findByPedidoId(producto.getId());
            if (!detallePedido.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("Producto no eliminado, tiene detalles de pedido asociados");
            }

            productosService.delete(producto);
            return ResponseEntity.ok().build();
        } catch (Exception ex) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Producto no eliminado");
        }
    }

    @GetMapping("/categorias")
    public List<Categoria> getCategorias() {
        List<Categoria> categorias = categoriasService.findAll();
        return categorias;
    }

}

