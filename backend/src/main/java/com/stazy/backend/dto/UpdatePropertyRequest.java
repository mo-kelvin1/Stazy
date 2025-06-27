package com.stazy.backend.dto;

import com.stazy.backend.model.Property;
import lombok.Data;

import java.util.List;

@Data
public class UpdatePropertyRequest {
    private String title;
    private String description;
    private String location;
    private Double price;
    private Double weekendPrice;
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
    private Boolean isAvailable;
}