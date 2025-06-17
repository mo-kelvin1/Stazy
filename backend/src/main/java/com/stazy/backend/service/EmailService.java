package com.stazy.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationEmail(String to, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Email Verification - Your App Name");
        message.setText("Your email verification code is: " + token +
                "\nThis code will expire in 15 minutes.");

        mailSender.send(message);
    }

    public void sendPasswordResetEmail(String to, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Password Reset - Your App Name");
        message.setText("Your password reset code is: " + token +
                "\nThis code will expire in 15 minutes." +
                "\nIf you didn't request this, please ignore this email.");

        mailSender.send(message);
    }
}