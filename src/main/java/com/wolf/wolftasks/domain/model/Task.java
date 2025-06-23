package com.wolf.wolftasks.domain.model;

import com.wolf.wolftasks.domain.dto.CreateTaskDTO;
import com.wolf.wolftasks.domain.dto.TaskDTO;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "tasks")
public class Task {

    @Id
    private String id;

    @NotBlank
    private String title;

    private String description;
    
    @NotNull
    private StatusTask status;

    private List<Step> steps;

    private LocalDateTime creationDate;

    private LocalDateTime finishDate;

    @NotNull
    private boolean finished;

    @DBRef
    private User creator;

    @DBRef
    private User responsible;

    @DBRef
    private Project project;

    public Task(TaskDTO dto) {
        this.title = dto.title();
        this.description = dto.description();
        this.creationDate = dto.creationDate();
        this.finished = dto.finished();
    }

    public Task() {}

    public Task(CreateTaskDTO dto) {
    	this.title = dto.title();
        this.description = dto.description();
        this.creationDate = LocalDateTime.now();
        this.finished = false;
        this.status = StatusTask.BACKLOG;
	}

	// Getters e Setters
    
    
    public String getId() { return id; }
    public StatusTask getStatus() {
        if (status == null)
            return StatusTask.BACKLOG;
		return status;
	}

	public void setStatus(StatusTask status) {
		this.status = status;
	}

	public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getCreationDate() { return creationDate; }

    public void setFinishDate(LocalDateTime finishDate) { this.finishDate = finishDate; }

    public boolean isFinished() { return finished; }
    public void setFinished(boolean finished) { this.finished = finished; }

    public List<Step> getSteps() { return steps; }
    public void setSteps(List<Step> steps) { this.steps = steps; }

    public User getCreator() { return creator; }
    public void setCreator(User creator) { this.creator = creator; }

    public User getResponsible() { return responsible; }
    public void setResponsible(User responsible) { this.responsible = responsible; }

    public Project getProject() { return project; }
    public void setProject(Project project) { this.project = project; }
}