package com.stazy.backend.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthenticationUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotNull
    @Email
    @Column(unique = true)
    private String email;
    @JsonIgnore
    private Boolean emailVerified = false;
    @JsonIgnore
    private String emailVerificationToken = null;
    @JsonIgnore
    private LocalDateTime emailVerificationTokenExpiryDate = null;
    @JsonIgnore
    private String password;
    @JsonIgnore
    private String passwordResetToken = null;
    @JsonIgnore
    private LocalDateTime passwordResetTokenExpiryDate = null;
    @JsonIgnore
    private String salt;
    private String firstname;
    private String lastname;
    private String phoneNumber;

    public AuthenticationUser(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
