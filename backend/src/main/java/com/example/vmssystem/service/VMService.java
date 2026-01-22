package com.example.vmssystem.service;

import com.example.vmssystem.dto.VMRequestDTO;
import com.example.vmssystem.dto.VMResponseDTO;
import com.example.vmssystem.entity.Task;
import com.example.vmssystem.entity.VirtualMachine;
import com.example.vmssystem.enums.VMStatus;
import com.example.vmssystem.exception.ResourceNotFoundException;
import com.example.vmssystem.repository.TaskRepository;
import com.example.vmssystem.repository.VMRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VMService {

    private final VMRepository vmRepository;
    private final TaskRepository taskRepository;

    // Método auxiliar para registrar tarefas
    private void registerTask(String action, String vmName, Long vmId) {
        Task task = new Task(action, vmName, vmId);

        // DEBUG - Logs detalhados
        System.out.println("=== REGISTRANDO TAREFA ===");
        System.out.println("Ação: " + action);
        System.out.println("VM: " + vmName);
        System.out.println("ID: " + vmId);
        System.out.println("Usuário: " + task.getUsername());
        System.out.println("Data criação: " + task.getCreatedAt());

        taskRepository.save(task);
        System.out.println("✅ Tarefa salva com ID: " + task.getId());
        System.out.println("=== FIM REGISTRO ===\n");
    }

    public List<VMResponseDTO> findAll() {
        return vmRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public VMResponseDTO findById(Long id) {
        VirtualMachine vm = vmRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Máquina Virtual não encontrada com ID: " + id));
        return convertToDTO(vm);
    }

    @Transactional
    public VMResponseDTO create(VMRequestDTO request) {
        VirtualMachine vm = VirtualMachine.builder()
                .nome(request.getNome())
                .cpu(request.getCpu())
                .memoria(request.getMemoria())
                .disco(request.getDisco())
                .status(VMStatus.STOPPED)
                .dataCriacao(LocalDateTime.now())
                .build();

        VirtualMachine saved = vmRepository.save(vm);

        // Registrar tarefa
        registerTask("CREATE", saved.getNome(), saved.getId());

        return convertToDTO(saved);
    }

    @Transactional
    public VMResponseDTO update(Long id, VMRequestDTO request) {
        VirtualMachine vm = vmRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Máquina Virtual não encontrada com ID: " + id));

        vm.setNome(request.getNome());
        vm.setCpu(request.getCpu());
        vm.setMemoria(request.getMemoria());
        vm.setDisco(request.getDisco());

        VirtualMachine updated = vmRepository.save(vm);

        // Registrar tarefa
        registerTask("UPDATE", updated.getNome(), updated.getId());

        return convertToDTO(updated);
    }

    @Transactional
    public VMResponseDTO changeStatus(Long id, String action) {
        VirtualMachine vm = vmRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Máquina Virtual não encontrada com ID: " + id));

        switch (action.toLowerCase()) {
            case "start":
                vm.setStatus(VMStatus.RUNNING);
                break;
            case "stop":
                vm.setStatus(VMStatus.STOPPED);
                break;
            case "suspend":
                vm.setStatus(VMStatus.SUSPENDED);
                break;
            default:
                throw new IllegalArgumentException("Ação inválida. Use: start, stop ou suspend");
        }

        VirtualMachine updated = vmRepository.save(vm);

        // Registrar tarefa (ação em maiúsculas: START, STOP, SUSPEND)
        registerTask(action.toUpperCase(), updated.getNome(), updated.getId());

        return convertToDTO(updated);
    }

    @Transactional
    public void delete(Long id) {
        VirtualMachine vm = vmRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Máquina Virtual não encontrada com ID: " + id));

        String vmNome = vm.getNome(); // Guardar nome antes de deletar

        vmRepository.delete(vm);

        // Registrar tarefa (VM já deletada, mas registramos o nome)
        registerTask("DELETE", vmNome, id);
    }

    private VMResponseDTO convertToDTO(VirtualMachine vm) {
        return VMResponseDTO.builder()
                .id(vm.getId())
                .nome(vm.getNome())
                .cpu(vm.getCpu())
                .memoria(vm.getMemoria())
                .disco(vm.getDisco())
                .dataCriacao(vm.getDataCriacao())
                .status(vm.getStatus())
                .build();
    }
}
