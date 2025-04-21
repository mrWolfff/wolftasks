package com.wolf.wolftasks.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.wolf.wolftasks.domain.model.User;

import java.time.LocalDate;

public record UserDTO(
        String id,
        String name,
        String email,
        @JsonFormat(pattern = "dd-MM-yyyy") LocalDate bornDate,
        boolean active
) {
    public static UserDTO fromEntity(User user){
        return new UserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getBornDate(),
                user.isActive()
        );
    }
}
