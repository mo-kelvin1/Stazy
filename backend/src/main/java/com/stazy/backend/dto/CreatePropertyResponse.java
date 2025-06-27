package com.stazy.backend.dto;

import lombok.Data;

@Data
public class CreatePropertyResponse {
    private Long propertyId;
    private String message;

    public CreatePropertyResponse(Long propertyId, String message) {
        this.propertyId = propertyId;
        this.message = message;
    }
}