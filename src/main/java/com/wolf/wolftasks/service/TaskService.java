package com.wolf.wolftasks.service;

import com.wolf.wolftasks.domain.dto.TaskDTO;
import com.wolf.wolftasks.domain.model.Task;
import com.wolf.wolftasks.repository.ProjectRepository;
import com.wolf.wolftasks.repository.TaskRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskService {
    private final TaskRepository repository;
    private final ProjectRepository projectRepository;

    public TaskService(TaskRepository repository, ProjectRepository projectRepository) {
        this.repository = repository;
        this.projectRepository = projectRepository;
    }

    public ResponseEntity<List<TaskDTO>> getTasks() {
        return ResponseEntity.ok(repository.findAll()
                .stream()
                .map(TaskDTO::fromEntity)
                .collect(Collectors.toList()));
    }

    public ResponseEntity<Optional<TaskDTO>> getTask(String id) {
        return ResponseEntity.ok(Optional.of(
                TaskDTO.fromEntity(repository.findById(id)
                        .orElseThrow(EntityNotFoundException::new))));
    }

    public ResponseEntity<TaskDTO> createTask(TaskDTO dto, UriComponentsBuilder uri) {
        return projectRepository.findById(dto.projectId())
                .map(project -> {
                    Task task = new Task(dto);
                    task.setProject(project);
                    task = repository.save(task);
                    URI address = uri.path("/task/{id}").buildAndExpand(task.getId()).toUri();
                    return ResponseEntity.created(address).body(TaskDTO.fromEntity(task));
                })
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    public ResponseEntity<Void> deleteTask(String id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<TaskDTO> updateTask(String id, TaskDTO dtoUpdated) {
        return repository.findById(id)
                .map(task -> {
                    task.setTitle(dtoUpdated.title());
                    task.setDescription(dtoUpdated.description());
                    task.setFinished(dtoUpdated.finished());

                    Task updatedTask = repository.save(task);

                    return ResponseEntity.ok(TaskDTO.fromEntity(updatedTask));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
