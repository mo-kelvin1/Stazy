package com.stazy.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stazy.backend.dto.AuthenticationRequestBody;
import com.stazy.backend.dto.AuthenticationResponseBody;
import com.stazy.backend.dto.CompleteProfileRequest;
import com.stazy.backend.model.AuthenticationUser;
import com.stazy.backend.service.AuthenticationService;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;

import java.io.UnsupportedEncodingException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @GetMapping("/user")
    public AuthenticationUser getUser(@RequestAttribute("authenticateUser") AuthenticationUser authenticationUser) {
        return authenticationUser;
    }

    @PostMapping("/login")
    public AuthenticationResponseBody loginPage(@Valid @RequestBody AuthenticationRequestBody loginRequestBody) {
        return authenticationService.login(loginRequestBody);
    }

    @PostMapping("/register")
    public AuthenticationResponseBody registerPage(@Valid @RequestBody AuthenticationRequestBody registerRequestBody)
            throws UnsupportedEncodingException, MessagingException {
        return authenticationService.register(registerRequestBody);
    }

    @PutMapping("/validate-email-verification-token")
    public String verifyEmail(@RequestParam String token,
            @RequestAttribute("authenticateUser") AuthenticationUser authenticationUser) {
        authenticationService.validateEmailVerificationToken(authenticationUser.getEmail(), token);
        return "Email verified successfully";
    }

    @GetMapping("/send-email-verification-token")
    public String sendEmailVerificationToken(
            @RequestAttribute("authenticateUser") AuthenticationUser authenticationUser)
            throws MessagingException, UnsupportedEncodingException {
        authenticationService.sendEmailVerificationToken(authenticationUser.getEmail());
        return "Email verification token sent successfully";
    }

    @PutMapping("/send-password-reset-token")
    public String sendPasswordResetToken(@RequestAttribute("authenticateUser") AuthenticationUser authenticationUser)
            throws MessagingException, UnsupportedEncodingException {
        authenticationService.sendPasswordResetToken(authenticationUser.getEmail());
        return "Password reset token sent successfully";
    }

    @PutMapping("/reset-password")
    public String resetPassword(@RequestParam String email, @RequestParam String newPassword,
            @RequestParam String token) {
        authenticationService.resetPassword(email, newPassword, token);
        return "Password reset successfully";
    }

    @PostMapping("/complete-profile")
    public String completeUserProfile(
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody CompleteProfileRequest request) {
        authenticationService.completeUserProfile(request, token);
        return "Profile completed successfully";
    }
}
