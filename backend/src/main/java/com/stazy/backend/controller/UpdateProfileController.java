package com.stazy.backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stazy.backend.dto.ApiResponse;
import com.stazy.backend.dto.UpdateProfileRequest;
import com.stazy.backend.dto.UserProfileResponse;
import com.stazy.backend.model.User;
import com.stazy.backend.service.UpdateProfileService;
import com.stazy.backend.service.UserService;

import jakarta.validation.Valid;

@RestController
public class UpdateProfileController {
    @Autowired
    private UpdateProfileService updateProfileService;

    @Autowired
    private UserService userService;

    @PostMapping("/update-profile")
    public ResponseEntity<ApiResponse> updateProfile(@Valid @RequestBody UpdateProfileRequest request,
            Authentication authentication) {
        try {
            String email = authentication.getName();
            Optional<User> userOpt = userService.findByEmail(email);

            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(false, "User not found"));
            }

            User updatedUser = updateProfileService.updateUserProfile(userOpt.get(), request);

            UserProfileResponse profileData = new UserProfileResponse(
                    updatedUser.getFirstName(),
                    updatedUser.getLastName(),
                    updatedUser.getEmail(),
                    updatedUser.getPhoneNumber(),
                    updatedUser.getAddress(),
                    updatedUser.getDateOfBirth());

            return ResponseEntity.ok(new ApiResponse(true, "Profile updated successfully", profileData));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An error occurred while updating profile", e.getMessage()));
        }
    }

}
