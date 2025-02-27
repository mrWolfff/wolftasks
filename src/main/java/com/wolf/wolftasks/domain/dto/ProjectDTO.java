package com.wolf.wolftasks.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.wolf.wolftasks.domain.model.Project;
import com.wolf.wolftasks.domain.model.StatusProject;
import com.wolf.wolftasks.domain.model.User;

import java.time.LocalDateTime;

public record ProjectDTO(String id,
                         String title,
                         String description,
                         StatusProject status,
                         @JsonFormat(pattern = "dd-MM-yyyy'T'HH:mm:ss")
                         LocalDateTime creationDate,
                         boolean finished,
                         User creator,
                         User responsible) {
    public static ProjectDTO fromEntity(Project project){
        return new ProjectDTO(project.getId(), project.getTitle(),
                project.getDescription(), project.getStatus(),
                project.getCreationDate(), project.isFinished(),
                project.getCreator(), project.getResponsible());
    }
}
