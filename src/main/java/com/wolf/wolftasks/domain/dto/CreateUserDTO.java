package com.wolf.wolftasks.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

public record CreateUserDTO(
        String name,
        String email,
        String password,
        @JsonFormat(pattern = "dd-MM-yyyy") LocalDate bornDate,
        boolean active
) {}

