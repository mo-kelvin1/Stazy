package com.stazy.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignupResponseDTO {

    private UUID userId;
    private String email;
    private String firstName;
    private String lastName;
    private String message;
    private Boolean emailSent;

    public static SignupResponseDTO success(UUID userId, String email, String firstName, String lastName) {
        return SignupResponseDTO.builder()
                .userId(userId)
                .email(email)
                .firstName(firstName)
                .lastName(lastName)
                .message("Account created successfully! A verification email has been sent.")
                .emailSent(true)
                .build();
    }
}