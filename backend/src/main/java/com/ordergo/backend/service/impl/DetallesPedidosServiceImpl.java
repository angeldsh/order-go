package com.ordergo.backend.service.impl;

import com.ordergo.backend.model.entity.DetallePedido;
import com.ordergo.backend.model.entity.Producto;
import com.ordergo.backend.model.repository.DetallePedidoRepository;
import com.ordergo.backend.service.DetallesPedidosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DetallesPedidosServiceImpl implements DetallesPedidosService {
    @Autowired
    private DetallePedidoRepository detallePedidoRepository;

    @Override
    @Transactional
    public List<DetallePedido> findAll() {
        return detallePedidoRepository.findAll();
    }

    @Override
    @Transactional
    public DetallePedido save(DetallePedido detallesPedidos) {
        return detallePedidoRepository.save(detallesPedidos);
    }

    @Override
    @Transactional
    public void saveAll(List<DetallePedido> detallesPedidos) {
        detallePedidoRepository.saveAll(detallesPedidos);
    }

    @Override
    @Transactional
    public List<DetallePedido> findByPedidoId(Long pedidoId) {
        return detallePedidoRepository.findByPedidoId(pedidoId);
    }

    @Override
    @Transactional
    public Long deleteDetallesByPedidoId(Long id) {
        return detallePedidoRepository.deleteDetallesByPedidoId(id);
    }

    @Override
    public DetallePedido findByProducto(Producto producto) {
        return detallePedidoRepository.findByProducto(producto);
    }
}
