package com.wolf.wolftasks.service;

import com.wolf.wolftasks.domain.dto.CreateUserDTO;
import com.wolf.wolftasks.domain.dto.UserDTO;
import com.wolf.wolftasks.domain.dto.UpdateUserDTO;
import com.wolf.wolftasks.domain.model.User;
import com.wolf.wolftasks.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository repository;
    private final PasswordEncoder encoder;

    public UserService(UserRepository repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    public ResponseEntity<List<UserDTO>> getUsers() {
        List<UserDTO> users = repository.findAll()
                .stream()
                .map(UserDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    public ResponseEntity<UserDTO> getUser(String id) {
        User user = repository.findById(id)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found!"));
        return ResponseEntity.ok(UserDTO.fromEntity(user));
    }

    public ResponseEntity<?> createUser(CreateUserDTO dto, UriComponentsBuilder uri) {
        Optional<User> existedUser = repository.findByEmail(dto.email());
        if(existedUser.isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "This email is already used!"));
        }
        User user = new User(dto, encoder);
        User savedUser = repository.save(user);
        URI address = uri.path("/user/{id}").buildAndExpand(savedUser.getId()).toUri();
        return ResponseEntity.created(address).body(CreateUserDTO.fromEntity(savedUser));
    }

    public ResponseEntity<Void> deleteUser(String id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    //TODO: rebuild this update creating one only endpoint to password
    public ResponseEntity<UserDTO> updateUser(String id, UpdateUserDTO dto) {
        return repository.findById(id)
                .map(user -> {
                    user.setName(dto.name());
                    user.setEmail(dto.email());
                    user.setBornDate(dto.bornDate());
                    user.setActive(dto.active());
                    user.setPassword(dto.password()); // ou use criptografia se for o caso

                    User updatedUser = repository.save(user);
                    return ResponseEntity.ok(UserDTO.fromEntity(updatedUser));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    public ResponseEntity<?> getUserByEmail(String email) {
        Optional<User> existedUser = repository.findByEmail(email);
        if(existedUser.isPresent())
            return ResponseEntity.ok(UserDTO.fromEntity(existedUser.get()));
        return ResponseEntity.notFound().build();
    }
}
