package com.example.vmssystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class VmsSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(VmsSystemApplication.class, args);
    }

}
