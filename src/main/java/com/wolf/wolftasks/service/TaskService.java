package com.wolf.wolftasks.service;

import com.wolf.wolftasks.domain.dto.CreateTaskDTO;
import com.wolf.wolftasks.domain.dto.TaskDTO;
import com.wolf.wolftasks.domain.model.Task;
import com.wolf.wolftasks.domain.model.User;
import com.wolf.wolftasks.domain.model.Project;
import com.wolf.wolftasks.repository.ProjectRepository;
import com.wolf.wolftasks.repository.TaskRepository;
import com.wolf.wolftasks.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository, UserRepository userRepository, ProjectRepository projectRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
    }

    public ResponseEntity<List<TaskDTO>> getTasks() {
        List<TaskDTO> tasks = taskRepository.findAll()
                .stream()
                .map(TaskDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(tasks);
    }

    public ResponseEntity<TaskDTO> getTask(String id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tarefa não encontrada"));
        return ResponseEntity.ok(TaskDTO.fromEntity(task));
    }

    public ResponseEntity<TaskDTO> createTask(CreateTaskDTO dto, UriComponentsBuilder uri) {
        Project project = projectRepository.findById(dto.projectId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Projeto não encontrado"));

        Task task = new Task(dto);
        task.setProject(project);
        project.addTask(task);

        Task savedTask = taskRepository.save(task);
        projectRepository.save(project);

        if (dto.creatorId() != null && !dto.creatorId().isEmpty()) {
            User creator = userRepository.findById(dto.creatorId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Criador não encontrado"));
            creator.assignTaskAsCreator(savedTask);
            userRepository.save(creator);
        }

        if(dto.responsibleId() != null && !dto.responsibleId().isEmpty()){
            User responsible = userRepository.findById(dto.responsibleId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Responsável não encontrado"));
                responsible.assignTaskAsResponsible(savedTask);
            userRepository.save(responsible);
        };

        URI address = uri.path("/task/{id}").buildAndExpand(savedTask.getId()).toUri();
        return ResponseEntity.created(address).body(TaskDTO.fromEntity(savedTask));
    }

    public ResponseEntity<Void> deleteTask(String id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<TaskDTO> updateTask(String id, TaskDTO dtoUpdated) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setTitle(dtoUpdated.title());
                    task.setDescription(dtoUpdated.description());
                    task.setFinished(dtoUpdated.finished());

                    Task updatedTask = taskRepository.save(task);
                    return ResponseEntity.ok(TaskDTO.fromEntity(updatedTask));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
