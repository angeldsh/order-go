package com.ordergo.backend.service.impl;

import com.ordergo.backend.auth.models.Cliente;
import com.ordergo.backend.model.entity.Pedido;
import com.ordergo.backend.model.entity.Ticket;
import com.ordergo.backend.model.repository.PedidoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
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
class PedidosServiceImplTest {

    @Mock
    private PedidoRepository pedidoRepository;

    @InjectMocks
    private PedidosServiceImpl pedidosService;

    @Captor
    private ArgumentCaptor<Pedido> pedidoCaptor;

    private Pedido pedidoMock;
    private Cliente clienteMock;
    private Ticket ticketMock;

    @BeforeEach
    void setUp() {
        clienteMock = new Cliente();
        clienteMock.setId(1L);

        ticketMock = new Ticket();
        ticketMock.setId(1L);

        pedidoMock = new Pedido();
        pedidoMock.setId(10L);
        pedidoMock.setEstado("PENDIENTE");
        pedidoMock.setCliente(clienteMock);
        pedidoMock.setTicket(ticketMock);
    }

    @Test
    void findAll_ShouldReturnPedidoList() {
        // Arrange
        when(pedidoRepository.findAll()).thenReturn(Arrays.asList(pedidoMock));

        // Act
        List<Pedido> result = pedidosService.findAll();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("PENDIENTE", result.get(0).getEstado());
        verify(pedidoRepository, times(1)).findAll();
    }

    @Test
    void save_ShouldReturnSavedPedido() {
        // Arrange
        when(pedidoRepository.save(any(Pedido.class))).thenReturn(pedidoMock);

        // Act
        Pedido result = pedidosService.save(pedidoMock);

        // Assert
        assertNotNull(result);
        assertEquals("PENDIENTE", result.getEstado());
        verify(pedidoRepository).save(pedidoCaptor.capture());
        Pedido saved = pedidoCaptor.getValue();
        assertEquals(10L, saved.getId());
    }

    @Test
    void actualizarEstadoPedido_WhenPedidoExists_ShouldUpdateAndReturn() {
        // Arrange
        when(pedidoRepository.findById(10L)).thenReturn(Optional.of(pedidoMock));
        when(pedidoRepository.save(any(Pedido.class))).thenReturn(pedidoMock);

        // Act
        Pedido result = pedidosService.actualizarEstadoPedido(10L, "COMPLETADO");

        // Assert
        assertNotNull(result);
        
        // Verify via Captor that state was changed
        verify(pedidoRepository).save(pedidoCaptor.capture());
        Pedido captured = pedidoCaptor.getValue();
        assertEquals("COMPLETADO", captured.getEstado());
    }

    @Test
    void actualizarEstadoPedido_WhenPedidoDoesNotExist_ShouldReturnNull() {
        // Arrange
        when(pedidoRepository.findById(99L)).thenReturn(Optional.empty());

        // Act
        Pedido result = pedidosService.actualizarEstadoPedido(99L, "COMPLETADO");

        // Assert
        assertNull(result);
        verify(pedidoRepository, never()).save(any());
    }

    @Test
    void findByCliente_ShouldReturnPedidoList() {
        // Arrange
        when(pedidoRepository.findByCliente(clienteMock)).thenReturn(Arrays.asList(pedidoMock));

        // Act
        List<Pedido> result = pedidosService.findByCliente(clienteMock);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(pedidoRepository, times(1)).findByCliente(clienteMock);
    }

    @Test
    void deletePedidosByTicketId_ShouldReturnDeletedCount() {
        // Arrange
        when(pedidoRepository.deletePedidosByTicketId(1L)).thenReturn(5L);

        // Act
        Long count = pedidosService.deletePedidosByTicketId(1L);

        // Assert
        assertEquals(5L, count);
        verify(pedidoRepository, times(1)).deletePedidosByTicketId(1L);
    }
}
