package com.makto.carton.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.crypto.password.PasswordEncoder;


import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {



    Optional<User> findByEmail(String email);



    default boolean existsByEmail(String email) {
        return findByEmail(email).isPresent();
    }

    default boolean isValidPassword(User user, String enteredPassword, PasswordEncoder passwordEncoder){
        return true;
    }



}
