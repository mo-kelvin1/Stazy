package com.stazy.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "properties")
@Getter
@Setter
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String location;

    private Double price;

    private Double weekendPrice;

    private Double rating = 0.0;

    private Integer nights = 1;

    @ElementCollection
    @CollectionTable(name = "property_images", joinColumns = @JoinColumn(name = "property_id"))
    @Column(name = "image_url")
    private List<String> images;

    @Enumerated(EnumType.STRING)
    private PropertyCategory category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PropertyType propertyType;

    private Boolean isGuestFavorite = false;

    @ElementCollection
    @CollectionTable(name = "property_amenities", joinColumns = @JoinColumn(name = "property_id"))
    @Column(name = "amenity")
    private List<String> amenities;

    @ElementCollection
    @CollectionTable(name = "property_highlights", joinColumns = @JoinColumn(name = "property_id"))
    @Column(name = "highlight")
    private List<String> highlights;

    private Integer minGuests = 1;

    private Integer maxGuests = 1;

    private Integer bedrooms = 1;

    private Integer beds = 1;

    private Integer bathrooms = 1;

    private String hostId;

    @Column(nullable = false)
    private String hostEmail;

    private Boolean isAvailable = true;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Constructors
    public Property() {
    }

    public Property(PropertyType propertyType, String hostEmail) {
        this.propertyType = propertyType;
        this.hostEmail = hostEmail;
    }

    // Enums
    public enum PropertyCategory {
        house, flat, barn, bed_breakfast, boat, cabin, campervan, casa_particular, villa
    }

    public enum PropertyType {
        entire_place, room, shared_room
    }
}