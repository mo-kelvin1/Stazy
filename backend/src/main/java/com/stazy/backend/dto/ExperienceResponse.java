package com.stazy.backend.dto;

import com.stazy.backend.model.Experience;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ExperienceResponse {
    private Long id;
    private String title;
    private String description;
    private String location;
    private Double price;
    private Integer duration;
    private Double rating;
    private List<String> images;
    private String hostName;
    private String hostEmail;
    private Experience.ExperienceCategory category;
    private Experience.ExperienceType experienceType;
    private Experience.Difficulty difficulty;
    private Integer minimumAge;
    private Integer maximumAge;
    private Integer maxParticipants;
    private List<String> included;
    private List<String> toBring;
    private String meetingPoint;
    private List<String> languages;
    private List<String> availabilityDays;
    private List<String> availabilityTimeSlots;
    private Boolean isGuestFavorite;
    private Boolean isAvailable;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static ExperienceResponse fromExperience(Experience experience) {
        ExperienceResponse response = new ExperienceResponse();
        response.setId(experience.getId());
        response.setTitle(experience.getTitle());
        response.setDescription(experience.getDescription());
        response.setLocation(experience.getLocation());
        response.setPrice(experience.getPrice());
        response.setDuration(experience.getDuration());
        response.setRating(experience.getRating());
        response.setImages(experience.getImages());
        response.setHostName(experience.getHostName());
        response.setHostEmail(experience.getHostEmail());
        response.setCategory(experience.getCategory());
        response.setExperienceType(experience.getExperienceType());
        response.setDifficulty(experience.getDifficulty());
        response.setMinimumAge(experience.getAgeRestriction().getMinimum());
        response.setMaximumAge(experience.getAgeRestriction().getMaximum());
        response.setMaxParticipants(experience.getMaxParticipants());
        response.setIncluded(experience.getIncluded());
        response.setToBring(experience.getToBring());
        response.setMeetingPoint(experience.getMeetingPoint());
        response.setLanguages(experience.getLanguages());
        response.setAvailabilityDays(experience.getAvailability().getDays());
        response.setAvailabilityTimeSlots(experience.getAvailability().getTimeSlots());
        response.setIsGuestFavorite(experience.getIsGuestFavorite());
        response.setIsAvailable(experience.getIsAvailable());
        response.setCreatedAt(experience.getCreatedAt());
        response.setUpdatedAt(experience.getUpdatedAt());
        return response;
    }
}