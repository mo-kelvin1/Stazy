package com.stazy.backend.controller;

import com.stazy.backend.dto.*;
import com.stazy.backend.model.Experience;
import com.stazy.backend.service.ExperienceService;
import com.stazy.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/experiences")
@CrossOrigin(origins = "*")
public class ExperienceController {

    @Autowired
    private ExperienceService experienceService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> createExperience(@RequestBody CreateExperienceRequest request,
            @RequestHeader("Authorization") String authorization) {
        try {
            // Extract token from Authorization header
            String token = authorization.replace("Bearer ", "");
            String hostEmail = jwtUtil.getEmailFromToken(token);

            Experience createdExperience = experienceService.createExperience(request, hostEmail);
            CreateExperienceResponse response = new CreateExperienceResponse(
                    createdExperience.getId(),
                    "Experience created successfully");

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PutMapping("/{experienceId}")
    public ResponseEntity<?> updateExperience(@PathVariable Long experienceId,
            @RequestBody UpdateExperienceRequest request,
            @RequestHeader("Authorization") String authorization) {
        try {
            // Extract token from Authorization header
            String token = authorization.replace("Bearer ", "");
            String hostEmail = jwtUtil.getEmailFromToken(token);

            Experience updatedExperience = experienceService.updateExperience(experienceId, request, hostEmail);
            ExperienceResponse response = ExperienceResponse.fromExperience(updatedExperience);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/{experienceId}")
    public ResponseEntity<?> getExperienceById(@PathVariable Long experienceId,
            @RequestHeader("Authorization") String authorization) {
        try {
            Experience experience = experienceService.getExperienceById(experienceId);
            ExperienceResponse response = ExperienceResponse.fromExperience(experience);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllExperiences(@RequestHeader("Authorization") String authorization) {
        try {
            // Extract token from Authorization header
            String token = authorization.replace("Bearer ", "");
            String userEmail = jwtUtil.getEmailFromToken(token);

            List<Experience> experiences = experienceService.getAllExperiencesExcludingUser(userEmail);
            List<ExperienceResponse> responses = experiences.stream()
                    .map(ExperienceResponse::fromExperience)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/my-experiences")
    public ResponseEntity<?> getMyExperiences(@RequestHeader("Authorization") String authorization) {
        try {
            // Extract token from Authorization header
            String token = authorization.replace("Bearer ", "");
            String hostEmail = jwtUtil.getEmailFromToken(token);

            List<Experience> experiences = experienceService.getExperiencesByHostEmail(hostEmail);
            List<ExperienceResponse> responses = experiences.stream()
                    .map(ExperienceResponse::fromExperience)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<?> getExperiencesByCategory(@PathVariable String category,
            @RequestHeader("Authorization") String authorization) {
        try {
            Experience.ExperienceCategory experienceCategory = Experience.ExperienceCategory
                    .valueOf(category.toUpperCase());
            List<Experience> experiences = experienceService.getExperiencesByCategory(experienceCategory);
            List<ExperienceResponse> responses = experiences.stream()
                    .map(ExperienceResponse::fromExperience)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/type/{experienceType}")
    public ResponseEntity<?> getExperiencesByType(@PathVariable String experienceType,
            @RequestHeader("Authorization") String authorization) {
        try {
            Experience.ExperienceType type = Experience.ExperienceType.valueOf(experienceType.toUpperCase());
            List<Experience> experiences = experienceService.getExperiencesByExperienceType(type);
            List<ExperienceResponse> responses = experiences.stream()
                    .map(ExperienceResponse::fromExperience)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/search/price")
    public ResponseEntity<?> getExperiencesByPriceRange(@RequestParam Double minPrice,
            @RequestParam Double maxPrice,
            @RequestHeader("Authorization") String authorization) {
        try {
            List<Experience> experiences = experienceService.getExperiencesByPriceRange(minPrice, maxPrice);
            List<ExperienceResponse> responses = experiences.stream()
                    .map(ExperienceResponse::fromExperience)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/search/location")
    public ResponseEntity<?> getExperiencesByLocation(@RequestParam String location,
            @RequestHeader("Authorization") String authorization) {
        try {
            List<Experience> experiences = experienceService.getExperiencesByLocation(location);
            List<ExperienceResponse> responses = experiences.stream()
                    .map(ExperienceResponse::fromExperience)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/search/difficulty/{difficulty}")
    public ResponseEntity<?> getExperiencesByDifficulty(@PathVariable String difficulty,
            @RequestHeader("Authorization") String authorization) {
        try {
            Experience.Difficulty difficultyLevel = Experience.Difficulty.valueOf(difficulty.toUpperCase());
            List<Experience> experiences = experienceService.getExperiencesByDifficulty(difficultyLevel);
            List<ExperienceResponse> responses = experiences.stream()
                    .map(ExperienceResponse::fromExperience)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/search/duration")
    public ResponseEntity<?> getExperiencesByDurationRange(@RequestParam Integer minDuration,
            @RequestParam Integer maxDuration,
            @RequestHeader("Authorization") String authorization) {
        try {
            List<Experience> experiences = experienceService.getExperiencesByDurationRange(minDuration, maxDuration);
            List<ExperienceResponse> responses = experiences.stream()
                    .map(ExperienceResponse::fromExperience)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @DeleteMapping("/{experienceId}")
    public ResponseEntity<?> deleteExperience(@PathVariable Long experienceId,
            @RequestHeader("Authorization") String authorization) {
        try {
            // Extract token from Authorization header
            String token = authorization.replace("Bearer ", "");
            String hostEmail = jwtUtil.getEmailFromToken(token);

            experienceService.deleteExperience(experienceId, hostEmail);
            return ResponseEntity.ok(new ApiResponse(true, "Experience deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PatchMapping("/{experienceId}/toggle-availability")
    public ResponseEntity<?> toggleExperienceAvailability(@PathVariable Long experienceId,
            @RequestHeader("Authorization") String authorization) {
        try {
            // Extract token from Authorization header
            String token = authorization.replace("Bearer ", "");
            String hostEmail = jwtUtil.getEmailFromToken(token);

            Experience experience = experienceService.toggleExperienceAvailability(experienceId, hostEmail);
            ExperienceResponse response = ExperienceResponse.fromExperience(experience);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }
}