package com.ordergo.backend.auth.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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
@Table(name = "empleados")
public class Empleado {
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

    @NotBlank
    @Size(max = 50)
    @Column(nullable = false, length = 50)
    private String puesto;

    @Column(nullable = false)
    private boolean disponible;


    @OneToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}
