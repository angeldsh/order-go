package com.ordergo.backend.model.entity;

import com.ordergo.backend.auth.models.Cliente;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Slf4j
@Builder
@Entity
@Table(name = "direcciones")
public class Direccion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String direccion;

    @Column(nullable = false, length = 10)
    private String cp;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;


}
