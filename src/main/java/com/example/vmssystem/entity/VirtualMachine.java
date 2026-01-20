package com.example.vmssystem.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Table(name = "vms")
public class VirtualMachine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 5, message = "Nome deve ter no mínimo 5 caracteres")
    private String nome;

    @Min(value = 1, message = "CPU deve ser maior que zero")
    private Integer cpu;

    @Min(value = 1, message = "Memória deve ser maior que zero")
    private Integer memoria;

    @Min(value = 1, message = "Disco deve ser maior que zero")
    private Integer disco;

    private LocalDateTime dataCriacao;

    private String status = "STOPPED";  // RUNNING, STOPPED, SUSPENDED

    // Construtor vazio (OBRIGATÓRIO)
    public VirtualMachine() {
    }

    // Construtor com parâmetros
    public VirtualMachine(String nome, Integer cpu, Integer memoria, Integer disco) {
        this.nome = nome;
        this.cpu = cpu;
        this.memoria = memoria;
        this.disco = disco;
        this.dataCriacao = LocalDateTime.now();
        this.status = "STOPPED";
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getCpu() {
        return cpu;
    }

    public void setCpu(Integer cpu) {
        this.cpu = cpu;
    }

    public Integer getMemoria() {
        return memoria;
    }

    public void setMemoria(Integer memoria) {
        this.memoria = memoria;
    }

    public Integer getDisco() {
        return disco;
    }

    public void setDisco(Integer disco) {
        this.disco = disco;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}