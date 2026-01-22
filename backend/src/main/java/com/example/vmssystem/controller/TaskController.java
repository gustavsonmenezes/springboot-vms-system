package com.example.vmssystem.controller;

import com.example.vmssystem.entity.Task;
import com.example.vmssystem.repository.TaskRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Tag(name = "Tarefas", description = "Histórico de operações nas máquinas virtuais")
public class TaskController {

    private final TaskRepository taskRepository;

    @GetMapping
    @Operation(summary = "Listar todas as tarefas executadas")
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskRepository.findAllByOrderByCreatedAtDesc();
        return ResponseEntity.ok(tasks);
    }
}