package com.example.vmssystem.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VMRequestDTO {

    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 5, message = "Nome deve ter no mínimo 5 caracteres")
    private String nome;

    @NotNull(message = "Quantidade de CPU é obrigatória")
    @Min(value = 1, message = "CPU deve ser maior que zero")
    private Integer cpu;

    @NotNull(message = "Quantidade de memória é obrigatória")
    @Min(value = 1, message = "Memória deve ser maior que zero")
    private Integer memoria;

    @NotNull(message = "Tamanho do disco é obrigatório")
    @Min(value = 1, message = "Disco deve ser maior que zero")
    private Integer disco;
}
