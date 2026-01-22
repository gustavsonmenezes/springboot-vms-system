package com.example.vmssystem.entity;

import com.example.vmssystem.enums.VMStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "vms")
@Data
@NoArgsConstructor
@AllArgsConstructor 
@Builder
@EntityListeners(AuditingEntityListener.class)
public class VirtualMachine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private Integer cpu;

    @Column(nullable = false)
    private Integer memoria;

    @Column(nullable = false)
    private Integer disco;


    @Column(name = "data_criacao", nullable = false, updatable = false)
    private LocalDateTime dataCriacao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VMStatus status;
}