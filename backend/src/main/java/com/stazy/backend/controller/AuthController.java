package com.stazy.backend.controller;

import com.stazy.backend.dto.*;
import com.stazy.backend.model.User;
import com.stazy.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> signup(@Valid @RequestBody SignupRequest request) {
        try {
            // Check if user already exists
            if (userService.existsByEmail(request.getEmail())) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "User with this email already exists"));
            }

            // Create new user
            User user = userService.createUser(request.getEmail(), request.getPassword());

            // Generate JWT token
            String token = userService.generateJwtToken(user.getEmail());

            Map<String, String> data = new HashMap<>();
            data.put("token", token);
            data.put("message", "Account created successfully. Please verify your email.");

            return ResponseEntity.ok(new ApiResponse(true, "Signup successful", data));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An error occurred during signup", e.getMessage()));
        }
    }

    @PostMapping("/verify-email")
    public ResponseEntity<ApiResponse> verifyEmail(@Valid @RequestBody VerifyEmailRequest request,
            Authentication authentication) {
        try {
            String email = authentication.getName();
            Optional<User> userOpt = userService.findByEmail(email);

            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(false, "User not found"));
            }

            User user = userOpt.get();

            if (user.isEmailVerified()) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "Email is already verified"));
            }

            boolean isVerified = userService.verifyEmailToken(user, request.getOtp());

            if (isVerified) {
                return ResponseEntity.ok(new ApiResponse(true, "Email verified successfully"));
            } else {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "Invalid or expired verification code"));
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An error occurred during email verification"));
        }
    }

    @PostMapping("/complete-profile")
    public ResponseEntity<ApiResponse> completeProfile(@Valid @RequestBody CompleteProfileRequest request,
            Authentication authentication) {
        try {
            String email = authentication.getName();
            Optional<User> userOpt = userService.findByEmail(email);

            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(false, "User not found"));
            }

            User user = userOpt.get();

            if (!user.isEmailVerified()) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "Please verify your email first"));
            }

            if (user.isProfileCompleted()) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "Profile is already completed"));
            }

            User updatedUser = userService.completeProfile(user, request.getFirstName(),
                    request.getLastName(), request.getPhoneNumber());

            UserProfileResponse profileData = new UserProfileResponse(
                    updatedUser.getFirstName(),
                    updatedUser.getLastName(),
                    updatedUser.getEmail(),
                    updatedUser.getPhoneNumber(),
                    updatedUser.getAddress(),
                    updatedUser.getDateOfBirth());

            return ResponseEntity.ok(new ApiResponse(true, "Profile completed successfully", profileData));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An error occurred while completing profile"));
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse> getProfile(Authentication authentication) {
        try {
            String email = authentication.getName();
            Optional<User> userOpt = userService.findByEmail(email);

            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(false, "User not found"));
            }

            User user = userOpt.get();

            if (!user.isProfileCompleted()) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "Profile is not completed"));
            }

            UserProfileResponse profileData = new UserProfileResponse(
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getPhoneNumber(),
                    user.getAddress(),
                    user.getDateOfBirth());

            return ResponseEntity.ok(new ApiResponse(true, "Profile retrieved successfully", profileData));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An error occurred while retrieving profile"));
        }
    }

    @PostMapping("/resend-verification")
    public ResponseEntity<ApiResponse> resendVerificationOtp(Authentication authentication) {
        try {
            String email = authentication.getName();
            Optional<User> userOpt = userService.findByEmail(email);

            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(false, "User not found"));
            }

            User user = userOpt.get();

            if (user.isEmailVerified()) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "Email is already verified"));
            }

            boolean isResent = userService.resendVerificationToken(user);

            if (isResent) {
                return ResponseEntity.ok(new ApiResponse(true, "Verification code resent successfully"));
            } else {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "Unable to resend verification code"));
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An error occurred while resending verification code"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            Optional<User> userOpt = userService.findByEmail(request.getEmail());

            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ApiResponse(false, "Account does not exist, Please Sign up"));
            }

            User user = userOpt.get();

            if (!userService.validatePassword(request.getPassword(), user.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ApiResponse(false, "Invalid email or password"));
            }

            String token = userService.generateJwtToken(user.getEmail());

            Map<String, Object> data = new HashMap<>();
            data.put("token", token);
            data.put("emailVerified", user.isEmailVerified());
            if (user.isProfileCompleted()) {
                data.put("profileCompleted", user.isProfileCompleted());
            } else {
                data.put("profileCompleted", true);
                data.put("message", "Please complete your profile");
            }
            return ResponseEntity.ok(new ApiResponse(true, "Login successful", data));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An error occurred during login"));
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        try {
            if (!userService.existsByEmail(request.getEmail())) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "No account found with this email address"));
            }

            userService.generateAndSendPasswordResetToken(request.getEmail());

            return ResponseEntity.ok(new ApiResponse(true, "Password reset code sent to your email"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An error occurred while processing your request"));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        try {
            if (!userService.existsByEmail(request.getEmail())) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "No account found with this email address"));
            }

            boolean isReset = userService.resetPassword(request.getEmail(), request.getOtp(), request.getNewPassword());

            if (isReset) {
                return ResponseEntity.ok(new ApiResponse(false, "Password reset successfully"));
            } else {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "Invalid or expired reset code"));
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An error occurred while resetting password"));
        }
    }

}