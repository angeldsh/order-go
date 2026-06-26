package com.ordergo.backend.auth.models;

import com.ordergo.backend.model.entity.Direccion;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Slf4j
@Builder
@Entity
@Table(name = "clientes")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    @Pattern(regexp = "^[0-9]{8}[A-Za-z]$")
    @Column(nullable = false, length = 9)
    private String nif;

    @NotBlank
    @Pattern(regexp = "^[0-9]{9}$")
    @Column(nullable = false, length = 9)
    private String telefono;

    @OneToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}
