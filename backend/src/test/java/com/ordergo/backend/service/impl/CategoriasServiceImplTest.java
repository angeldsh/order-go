package com.ordergo.backend.service.impl;

import com.ordergo.backend.model.entity.Categoria;
import com.ordergo.backend.model.repository.CategoriaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CategoriasServiceImplTest {

    @Mock
    private CategoriaRepository categoriaRepository;

    @InjectMocks
    private CategoriasServiceImpl categoriasService;

    private Categoria categoriaMock;

    @BeforeEach
    void setUp() {
        categoriaMock = new Categoria();
        categoriaMock.setId(1L);
        categoriaMock.setNombre("Drinks");
    }

    @Test
    void findAll_ShouldReturnCategoryList() {
        // Arrange
        when(categoriaRepository.findAll()).thenReturn(Arrays.asList(categoriaMock));

        // Act
        List<Categoria> result = categoriasService.findAll();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Drinks", result.get(0).getNombre());
        verify(categoriaRepository, times(1)).findAll();
    }

    @Test
    void findById_WhenExists_ShouldReturnCategory() {
        // Arrange
        when(categoriaRepository.findById(1L)).thenReturn(Optional.of(categoriaMock));

        // Act
        Categoria result = categoriasService.findById(1L);

        // Assert
        assertNotNull(result);
        assertEquals("Drinks", result.getNombre());
        verify(categoriaRepository, times(1)).findById(1L);
    }

    @Test
    void findById_WhenNotExists_ShouldReturnNull() {
        // Arrange
        when(categoriaRepository.findById(99L)).thenReturn(Optional.empty());

        // Act
        Categoria result = categoriasService.findById(99L);

        // Assert
        assertNull(result);
        verify(categoriaRepository, times(1)).findById(99L);
    }

    @Test
    void save_ShouldReturnSavedCategory() {
        // Arrange
        when(categoriaRepository.save(any(Categoria.class))).thenReturn(categoriaMock);

        // Act
        Categoria result = categoriasService.save(categoriaMock);

        // Assert
        assertNotNull(result);
        assertEquals("Drinks", result.getNombre());
        verify(categoriaRepository, times(1)).save(categoriaMock);
    }

    @Test
    void delete_ShouldCallRepositoryDelete() {
        // Act
        categoriasService.delete(categoriaMock);

        // Assert
        verify(categoriaRepository, times(1)).delete(categoriaMock);
    }
}
