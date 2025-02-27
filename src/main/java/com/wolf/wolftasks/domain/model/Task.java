package com.wolf.wolftasks.domain.model;

import com.wolf.wolftasks.domain.dto.TaskDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    @NotBlank
    private String title;
    private String description;
    @OneToMany(fetch = FetchType.LAZY)
    private List<Step> steps;
    private LocalDateTime creationDate;
    private LocalDateTime finishDate;
    @NotNull
    private boolean finished;
    @ManyToOne(fetch = FetchType.LAZY)
    private Project project;

    public Task(TaskDTO dto){
        this.title = dto.title();
        this.description = dto.description();
        this.creationDate = dto.creationDate();
        this.finished = dto.finished();
    }

    public Task(){
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

    public boolean isFinished() {
        return finished;
    }

    public void setFinished(boolean finished) {
        this.finished = finished;
    }

    public Project getProject() {
        return project;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<Step> getSteps() {
        return steps;
    }

    public void setSteps(List<Step> steps) {
        this.steps = steps;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
