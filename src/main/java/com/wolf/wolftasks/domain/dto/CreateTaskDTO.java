package com.wolf.wolftasks.domain.dto;

public record CreateTaskDTO(
                      String title,
                      String description,
                      String projectId,
                      String creatorId,
                      String responsibleId) {

}
