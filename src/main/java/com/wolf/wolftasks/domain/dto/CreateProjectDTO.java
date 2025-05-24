package com.wolf.wolftasks.domain.dto;

public record CreateProjectDTO(
        String title,
        String description,
        String creatorId,
        String responsibleId
) {
}
