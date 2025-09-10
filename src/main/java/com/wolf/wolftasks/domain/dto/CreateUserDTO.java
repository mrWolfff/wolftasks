package com.wolf.wolftasks.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.wolf.wolftasks.domain.model.User;

import java.time.LocalDate;

public record CreateUserDTO(
        String name,
        String email,
        String password,
        @JsonFormat(pattern = "dd-MM-yyyy") LocalDate bornDate
) {
    public static CreateUserDTO fromEntity(User user) {
        return new CreateUserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getBornDate()
        );
    }
}

