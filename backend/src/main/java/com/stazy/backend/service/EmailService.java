package com.stazy.backend.service;

import com.stazy.backend.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.from:noreply@stazy.com}")
    private String fromEmail;

    @Value("${app.frontend.url:http://localhost:3000}")
    private String frontendUrl;

    @Async
    public void sendVerificationEmail(User user) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(user.getEmail());
            message.setSubject("Welcome to Stazy - Verify Your Email");

            String verificationUrl = frontendUrl + "/verify-email?token=" + generateVerificationToken(user);

            String messageBody = String.format(
                    "Hi %s,\n\n" +
                            "Welcome to Stazy! Please click the link below to verify your email address:\n\n" +
                            "%s\n\n" +
                            "If you didn't create this account, please ignore this email.\n\n" +
                            "Best regards,\n" +
                            "The Stazy Team",
                    user.getFirstName(),
                    verificationUrl);

            message.setText(messageBody);
            mailSender.send(message);

            log.info("Verification email sent successfully to: {}", user.getEmail());
        } catch (Exception e) {
            log.error("Failed to send verification email to {}: {}", user.getEmail(), e.getMessage());
            throw new RuntimeException("Failed to send verification email", e);
        }
    }

    private String generateVerificationToken(User user) {
        // In a real application, you'd generate a proper JWT token or UUID
        // For now, we'll use a simple approach
        return java.util.Base64.getEncoder().encodeToString(
                (user.getId().toString() + ":" + user.getEmail()).getBytes());
    }
}
// the code above is a simple implementation of an email service that sends a
// verification email to a user