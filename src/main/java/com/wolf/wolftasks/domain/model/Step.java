package com.wolf.wolftasks.domain.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class Step {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    @NotBlank
    private String title;
    private boolean finished;
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    private Task task;
}
