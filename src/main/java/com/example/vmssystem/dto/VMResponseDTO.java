package com.example.vmssystem.dto;

import com.example.vmssystem.enums.VMStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VMResponseDTO {
    private Long id;
    private String nome;
    private Integer cpu;
    private Integer memoria;
    private Integer disco;
    private LocalDateTime dataCriacao;
    private VMStatus status;
}