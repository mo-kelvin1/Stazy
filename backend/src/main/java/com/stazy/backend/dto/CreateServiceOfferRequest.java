package com.stazy.backend.dto;

import com.stazy.backend.model.ServiceOffer;
import lombok.Data;

import java.util.List;

@Data
public class CreateServiceOfferRequest {
    private ServiceOffer.ServiceType serviceType;

    // Optional fields for initial creation
    private String title;
    private String description;
    private String location;
    private Double price;
    private Integer duration;
    private List<String> images;
    private ServiceOffer.ServiceCategory category;
    private Boolean isGuestFavorite;
    private List<String> availabilityDays;
    private List<String> availabilityTimeSlots;
    private List<String> requirements;
    private List<String> included;
    private Integer maxGuests;
    private String provider;
    private Boolean isAvailable;
}