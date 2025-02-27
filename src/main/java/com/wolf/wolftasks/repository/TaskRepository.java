package com.wolf.wolftasks.repository;

import com.wolf.wolftasks.domain.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {

}
