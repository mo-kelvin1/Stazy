package com.stazy.backend.service;

import com.stazy.backend.model.User;
import com.stazy.backend.repository.UserRepository;
import com.stazy.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EmailService emailService;

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public User createUser(String email, String password) {
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));

        // Generate verification token
        String verificationToken = generateVerificationToken();
        user.setEmailVerificationToken(verificationToken);
        user.setTokenExpiry(LocalDateTime.now().plusMinutes(15));

        User savedUser = userRepository.save(user);

        // Send verification email
        emailService.sendVerificationEmail(email, verificationToken);

        return savedUser;
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean verifyEmailToken(User user, String token) {
        if (user.getEmailVerificationToken() != null &&
                user.getEmailVerificationToken().equals(token) &&
                user.getTokenExpiry().isAfter(LocalDateTime.now())) {

            user.setEmailVerified(true);
            user.setEmailVerificationToken(null);
            user.setTokenExpiry(null);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public boolean resendVerificationToken(User user) {
        if (user.isEmailVerified()) {
            return false; // Already verified
        }

        // Generate new verification token
        String verificationToken = generateVerificationToken();
        user.setEmailVerificationToken(verificationToken);
        user.setTokenExpiry(LocalDateTime.now().plusMinutes(15));

        userRepository.save(user);

        // Send verification email
        emailService.sendVerificationEmail(user.getEmail(), verificationToken);

        return true;
    }

    public User completeProfile(User user, String firstName, String lastName, String phoneNumber) {
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setPhoneNumber(phoneNumber);
        user.setProfileCompleted(true);
        return userRepository.save(user);
    }

    public String generateJwtToken(String email) {
        return jwtUtil.generateToken(email);
    }

    private String generateVerificationToken() {
        SecureRandom random = new SecureRandom();
        int token = 100000 + random.nextInt(900000);
        return String.valueOf(token);
    }

    public boolean validatePassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    public void generateAndSendPasswordResetToken(String email) {
        Optional<User> userOpt = findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            String resetToken = generateVerificationToken();
            user.setEmailVerificationToken(resetToken);
            user.setTokenExpiry(LocalDateTime.now().plusMinutes(15));
            userRepository.save(user);

            emailService.sendPasswordResetEmail(email, resetToken);
        }
    }

    public boolean resetPassword(String email, String token, String newPassword) {
        Optional<User> userOpt = findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getEmailVerificationToken() != null &&
                    user.getEmailVerificationToken().equals(token) &&
                    user.getTokenExpiry().isAfter(LocalDateTime.now())) {

                user.setPassword(passwordEncoder.encode(newPassword));
                user.setEmailVerificationToken(null);
                user.setTokenExpiry(null);
                userRepository.save(user);
                return true;
            }
        }
        return false;
    }
}