package com.stazy.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "wishlists")
@Getter
@Setter
public class Wishlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Entity references - only one will be used based on item type
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id")
    private Property property;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id")
    private ServiceOffer service;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "experience_id")
    private Experience experience;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ItemType itemType;

    @Column(columnDefinition = "TEXT")
    private String notes;

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

    // Enums
    public enum ItemType {
        PROPERTY,
        SERVICE,
        EXPERIENCE
    }

    // Constructors
    public Wishlist() {
    }

    public Wishlist(User user, Property property) {
        this.user = user;
        this.property = property;
        this.itemType = ItemType.PROPERTY;
    }

    public Wishlist(User user, ServiceOffer service) {
        this.user = user;
        this.service = service;
        this.itemType = ItemType.SERVICE;
    }

    public Wishlist(User user, Experience experience) {
        this.user = user;
        this.experience = experience;
        this.itemType = ItemType.EXPERIENCE;
    }
}