package com.stazy.backend.dto;

import com.stazy.backend.model.Experience;
import lombok.Data;

import java.util.List;

@Data
public class UpdateExperienceRequest {
    private String title;
    private String description;
    private String location;
    private Double price;
    private Integer duration;
    private List<String> images;
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
}