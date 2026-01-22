package com.example.vmssystem.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username = "admin";

    @Column(nullable = false)
    private String action;

    @Column(nullable = false)
    private String vmName;

    @Column(name = "vm_id", nullable = false)
    private Long vmId;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Construtor útil
    public Task(String action, String vmName, Long vmId) {
        this.action = action;
        this.vmName = vmName;
        this.vmId = vmId;
    }
}