package com.stazy.backend.dto;

import com.stazy.backend.model.ServiceOffer;
import lombok.Data;

import java.util.List;

@Data
public class UpdateServiceOfferRequest {
    private String title;
    private String description;
    private String location;
    private Double price;
    private Integer duration;
    private List<String> images;
    private ServiceOffer.ServiceCategory category;
    private ServiceOffer.ServiceType serviceType;
    private Boolean isGuestFavorite;
    private List<String> availabilityDays;
    private List<String> availabilityTimeSlots;
    private List<String> requirements;
    private List<String> included;
    private Integer maxGuests;
    private String provider;
    private Boolean isAvailable;
}