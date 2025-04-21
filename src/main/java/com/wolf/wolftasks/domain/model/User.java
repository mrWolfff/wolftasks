package com.wolf.wolftasks.domain.model;

import com.wolf.wolftasks.domain.dto.UserDTO;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.util.List;

@Document(collection = "users") // Define a coleção do MongoDB
public class User {

    @Id
    private String id;

    @NotBlank
    private String name;

    @NotBlank
    private String email;

    @NotBlank
    private String password;

    private LocalDate bornDate;

    private boolean active;

    @DBRef // Referência para as tarefas criadas pelo usuário
    private List<Task> tasks;

    @DBRef // Referência para os projetos do usuário
    private List<Project> projects;

    public User(UserDTO dto) {
        this.name = dto.name();
        this.email = dto.email();
        this.bornDate = dto.bornDate();
        this.active = dto.active();
    }

    public User() {}

    // Getters e Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public LocalDate getBornDate() { return bornDate; }
    public void setBornDate(LocalDate bornDate) { this.bornDate = bornDate; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    public List<Task> getTasks() { return tasks; }
    public void setTasks(List<Task> tasks) { this.tasks = tasks; }

    public List<Project> getProjects() { return projects; }
    public void setProjects(List<Project> projects) { this.projects = projects; }

    public void assignTaskAsCreator(Task task) {
        if (this.tasks != null) {
            this.tasks.add(task);
        }
    }

    public void assignTaskAsResponsible(Task savedTask) {
    }
}
