package com.makto.carton.auth;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private String he = "Email is there Already";
    private String pass = "Password must contain at least 8 characters with 1 symbol, 1 uppercase letter, and 1 digit";

    private final AuthenticationService service;
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ){
        try{
            return ResponseEntity.ok(service.register(request));
        } catch (IllegalArgumentException e) {
            String errorMessage;
            if (e.getMessage().equals("Email already exists")) {
                errorMessage = he;
            } else {
                errorMessage = pass;
            }
            return ResponseEntity.badRequest().body(AuthenticationResponse.builder()
                    .Error(errorMessage)
                    .build());
        }
        
    }


    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        //return ResponseEntity.ok(service.authenticate(request));
        try{
            return ResponseEntity.ok(service.authenticate(request));
        } catch (IllegalArgumentException e) {
            String errorMessage;
            if (e.getMessage().equals("Your email is not in our Carton")) {
                errorMessage = "Your email is not in our Carton";
            } else {
                errorMessage = "Your password is Invaild on Carton";
            }
            return ResponseEntity.badRequest().body(AuthenticationResponse.builder()
                    .Error(errorMessage)
                    .build());
        }
    }
}
