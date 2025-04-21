package com.wolf.wolftasks.service;

import com.wolf.wolftasks.domain.dto.ProjectDTO;
import com.wolf.wolftasks.domain.model.Project;
import com.wolf.wolftasks.domain.model.User;
import com.wolf.wolftasks.repository.ProjectRepository;
import com.wolf.wolftasks.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private final ProjectRepository repository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    public ResponseEntity<List<ProjectDTO>> getProjects() {
        List<ProjectDTO> projects = repository.findAll()
                .stream()
                .map(ProjectDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(projects);
    }

    public ResponseEntity<Optional<ProjectDTO>> getProject(String id) {
        Project project = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Projeto não encontrado"));
        return ResponseEntity.ok(Optional.of(ProjectDTO.fromEntity(project)));
    }

    public ResponseEntity<ProjectDTO> createProject(ProjectDTO dto, UriComponentsBuilder uri) {
        Project project = new Project(dto);
        if (dto.creatorId() != null && !dto.creatorId().isEmpty()) {
            User creator = userRepository.findById(dto.creatorId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Criador não encontrado"));
            project.setCreator(creator);
        }
        if (dto.creatorId() != null && !dto.creatorId().isEmpty()) {
            User responsible = userRepository.findById(dto.responsibleId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Responsável não encontrado"));
            project.setResponsible(responsible);
        }

        Project savedProject = repository.save(project); // Salva antes de obter o ID
        URI address = uri.path("/project/{id}").buildAndExpand(savedProject.getId()).toUri();
        return ResponseEntity.created(address).body(ProjectDTO.fromEntity(savedProject));
    }

    public ResponseEntity<Void> deleteProject(String id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<ProjectDTO> updateProject(String id, ProjectDTO dto) {
        return repository.findById(id)
                .map(project -> {
                    project.setDescription(dto.description());
                    project.setStatus(dto.status());
                    project.setFinished(dto.finished());

                    // Atualiza responsáveis se necessário
                    if (dto.creatorId() != null) {
                        User creator = userRepository.findById(dto.creatorId())
                                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Criador não encontrado"));
                        project.setCreator(creator);
                    }

                    if (dto.responsibleId() != null) {
                        User responsible = userRepository.findById(dto.responsibleId())
                                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Responsável não encontrado"));
                        project.setResponsible(responsible);
                    }

                    Project updatedProject = repository.save(project);
                    return ResponseEntity.ok(ProjectDTO.fromEntity(updatedProject));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
