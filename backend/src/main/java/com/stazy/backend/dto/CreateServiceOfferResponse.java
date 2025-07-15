package com.stazy.backend.dto;

import lombok.Data;

@Data
public class CreateServiceOfferResponse {
    private Long serviceId;
    private String message;

    public CreateServiceOfferResponse(Long serviceId, String message) {
        this.serviceId = serviceId;
        this.message = message;
    }
}