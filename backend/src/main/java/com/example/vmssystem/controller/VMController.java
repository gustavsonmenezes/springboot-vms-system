package com.example.vmssystem.controller;

import com.example.vmssystem.dto.VMRequestDTO;
import com.example.vmssystem.dto.VMResponseDTO;
import com.example.vmssystem.service.VMService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/vms")  // ← LINHA MODIFICADA
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Tag(name = "Máquinas Virtuais", description = "Operações CRUD para gerenciamento de máquinas virtuais")
public class VMController {

    private final VMService vmService;

    @GetMapping
    @Operation(summary = "Listar todas as máquinas virtuais")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso")
    })
    public ResponseEntity<List<VMResponseDTO>> getAllVMs() {
        return ResponseEntity.ok(vmService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar máquina virtual por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "VM encontrada"),
            @ApiResponse(responseCode = "404", description = "VM não encontrada")
    })
    public ResponseEntity<VMResponseDTO> getVMById(@PathVariable Long id) {
        return ResponseEntity.ok(vmService.findById(id));
    }

    @PostMapping
    @Operation(summary = "Criar nova máquina virtual")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "VM criada com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados inválidos")
    })
    public ResponseEntity<VMResponseDTO> createVM(@Valid @RequestBody VMRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(vmService.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar máquina virtual")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "VM atualizada com sucesso"),
            @ApiResponse(responseCode = "404", description = "VM não encontrada")
    })
    public ResponseEntity<VMResponseDTO> updateVM(@PathVariable Long id, @Valid @RequestBody VMRequestDTO request) {
        return ResponseEntity.ok(vmService.update(id, request));
    }

    @PutMapping("/{id}/{acao}")
    @Operation(summary = "Alterar status da máquina virtual")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "Status alterado com sucesso"),

            @ApiResponse(responseCode = "400",
                    description = "Ação inválida"),
            @ApiResponse(responseCode = "404",
                    description = "VM não encontrada")
    })
    public ResponseEntity<VMResponseDTO> changeStatus(
            @PathVariable Long id,
            @Parameter(description = "Ação: start, stop ou suspend") @PathVariable String acao) {
        return ResponseEntity.ok(vmService.changeStatus(id, acao));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir máquina virtual")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "VM excluída com sucesso"),
            @ApiResponse(responseCode = "404", description = "VM não encontrada")
    })
    public ResponseEntity<Void> deleteVM(@PathVariable Long id) {
        vmService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
