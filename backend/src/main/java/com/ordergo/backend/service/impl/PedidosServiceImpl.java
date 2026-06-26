package com.ordergo.backend.service.impl;


import com.ordergo.backend.auth.models.Cliente;
import com.ordergo.backend.model.entity.Direccion;
import com.ordergo.backend.model.entity.Pedido;
import com.ordergo.backend.model.entity.Ticket;
import com.ordergo.backend.model.repository.PedidoRepository;
import com.ordergo.backend.service.PedidosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PedidosServiceImpl implements PedidosService {
    @Autowired
    private PedidoRepository pedidoRepository;


    @Override
    @Transactional(readOnly = true)
    public List<Pedido> findAll() {
        return pedidoRepository.findAll();
    }

    @Override
    @Transactional
    public Pedido save(Pedido pedido) {
        return pedidoRepository.save(pedido);
    }

    @Override
    @Transactional
    public Pedido actualizarEstadoPedido(Long pedidoId, String nuevoEstado) {
        Pedido pedido = pedidoRepository.findById(pedidoId).orElse(null);
        if (pedido != null) {
            pedido.setEstado(nuevoEstado);
            return pedidoRepository.save(pedido);
        }
        return null;
    }

    @Override
    @Transactional
    public Pedido findById(Long pedidoId) {
        return pedidoRepository.findById(pedidoId).orElse(null);
    }

    @Override
    @Transactional
    public List<Pedido> findByCliente(Cliente cliente) {
        return pedidoRepository.findByCliente(cliente);
    }

    @Override
    @Transactional
    public List<Pedido> findByTicketId(Long ticketId) {
        return pedidoRepository.findByTicketId(ticketId);
    }

    @Override
    @Transactional
    public Long deletePedidosByTicketId(Long id) {
        return pedidoRepository.deletePedidosByTicketId(id);
    }

    @Override
    @Transactional
    public List<Pedido> findByTicket(Ticket ticket) {
        return pedidoRepository.findByTicket(ticket);
    }

    @Override
    public List<Pedido> findByDireccion(Direccion direccion) {
        return pedidoRepository.findByDireccion(direccion);
    }

    @Override
    public void delete(Pedido pedido) {
        pedidoRepository.delete(pedido);
    }
}
