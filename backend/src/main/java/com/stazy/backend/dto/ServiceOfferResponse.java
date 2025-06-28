package com.stazy.backend.dto;

import com.stazy.backend.model.ServiceOffer;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ServiceOfferResponse {
    private Long id;
    private String title;
    private String description;
    private String location;
    private Double price;
    private Integer duration;
    private Double rating;
    private List<String> images;
    private ServiceOffer.ServiceCategory category;
    private ServiceOffer.ServiceType serviceType;
    private Boolean isGuestFavorite;
    private List<String> availabilityDays;
    private List<String> availabilityTimeSlots;
    private List<String> requirements;
    private List<String> included;
    private Integer maxGuests;
    private String providerEmail;
    private String provider;
    private Boolean isAvailable;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static ServiceOfferResponse fromServiceOffer(ServiceOffer serviceOffer) {
        ServiceOfferResponse response = new ServiceOfferResponse();
        response.setId(serviceOffer.getId());
        response.setTitle(serviceOffer.getTitle());
        response.setDescription(serviceOffer.getDescription());
        response.setLocation(serviceOffer.getLocation());
        response.setPrice(serviceOffer.getPrice());
        response.setDuration(serviceOffer.getDuration());
        response.setRating(serviceOffer.getRating());
        response.setImages(serviceOffer.getImages());
        response.setCategory(serviceOffer.getCategory());
        response.setServiceType(serviceOffer.getServiceType());
        response.setIsGuestFavorite(serviceOffer.getIsGuestFavorite());
        response.setAvailabilityDays(serviceOffer.getAvailabilityDays());
        response.setAvailabilityTimeSlots(serviceOffer.getAvailabilityTimeSlots());
        response.setRequirements(serviceOffer.getRequirements());
        response.setIncluded(serviceOffer.getIncluded());
        response.setMaxGuests(serviceOffer.getMaxGuests());
        response.setProviderEmail(serviceOffer.getProviderEmail());
        response.setProvider(serviceOffer.getProvider());
        response.setIsAvailable(serviceOffer.getIsAvailable());
        response.setCreatedAt(serviceOffer.getCreatedAt());
        response.setUpdatedAt(serviceOffer.getUpdatedAt());
        return response;
    }
}