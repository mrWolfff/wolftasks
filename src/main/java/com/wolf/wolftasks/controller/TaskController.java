package com.wolf.wolftasks.controller;

import com.wolf.wolftasks.domain.dto.TaskDTO;
import com.wolf.wolftasks.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService service;

    @GetMapping
    public List<TaskDTO> getTasks(){
        return service.getTasks();
    }
    @GetMapping("/{id}")
    public ResponseEntity<TaskDTO> getTask(@PathVariable Long id){
        return service.getTask(id);
    }
    @PostMapping
    public ResponseEntity<TaskDTO> createTask(){
        return service.createTask();
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<TaskDTO> deleteTask(@PathVariable Long id){
        return service.deleteTask(id);
    }
    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable Long id){
        return service.updateTask(id);
    }
}
