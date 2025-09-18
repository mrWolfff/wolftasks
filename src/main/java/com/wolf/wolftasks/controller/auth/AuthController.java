package com.wolf.wolftasks.controller.auth;

import com.wolf.wolftasks.config.JwtUtil;
import com.wolf.wolftasks.domain.dto.login.LoginRequest;
import com.wolf.wolftasks.domain.dto.login.LoginResponse;
import com.wolf.wolftasks.domain.model.User;
import com.wolf.wolftasks.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private final UserRepository repository;
    private final PasswordEncoder encoder;
    private final JwtUtil jws;

    public AuthController(UserRepository repository, PasswordEncoder encoder, JwtUtil jws) {
        this.repository = repository;
        this.encoder = encoder;
        this.jws = jws;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        Optional<User> user =  repository.findByEmail(request.email());
        if (user.isPresent() && encoder.matches(request.password(), user.get().getPassword())) {
            String token = jws.generateToken(user.get());
            return ResponseEntity.ok(new LoginResponse(request.email(), token));
        }
        return ResponseEntity.status(401).build();
    }

}