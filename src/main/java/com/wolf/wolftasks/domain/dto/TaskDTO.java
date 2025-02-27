package com.wolf.wolftasks.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.wolf.wolftasks.domain.model.Task;

import java.time.LocalDateTime;

public record TaskDTO(String id,
                      String title,
                      String description,
                      String projectId,
                      @JsonFormat(pattern = "dd-MM-yyyy'T'HH:mm:ss")
                      LocalDateTime creationDate,
                      boolean finished) {

    public static TaskDTO fromEntity(Task task){
        return new TaskDTO(task.getId(), task.getTitle(),
                task.getDescription(), task.getProject().getId(),
                task.getCreationDate(), task.isFinished());
    }
}
