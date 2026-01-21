package com.example.vmssystem.service;

import com.example.vmssystem.dto.VMRequestDTO;
import com.example.vmssystem.dto.VMResponseDTO;
import com.example.vmssystem.entity.VirtualMachine;
import com.example.vmssystem.enums.VMStatus;
import com.example.vmssystem.exception.ResourceNotFoundException;
import com.example.vmssystem.repository.VMRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime; // Importação adicionada
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VMService {

    private final VMRepository vmRepository;

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
                .dataCriacao(LocalDateTime.now()) // Preenchimento manual da data
                .build();

        return convertToDTO(vmRepository.save(vm));
    }

    @Transactional
    public VMResponseDTO update(Long id, VMRequestDTO request) {
        VirtualMachine vm = vmRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Máquina Virtual não encontrada com ID: " + id));

        vm.setNome(request.getNome());
        vm.setCpu(request.getCpu());
        vm.setMemoria(request.getMemoria());
        vm.setDisco(request.getDisco());

        return convertToDTO(vmRepository.save(vm));
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

        return convertToDTO(vmRepository.save(vm));
    }

    @Transactional
    public void delete(Long id) {
        if (!vmRepository.existsById(id)) {
            throw new ResourceNotFoundException("Máquina Virtual não encontrada com ID: " + id);
        }
        vmRepository.deleteById(id);
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
