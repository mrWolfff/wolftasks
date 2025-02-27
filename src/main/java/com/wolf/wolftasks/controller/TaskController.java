package com.wolf.wolftasks.controller;

import com.wolf.wolftasks.domain.dto.TaskDTO;
import com.wolf.wolftasks.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Optional;

@Controller
@RestController
@RequestMapping("/task")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getTasks() {
        return service.getTasks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<TaskDTO>> getTask(@PathVariable String id) {
        return service.getTask(id);
    }

    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@RequestBody @Valid TaskDTO dto, UriComponentsBuilder uri) {
        return service.createTask(dto, uri);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) {
        return service.deleteTask(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable String id, @RequestBody @Valid TaskDTO dto) {
        return service.updateTask(id, dto);
    }
}
