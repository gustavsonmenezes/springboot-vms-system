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

    @NotBlank(message = "O nome é obrigatório")
    @Size(min = 5, message = "O nome deve ter pelo menos 5 caracteres")
    private String nome;

    @NotNull(message = "Quantidade de CPU é obrigatória")
    @Min(value = 1, message = "A CPU deve ser um número positivo")
    private Integer cpu;

    @NotNull(message = "Quantidade de memória é obrigatória")
    @Min(value = 1, message = "A memória deve ser um número positivo")
    private Integer memoria;

    @NotNull(message = "Tamanho do disco é obrigatório")
    @Min(value = 1, message = "O disco deve ser um número positivo")
    private Integer disco;
}
