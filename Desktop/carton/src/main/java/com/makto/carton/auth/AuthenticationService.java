package com.makto.carton.auth;


import com.makto.carton.config.JwtService;
import com.makto.carton.user.Role;
import com.makto.carton.user.User;
import com.makto.carton.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;


@Service
@RequiredArgsConstructor

public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(@Validated RegisterRequest request) {
       if (repository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
       }

        String password = request.getPassword();
        if (!password.matches("^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\\d).{8,}$")) {
            throw new IllegalArgumentException("Password must contain at least 8 characters with 1 symbol, 1 uppercase letter, and 1 digit");
        }

        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .rolee(request.getRolee())
//                .role(Role.ADMIN)
                .build();
        repository.save(user);
        var jwtToken= jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();

    }

    public AuthenticationResponse authenticate (AuthenticationRequest request) {
        if (!repository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Your email is not in our Carton");
        }
//        else if ("a"=="a"){
//            throw new IllegalArgumentException("No Password on this ID");
//        }else {
//
//
//        }

        if (!repository.isValidPassword(new User(), request.getPassword(), passwordEncoder)) {
            throw new IllegalArgumentException("Invalid password");
        }


        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();





    }
}
