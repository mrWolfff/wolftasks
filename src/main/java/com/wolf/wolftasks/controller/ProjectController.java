package com.wolf.wolftasks.controller;

import com.wolf.wolftasks.domain.dto.ProjectDTO;
import com.wolf.wolftasks.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Optional;

@Controller
@RestController
@RequestMapping("/project")
public class ProjectController {
    private final ProjectService service;

    public ProjectController(ProjectService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<ProjectDTO>> getProjects() {
        return service.getProjects();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<ProjectDTO>> getProject(@PathVariable String id) {
        return service.getProject(id);
    }

    @PostMapping
    public ResponseEntity<ProjectDTO> createProject(@RequestBody ProjectDTO dto, UriComponentsBuilder uri) {
        return service.createProject(dto, uri);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable String id) {
        return service.deleteProject(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectDTO> updateProject(@PathVariable String id, @RequestBody ProjectDTO dto) {
        return service.updateProject(id, dto);
    }

}
