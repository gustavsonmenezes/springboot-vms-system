package com.example.vmssystem.controller;

import com.example.vmssystem.entity.VirtualMachine;
import com.example.vmssystem.repository.VMRepository;
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
public class VMController {

    @Autowired
    private VMRepository vmRepository;

    // 1. LISTAR TODAS AS VMs
    @GetMapping
    public List<VirtualMachine> getAllVMs() {
        return vmRepository.findAll();
    }

    // 2. BUSCAR VM POR ID
    @GetMapping("/{id}")
    public ResponseEntity<VirtualMachine> getVMById(@PathVariable Long id) {
        Optional<VirtualMachine> vm = vmRepository.findById(id);
        return vm.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 3. CRIAR NOVA VM
    @PostMapping
    public ResponseEntity<?> createVM(@Valid @RequestBody VirtualMachine vm,
                                      BindingResult result) {


        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errors);
        }


        vm.setDataCriacao(LocalDateTime.now());
        if (vm.getStatus() == null) {
            vm.setStatus("STOPPED");
        }

        VirtualMachine savedVM = vmRepository.save(vm);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedVM);
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateVM(@PathVariable Long id,
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


    @PutMapping("/{id}/{acao}")
    public ResponseEntity<?> changeStatus(@PathVariable Long id,
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


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVM(@PathVariable Long id) {
        if (!vmRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        vmRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}