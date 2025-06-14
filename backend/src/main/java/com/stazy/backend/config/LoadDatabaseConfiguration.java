package com.stazy.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.stazy.backend.model.AuthenticationUser;
import com.stazy.backend.repository.AuthenticationUserRepository;
import com.stazy.backend.utils.Encoder;

@Configuration
public class LoadDatabaseConfiguration {
    private final Encoder encoder;

    public LoadDatabaseConfiguration(Encoder encoder) {
        this.encoder = encoder;
    }

    @Bean
    public CommandLineRunner initDatabase(AuthenticationUserRepository authenticationUserRepository) {
        return args -> {
            String rawPassword = "password";
            String salt = encoder.generateSalt();
            String hashedPassword = encoder.hashPassword(rawPassword, salt);

            AuthenticationUser authenticationUser = new AuthenticationUser();
            authenticationUser.setEmail("user1@gmail.com");
            authenticationUser.setPassword(hashedPassword);
            authenticationUser.setSalt(salt); // make sure you have a `salt` field in your entity

            authenticationUserRepository.save(authenticationUser);
        };
    }
}
