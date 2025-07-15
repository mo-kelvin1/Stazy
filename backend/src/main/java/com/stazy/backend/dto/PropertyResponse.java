package com.stazy.backend.dto;

import com.stazy.backend.model.Property;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class PropertyResponse {
    private Long id;
    private String title;
    private String description;
    private String location;
    private Double price;
    private Double weekendPrice;
    private Double rating;
    private Integer nights;
    private List<String> images;
    private Property.PropertyCategory category;
    private Property.PropertyType propertyType;
    private Boolean isGuestFavorite;
    private List<String> amenities;
    private List<String> highlights;
    private Integer minGuests;
    private Integer maxGuests;
    private Integer bedrooms;
    private Integer beds;
    private Integer bathrooms;
    private String hostId;
    private String hostEmail;
    private Boolean isAvailable;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static PropertyResponse fromProperty(Property property) {
        PropertyResponse response = new PropertyResponse();
        response.setId(property.getId());
        response.setTitle(property.getTitle());
        response.setDescription(property.getDescription());
        response.setLocation(property.getLocation());
        response.setPrice(property.getPrice());
        response.setWeekendPrice(property.getWeekendPrice());
        response.setRating(property.getRating());
        response.setNights(property.getNights());
        response.setImages(property.getImages());
        response.setCategory(property.getCategory());
        response.setPropertyType(property.getPropertyType());
        response.setIsGuestFavorite(property.getIsGuestFavorite());
        response.setAmenities(property.getAmenities());
        response.setHighlights(property.getHighlights());
        response.setMinGuests(property.getMinGuests());
        response.setMaxGuests(property.getMaxGuests());
        response.setBedrooms(property.getBedrooms());
        response.setBeds(property.getBeds());
        response.setBathrooms(property.getBathrooms());
        response.setHostId(property.getHostId());
        response.setHostEmail(property.getHostEmail());
        response.setIsAvailable(property.getIsAvailable());
        response.setCreatedAt(property.getCreatedAt());
        response.setUpdatedAt(property.getUpdatedAt());
        return response;
    }
}