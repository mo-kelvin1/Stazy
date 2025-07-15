package com.stazy.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CreateBookingRequest {
    private Long entityId; // Can be propertyId, serviceId, or experienceId
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer numberOfGuests;
    private String specialRequests;
    private String bookingType; // "PROPERTY", "SERVICE", or "EXPERIENCE"
}