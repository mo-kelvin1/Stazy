package com.stazy.backend.service;

import com.stazy.backend.dto.LoginRequest;
import com.stazy.backend.dto.LoginResponse;
import com.stazy.backend.dto.SignupRequestDTO;
import com.stazy.backend.dto.SignupResponseDTO;
import com.stazy.backend.dto.UserDto;
import com.stazy.backend.entity.User;
import com.stazy.backend.exception.UserAlreadyExistsException;
import com.stazy.backend.repository.UserRepository;
import com.stazy.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;

    // 🔐 LOGIN
    public LoginResponse authenticateUser(LoginRequest loginRequest) {
        try {
            Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail().toLowerCase().trim());

            if (userOptional.isEmpty()) {
                return LoginResponse.failure("Invalid email or password");
            }

            User user = userOptional.get();

            if (!user.getActive()) {
                return LoginResponse.failure("Account is inactive. Please contact support.");
            }

            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPasswordHash())) {
                return LoginResponse.failure("Invalid email or password");
            }

            user.setLastLogin(ZonedDateTime.now());
            userRepository.save(user);

            String token = jwtUtil.generateToken(user.getEmail(), user.getId());
            UserDto userDto = UserDto.fromUser(user);

            return LoginResponse.success(token, userDto);

        } catch (Exception e) {
            log.error("Authentication error: {}", e.getMessage(), e);
            return LoginResponse.failure("Authentication failed. Please try again.");
        }
    }

    // ✅ SIGNUP
    @Transactional
    public SignupResponseDTO signup(SignupRequestDTO signupRequest) {
        log.info("Processing signup request for email: {}", signupRequest.getEmail());

        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new UserAlreadyExistsException("User with email " + signupRequest.getEmail() + " already exists");
        }

        User user = User.builder()
                .firstName(signupRequest.getFirstName())
                .lastName(signupRequest.getLastName())
                .email(signupRequest.getEmail())
                .passwordHash(passwordEncoder.encode(signupRequest.getPassword()))
                .dateOfBirth(signupRequest.getDateOfBirth())
                .optOutMarketing(signupRequest.getOptOutMarketing())
                .isVerified(false)
                .isHost(false)
                .governmentIdVerified(false)
                .emailVerified(false)
                .phoneVerified(false)
                .active(true)
                .build();

        User savedUser = userRepository.save(user);
        log.info("User created successfully with ID: {}", savedUser.getId());

        try {
            emailService.sendVerificationEmail(savedUser);
        } catch (Exception e) {
            log.error("Failed to send verification email to {}: {}", savedUser.getEmail(), e.getMessage());
        }

        return SignupResponseDTO.success(
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getFirstName(),
                savedUser.getLastName());
    }

    // 📦 UTILITY METHODS
    public boolean validateToken(String token) {
        return jwtUtil.validateToken(token);
    }

    public String getEmailFromToken(String token) {
        return jwtUtil.getEmailFromToken(token);
    }

    public User getUserFromToken(String token) {
        String email = getEmailFromToken(token);
        return userRepository.findByEmail(email).orElse(null);
    }
}
