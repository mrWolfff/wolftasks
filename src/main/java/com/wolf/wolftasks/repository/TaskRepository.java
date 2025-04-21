package com.wolf.wolftasks.repository;

import com.wolf.wolftasks.domain.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TaskRepository extends MongoRepository<Task, String> {}
