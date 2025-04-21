package com.wolf.wolftasks.repository;

import com.wolf.wolftasks.domain.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {}
