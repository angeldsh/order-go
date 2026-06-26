package com.ordergo.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.transaction.annotation.Transactional;

@SpringBootApplication
@EnableWebSecurity
public class ProyectoApplication implements CommandLineRunner {


    public static void main(String[] args) {
        SpringApplication.run(ProyectoApplication.class, args);
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
    }
}

