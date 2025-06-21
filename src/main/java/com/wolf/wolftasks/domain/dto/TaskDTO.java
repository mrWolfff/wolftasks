package com.wolf.wolftasks.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.wolf.wolftasks.domain.model.StatusTask;
import com.wolf.wolftasks.domain.model.Task;

import java.time.LocalDateTime;

public record TaskDTO(String id,
                      String title,
                      String description,
                      String projectId,
                      StatusTask status,
                      @JsonFormat(pattern = "dd-MM-yyyy'T'HH:mm:ss")
                      LocalDateTime creationDate,
                      boolean finished,
                      String creatorId,
                      String responsibleId) {

	public static TaskDTO fromEntity(Task task) {
	    String creatorId = task.getCreator() != null ? task.getCreator().getId() : "";
	    String responsibleId = task.getResponsible() != null ? task.getResponsible().getId() : "";

	    return new TaskDTO(
	        task.getId(),
	        task.getTitle(),
	        task.getDescription(),
	        task.getProject().getId(),
	        task.getStatus(),
	        task.getCreationDate(),
	        task.isFinished(),
	        creatorId,
	        responsibleId
	    );
	}
}
