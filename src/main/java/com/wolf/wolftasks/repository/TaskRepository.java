package com.wolf.wolftasks.repository;

import com.wolf.wolftasks.domain.model.Task;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface TaskRepository extends MongoRepository<Task, String> {

	List<Task> findByProjectId(String id);
	
}
