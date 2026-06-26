package com.ordergo.backend.auth.repository;

import com.ordergo.backend.auth.models.Rol;
import com.ordergo.backend.auth.models.RolEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolRepository extends JpaRepository<Rol, Long> {
    Rol getByName(RolEnum name);

}
