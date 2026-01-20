package com.example.vmssystem.controller;

import com.example.vmssystem.entity.VirtualMachine;
import com.example.vmssystem.repository.VMRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/vms")
@CrossOrigin(origins = "http://localhost:4200")
@Tag(name = "Máquinas Virtuais", description = "Operações CRUD para gerenciamento de máquinas virtuais")
public class VMController {

    @Autowired
    private VMRepository vmRepository;

    // 1. LISTAR TODAS AS VMs
    @GetMapping
    @Operation(
            summary = "Listar todas as máquinas virtuais",
            description = "Retorna uma lista com todas as VMs cadastradas no sistema"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    public List<VirtualMachine> getAllVMs() {
        return vmRepository.findAll();
    }

    // 2. BUSCAR VM POR ID
    @GetMapping("/{id}")
    @Operation(
            summary = "Buscar máquina virtual por ID",
            description = "Retorna os detalhes de uma máquina virtual específica"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "VM encontrada"),
            @ApiResponse(responseCode = "404", description = "VM não encontrada"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    public ResponseEntity<VirtualMachine> getVMById(
            @Parameter(description = "ID da máquina virtual", example = "1", required = true)
            @PathVariable Long id) {
        Optional<VirtualMachine> vm = vmRepository.findById(id);
        return vm.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 3. CRIAR NOVA VM
    @PostMapping
    @Operation(
            summary = "Criar nova máquina virtual",
            description = "Cadastra uma nova máquina virtual no sistema"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "VM criada com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    public ResponseEntity<?> createVM(
            @Parameter(description = "Dados da máquina virtual a ser criada", required = true)
            @Valid @RequestBody VirtualMachine vm,
            BindingResult result) {

        // Verifica erros de validação
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errors);
        }

        // Define data e status padrão
        vm.setDataCriacao(LocalDateTime.now());
        if (vm.getStatus() == null) {
            vm.setStatus("STOPPED");
        }

        VirtualMachine savedVM = vmRepository.save(vm);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedVM);
    }

    // 4. ATUALIZAR VM
    @PutMapping("/{id}")
    @Operation(
            summary = "Atualizar máquina virtual",
            description = "Atualiza os dados de uma máquina virtual existente"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "VM atualizada com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos"),
            @ApiResponse(responseCode = "404", description = "VM não encontrada"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    public ResponseEntity<?> updateVM(
            @Parameter(description = "ID da máquina virtual a ser atualizada", example = "1", required = true)
            @PathVariable Long id,
            @Parameter(description = "Novos dados da máquina virtual", required = true)
            @Valid @RequestBody VirtualMachine vmDetails,
            BindingResult result) {

        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errors);
        }

        if (!vmRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        vmDetails.setId(id);  // Garante que o ID não muda
        VirtualMachine updatedVM = vmRepository.save(vmDetails);
        return ResponseEntity.ok(updatedVM);
    }

    // 5. MUDAR STATUS (START/STOP/SUSPEND)
    @PutMapping("/{id}/{acao}")
    @Operation(
            summary = "Alterar status da máquina virtual",
            description = "Altera o status de uma máquina virtual (start, stop ou suspend)"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Status alterado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Ação inválida fornecida"),
            @ApiResponse(responseCode = "404", description = "VM não encontrada"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    public ResponseEntity<?> changeStatus(
            @Parameter(description = "ID da máquina virtual", example = "1", required = true)
            @PathVariable Long id,
            @Parameter(
                    description = "Ação a ser realizada",
                    example = "start",
                    required = true,
                    schema = @io.swagger.v3.oas.annotations.media.Schema(
                            type = "string",
                            allowableValues = {"start", "stop", "suspend"}
                    )
            )
            @PathVariable String acao) {

        Optional<VirtualMachine> vmOptional = vmRepository.findById(id);
        if (vmOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        VirtualMachine vm = vmOptional.get();
        String novoStatus = "";

        switch(acao.toLowerCase()) {
            case "start":
                novoStatus = "RUNNING";
                break;
            case "stop":
                novoStatus = "STOPPED";
                break;
            case "suspend":
                novoStatus = "SUSPENDED";
                break;
            default:
                return ResponseEntity.badRequest()
                        .body("Ação inválida. Use: start, stop ou suspend");
        }

        vm.setStatus(novoStatus);
        vmRepository.save(vm);

        return ResponseEntity.ok().body(Map.of(
                "message", "Status alterado para " + novoStatus,
                "vm", vm
        ));
    }

    // 6. DELETAR VM
    @DeleteMapping("/{id}")
    @Operation(
            summary = "Excluir máquina virtual",
            description = "Remove uma máquina virtual do sistema"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "VM excluída com sucesso"),
            @ApiResponse(responseCode = "404", description = "VM não encontrada"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    public ResponseEntity<?> deleteVM(
            @Parameter(description = "ID da máquina virtual a ser excluída", example = "1", required = true)
            @PathVariable Long id) {
        if (!vmRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        vmRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}