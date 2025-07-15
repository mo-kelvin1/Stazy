package com.stazy.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "experiences")
@Getter
@Setter
public class Experience {
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
    @CollectionTable(name = "experience_images", joinColumns = @JoinColumn(name = "experience_id"))
    @Column(name = "image_url")
    private List<String> images;

    @Column(nullable = false)
    private String hostName;

    @Column(nullable = false)
    private String hostEmail;

    @Enumerated(EnumType.STRING)
    private ExperienceCategory category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ExperienceType experienceType;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty = Difficulty.easy;

    @Embedded
    private AgeRestriction ageRestriction = new AgeRestriction();

    private Integer maxParticipants = 1;

    @ElementCollection
    @CollectionTable(name = "experience_included", joinColumns = @JoinColumn(name = "experience_id"))
    @Column(name = "included_item")
    private List<String> included;

    @ElementCollection
    @CollectionTable(name = "experience_to_bring", joinColumns = @JoinColumn(name = "experience_id"))
    @Column(name = "item")
    private List<String> toBring;

    private String meetingPoint;

    @ElementCollection
    @CollectionTable(name = "experience_languages", joinColumns = @JoinColumn(name = "experience_id"))
    @Column(name = "language")
    private List<String> languages;

    @Embedded
    private Availability availability = new Availability();

    private Boolean isGuestFavorite = false;

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
    public Experience() {
    }

    public Experience(ExperienceType experienceType, String hostEmail, String hostName) {
        this.experienceType = experienceType;
        this.hostEmail = hostEmail;
        this.hostName = hostName;
    }

    // Enums
    public enum ExperienceCategory {
        adventure, cultural, food_drink, nature, sports, wellness, entertainment, art, history
    }

    public enum ExperienceType {
        group, private_experience, online
    }

    public enum Difficulty {
        easy, moderate, challenging
    }

    // Embedded classes
    @Embeddable
    @Getter
    @Setter
    public static class AgeRestriction {
        private Integer minimum = 0;
        private Integer maximum;
    }

    @Embeddable
    @Getter
    @Setter
    public static class Availability {
        @ElementCollection
        @CollectionTable(name = "experience_availability_days", joinColumns = @JoinColumn(name = "experience_id"))
        @Column(name = "day")
        private List<String> days;

        @ElementCollection
        @CollectionTable(name = "experience_availability_times", joinColumns = @JoinColumn(name = "experience_id"))
        @Column(name = "time_slot")
        private List<String> timeSlots;
    }
}