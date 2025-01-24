package com.wolf.wolftasks.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.wolf.wolftasks.domain.model.User;

import java.time.LocalDate;

public record UserDTO(Long id,
                      String name,
                      String email,
                      String password,
                      @JsonFormat(pattern = "dd-MM-yyyy") LocalDate bornDate,
                      boolean active) {
    public UserDTO(User user){
        this(user.getId(), user.getName(), user.getEmail(), user.getPassword(), user.getBornDate(), user.isActive());
    }

    public static UserDTO fromEntity(User user){
        return new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getPassword(), user.getBornDate(),
                user.isActive());
    }
}
