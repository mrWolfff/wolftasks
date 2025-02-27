package com.wolf.wolftasks.service;

import com.wolf.wolftasks.domain.dto.ProjectDTO;
import com.wolf.wolftasks.domain.model.Project;
import com.wolf.wolftasks.domain.model.User;
import com.wolf.wolftasks.repository.ProjectRepository;
import com.wolf.wolftasks.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
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
        return ResponseEntity.ok(repository.findAll()
                .stream()
                .map(ProjectDTO::fromEntity)
                .collect(Collectors.toList()));
    }

    public ResponseEntity<Optional<ProjectDTO>> getProject(String id) {
        return ResponseEntity.ok(Optional.of(ProjectDTO
                .fromEntity(repository.findById(id)
                        .orElseThrow(EntityNotFoundException::new))));
    }

    public ResponseEntity<ProjectDTO> createProject(ProjectDTO dto, UriComponentsBuilder uri) {
        User creator = userRepository.findById(dto.creator().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Criador não encontrado"));
        User responsible = userRepository.findById(dto.responsible().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Responsável não encontrado"));
        Project project = new Project(dto);
        project.setCreator(creator);
        project.setResponsible(responsible);
        URI address = uri.path("project/{id|}").buildAndExpand(project.getId()).toUri();
        return ResponseEntity.created(address).body(ProjectDTO.fromEntity(repository.save(project)));
    }

    public ResponseEntity<Void> deleteProject(String id) {
        return ResponseEntity.noContent().build();
    }

    public ResponseEntity<ProjectDTO> updateProject(String id, ProjectDTO dto) {
        return ResponseEntity.noContent().build();
    }
}
