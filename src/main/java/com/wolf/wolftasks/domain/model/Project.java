package com.wolf.wolftasks.domain.model;

import com.wolf.wolftasks.domain.dto.CreateProjectDTO;
import com.wolf.wolftasks.domain.dto.ProjectDTO;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "projects")
public class Project {

    @Id
    private String id;

    @NotBlank
    private String title;

    private String description;

    @NotNull
    private StatusProject status;

    private LocalDateTime creationDate;
    private LocalDateTime finishDate;

    @NotNull
    @DBRef
    private User creator;

    @NotNull
    @DBRef
    private User responsible;

    @NotNull
    private boolean finished;

    @DBRef
    private List<Task> tasks;

    public Project(ProjectDTO dto) {
        this.title = dto.title();
        this.description = dto.description();
        this.creationDate = dto.creationDate();
        this.status = dto.status();
        this.finished = dto.finished();
    }

    public Project() {}

    public Project(CreateProjectDTO dto) {
        this.title = dto.title();
        this.description = dto.description();
        this.creationDate = LocalDateTime.now();
        this.status = StatusProject.CREATED;
        this.finished = false;
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

    public void addTask(Task task) {
        this.tasks.add(task);
        task.setProject(this);
    }
}
