package com.wolf.wolftasks.domain.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String title;
    private String description;
    @NotNull
    private StatusProject status;
    private LocalDateTime creationDate;
    private LocalDateTime finishDate;
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    private User creator;
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    private User responsible;
    @NotNull
    private boolean finished;
    @OneToMany(fetch = FetchType.LAZY)
    private List<Task> tasks;


}
