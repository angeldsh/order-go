package com.ordergo.backend.service.impl;

import com.ordergo.backend.model.entity.Categoria;
import com.ordergo.backend.model.entity.Producto;
import com.ordergo.backend.model.repository.ProductoRepository;
import com.ordergo.backend.service.CategoriasService;
import com.ordergo.backend.uploadFile.UploadFileService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductosServiceImplTest {

    @Mock
    private ProductoRepository productosRepository;

    @Mock
    private UploadFileService uploadFileService;

    @Mock
    private CategoriasService categoriasService;

    @InjectMocks
    private ProductosServiceImpl productosService;

    @Captor
    private ArgumentCaptor<Producto> productoCaptor;

    private Producto productoMock;
    private Categoria categoriaMock;

    @BeforeEach
    void setUp() {
        categoriaMock = new Categoria();
        categoriaMock.setId(1L);
        categoriaMock.setNombre("Starters");

        productoMock = new Producto();
        productoMock.setId(1L);
        productoMock.setNombre("Test Croquettes");
        productoMock.setPrecio(8.5);
        productoMock.setCategoria(categoriaMock);
    }

    @Test
    void findAll_ShouldReturnProductList() {
        // Arrange
        when(productosRepository.findAll()).thenReturn(Arrays.asList(productoMock));

        // Act
        List<Producto> result = productosService.findAll();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Test Croquettes", result.get(0).getNombre());
        verify(productosRepository, times(1)).findAll();
    }

    @Test
    void findById_WhenProductExists_ShouldReturnProduct() {
        // Arrange
        when(productosRepository.findById(1L)).thenReturn(Optional.of(productoMock));

        // Act
        Producto result = productosService.findById(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Test Croquettes", result.getNombre());
        verify(productosRepository, times(1)).findById(1L);
    }

    @Test
    void findById_WhenProductDoesNotExist_ShouldReturnNull() {
        // Arrange
        when(productosRepository.findById(99L)).thenReturn(Optional.empty());

        // Act
        Producto result = productosService.findById(99L);

        // Assert
        assertNull(result);
        verify(productosRepository, times(1)).findById(99L);
    }

    @Test
    void save_ShouldReturnSavedProduct() {
        // Arrange
        when(productosRepository.save(any(Producto.class))).thenReturn(productoMock);

        // Act
        Producto result = productosService.save(productoMock);

        // Assert
        assertNotNull(result);
        assertEquals("Test Croquettes", result.getNombre());
        
        // Advanced Verification using ArgumentCaptor
        verify(productosRepository).save(productoCaptor.capture());
        Producto savedProducto = productoCaptor.getValue();
        assertEquals(1L, savedProducto.getId());
    }

    @Test
    void update_WhenValidDataProvided_ShouldUpdateAndReturnProduct() {
        // Arrange
        Producto updateData = new Producto();
        updateData.setNombre("Updated Name");
        updateData.setPrecio(10.0);

        when(productosRepository.findById(1L)).thenReturn(Optional.of(productoMock));
        when(productosRepository.save(any(Producto.class))).thenReturn(productoMock);

        // Act
        Producto result = productosService.update(1L, updateData, null);

        // Assert
        assertNotNull(result);
        
        // Verify state changes inside the method
        verify(productosRepository).save(productoCaptor.capture());
        Producto capturedProducto = productoCaptor.getValue();
        assertEquals("Updated Name", capturedProducto.getNombre());
        assertEquals(10.0, capturedProducto.getPrecio());
    }

    @Test
    void update_WhenProductNotFound_ShouldThrowException() {
        // Arrange
        Producto updateData = new Producto();
        updateData.setNombre("Updated Name");
        
        when(productosRepository.findById(99L)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            productosService.update(99L, updateData, null);
        });
        
        assertTrue(exception.getMessage().contains("99"));
        verify(productosRepository, never()).save(any());
    }
}
