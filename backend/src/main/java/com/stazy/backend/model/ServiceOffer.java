package com.stazy.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "service_offers")
@Getter
@Setter
public class ServiceOffer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String location;

    private Double price;

    private Integer duration; // in hours

    private Double rating = 0.0;

    @ElementCollection
    @CollectionTable(name = "service_images", joinColumns = @JoinColumn(name = "service_id"))
    @Column(name = "image_url")
    private List<String> images;

    @Enumerated(EnumType.STRING)
    private ServiceCategory category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ServiceType serviceType;

    @ElementCollection
    @CollectionTable(name = "service_availability_days", joinColumns = @JoinColumn(name = "service_id"))
    @Column(name = "day")
    private List<String> availabilityDays;

    @ElementCollection
    @CollectionTable(name = "service_availability_times", joinColumns = @JoinColumn(name = "service_id"))
    @Column(name = "time_slot")
    private List<String> availabilityTimeSlots;

    @ElementCollection
    @CollectionTable(name = "service_requirements", joinColumns = @JoinColumn(name = "service_id"))
    @Column(name = "requirement")
    private List<String> requirements;

    @ElementCollection
    @CollectionTable(name = "service_included", joinColumns = @JoinColumn(name = "service_id"))
    @Column(name = "included_item")
    private List<String> included;

    private Integer maxGuests = 1;

    private Boolean isGuestFavorite = false;

    @Column(nullable = false)
    private String providerEmail;

    private String provider;

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
    public ServiceOffer() {
    }

    public ServiceOffer(ServiceType serviceType, String providerEmail) {
        this.serviceType = serviceType;
        this.providerEmail = providerEmail;
    }

    // Enums
    public enum ServiceCategory {
        cleaning, maintenance, photography, cooking, tour_guide, transportation, other
    }

    public enum ServiceType {
        one_time, recurring, on_demand
    }
}