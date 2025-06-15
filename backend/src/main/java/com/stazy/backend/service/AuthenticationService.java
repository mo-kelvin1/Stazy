package com.stazy.backend.service;

import java.io.UnsupportedEncodingException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import org.springframework.stereotype.Service;

import com.stazy.backend.dto.AuthenticationRequestBody;
import com.stazy.backend.dto.AuthenticationResponseBody;
import com.stazy.backend.dto.CompleteProfileRequest;
import com.stazy.backend.model.AuthenticationUser;
import com.stazy.backend.repository.AuthenticationUserRepository;
import com.stazy.backend.utils.Encoder;
import com.stazy.backend.utils.JsonWebToken;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;

@Service
public class AuthenticationService {
    private final AuthenticationUserRepository authenticationUserRepository;
    private final Encoder encoder;
    private final JsonWebToken jwt;
    private final EmailService emailService;

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);

    // Constructor injection for all dependencies
    public AuthenticationService(
            AuthenticationUserRepository authenticationUserRepository,
            Encoder encoder,
            JsonWebToken jwt,
            EmailService emailService) {
        this.authenticationUserRepository = authenticationUserRepository;
        this.encoder = encoder;
        this.jwt = jwt;
        this.emailService = emailService;
    }

    private String generateEmailVerificationToken() {
        int token = 100000 + new Random().nextInt(900000); // ensures it's always 6 digits
        return String.valueOf(token);
    }

    public void sendEmailVerificationToken(String email) throws MessagingException, UnsupportedEncodingException {
        Optional<AuthenticationUser> user = authenticationUserRepository.findByEmail(email);
        if (user.isPresent() && !user.get().getEmailVerified()) {
            String token = generateEmailVerificationToken();
            String hashedToken = encoder.hashPassword(token, user.get().getSalt());
            user.get().setEmailVerificationToken(hashedToken);
            user.get().setEmailVerificationTokenExpiryDate(LocalDateTime.now().plusMinutes(5));
            authenticationUserRepository.save(user.get());
            String subject = "Email Verification";
            String body = String.format("Only one step away from verifying your account.\n\n" +
                    "Your verification code is: %s\n\n" + "The code will expire in " + "%s" + "minutes", token, 5);

            try {
                emailService.sendEmail(user.get().getEmail(), subject, body);
            } catch (Exception e) {
                logger.info("Failed to send email: {}", e.getMessage());
                throw new IllegalArgumentException("Email Verification token failed or email is already verified");
            }
        }
    }

    public void validateEmailVerificationToken(String email, String token) {
        Optional<AuthenticationUser> user = authenticationUserRepository.findByEmail(email);
        if (user.isPresent()
                && encoder.matches(token, user.get().getEmailVerificationToken(), user.get().getSalt())
                && user.get().getEmailVerificationTokenExpiryDate().isAfter(LocalDateTime.now())) {
            user.get().setEmailVerified(true);
            user.get().setEmailVerificationToken(null);
            user.get().setEmailVerificationTokenExpiryDate(null);
            authenticationUserRepository.save(user.get());
        } else if (user.isPresent()
                && encoder.matches(token, user.get().getEmailVerificationToken(), user.get().getSalt())
                && user.get().getEmailVerificationTokenExpiryDate().isBefore(LocalDateTime.now())) { // Check if the
                                                                                                     // token is expired
                                                                                                     // (5 minutes from
                                                                                                     // now, token)){
            throw new IllegalArgumentException("Invalid or expired email verification token");
        } else {
            throw new IllegalArgumentException("Email verification token failed");
        }
    }

    public AuthenticationUser getUser(String email) {
        return authenticationUserRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public AuthenticationResponseBody register(AuthenticationRequestBody registerRequestBody)
            throws UnsupportedEncodingException, MessagingException {
        String salt = encoder.generateSalt();
        String hashedPassword = encoder.hashPassword(registerRequestBody.getPassword(), salt);
        String emailVerificationToken = generateEmailVerificationToken();
        String hashedEmailVerificationToken = encoder.hashPassword(emailVerificationToken, salt);

        AuthenticationUser user = new AuthenticationUser();
        user.setEmail(registerRequestBody.getEmail());
        user.setPassword(hashedPassword);
        user.setSalt(salt);
        user.setEmailVerified(false);
        user.setEmailVerificationToken(hashedEmailVerificationToken);
        user.setEmailVerificationTokenExpiryDate(LocalDateTime.now().plusMinutes(5));
        String token = jwt.generateToken(user.getEmail());
        authenticationUserRepository.save(user);

        String subject = "Email Verification";
        String body = String.format("Only one step away from verifying your account.\n\n" +
                "Your verification code is: %s\n\n" + "The code will expire in " + "%s" + "minutes",
                emailVerificationToken, 5);

        try {
            emailService.sendEmail(user.getEmail(), subject, body);
        } catch (Exception e) {
            logger.info("Error while sending email: {}", e.getMessage());
        }
        return new AuthenticationResponseBody(token, "User registered successfully");
    }

    public AuthenticationResponseBody login(AuthenticationRequestBody loginRequestBody) {
        AuthenticationUser user = authenticationUserRepository.findByEmail(loginRequestBody.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (!encoder.matches(loginRequestBody.getPassword(), user.getPassword(), user.getSalt())) {
            throw new IllegalArgumentException("Invalid password");
        }

        // Use the injected JWT component
        String token = jwt.generateToken(user.getEmail());

        return new AuthenticationResponseBody(token, "Login successful");
    }

    public void sendPasswordResetToken(String email) throws MessagingException, UnsupportedEncodingException {
        Optional<AuthenticationUser> user = authenticationUserRepository.findByEmail(email);
        if (user.isPresent()) {
            String passwordResetToken = generateEmailVerificationToken();
            String hashedToken = encoder.hashPassword(passwordResetToken, user.get().getSalt());
            user.get().setPasswordResetToken(hashedToken);
            user.get().setPasswordResetTokenExpiryDate(LocalDateTime.now().plusMinutes(5));
            authenticationUserRepository.save(user.get());
            String subject = "Password Reset";
            String body = String.format("Only one step away from resetting your password.\n\n" +
                    "Your reset code is: %s\n\n" + "The code will expire in " + "%s" + "minutes", passwordResetToken,
                    5);
            try {
                emailService.sendEmail(user.get().getEmail(), subject, body);
            } catch (Exception e) {
                logger.info("Failed to send email: {}", e.getMessage());
                throw new IllegalArgumentException("Password Reset token failed");
            }
        }
    }

    public void resetPassword(String email, String Password, String token) {
        Optional<AuthenticationUser> user = authenticationUserRepository.findByEmail(email);
        if (user.isPresent()
                && encoder.matches(token, user.get().getPasswordResetToken(), user.get().getSalt())
                && user.get().getPasswordResetTokenExpiryDate().isAfter(LocalDateTime.now())) {
            user.get().setPassword(encoder.hashPassword(Password, user.get().getSalt()));
            user.get().setPasswordResetToken(null);
            user.get().setPasswordResetTokenExpiryDate(null);
            authenticationUserRepository.save(user.get());
        } else if (user.isPresent()
                && encoder.matches(token, user.get().getPasswordResetToken(), user.get().getSalt())
                && user.get().getPasswordResetTokenExpiryDate().isBefore(LocalDateTime.now())) { // Check if the
                                                                                                 // token is expired
                                                                                                 // (5 minutes from
                                                                                                 // now, token)){
            throw new IllegalArgumentException("Invalid or expired password reset token");
        } else {
            throw new IllegalArgumentException("Password reset token failed");
        }
    }

    public void completeUserProfile(CompleteProfileRequest request, String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Missing or malformed Authorization header");
        }

        String jwtToken = token.substring(7).trim();

        if (jwtToken.isEmpty()) {
            throw new IllegalArgumentException("Empty JWT token after removing Bearer prefix");
        }

        String email;
        try {
            email = jwt.getEmailFromToken(jwtToken);
        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to decode JWT: " + e.getMessage(), e);
        }

        Optional<AuthenticationUser> user = authenticationUserRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }

        AuthenticationUser u = user.get();
        u.setFirstname(request.getFirstname());
        u.setLastname(request.getLastname());
        u.setPhoneNumber(request.getPhonenumber());
        authenticationUserRepository.save(u);
    }

};
