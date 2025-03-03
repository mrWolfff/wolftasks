package com.wolf.wolftasks.domain.model;

import com.wolf.wolftasks.domain.dto.ProjectDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
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

    public Project(ProjectDTO dto) {
        this.title = dto.title();
        this.description = dto.description();
        this.creationDate = dto.creationDate();
        this.status = dto.status();
        this.finished = dto.finished();
    }

    public Project() {

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public StatusProject getStatus() {
        return status;
    }

    public void setStatus(StatusProject status) {
        this.status = status;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDateTime getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(LocalDateTime finishDate) {
        this.finishDate = finishDate;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public User getResponsible() {
        return responsible;
    }

    public void setResponsible(User responsible) {
        this.responsible = responsible;
    }

    public boolean isFinished() {
        return finished;
    }

    public void setFinished(boolean finished) {
        this.finished = finished;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }
}
