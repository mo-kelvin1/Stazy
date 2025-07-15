package com.stazy.backend.dto;

import lombok.Data;

@Data
public class CreateExperienceResponse {
    private Long experienceId;
    private String message;

    public CreateExperienceResponse(Long experienceId, String message) {
        this.experienceId = experienceId;
        this.message = message;
    }
}