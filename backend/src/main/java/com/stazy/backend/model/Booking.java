package com.stazy.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Getter
@Setter
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Entity references - only one will be used based on booking type
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id")
    private Property property;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id")
    private ServiceOffer service;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "experience_id")
    private Experience experience;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Host ID for easier querying of host bookings
    @Column(name = "host_id", nullable = false)
    private Long hostId;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private Integer numberOfGuests;

    @Column(nullable = false)
    private Double totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingType bookingType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status = BookingStatus.PENDING;

    @Column(columnDefinition = "TEXT")
    private String specialRequests;

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
    public Booking() {
    }

    public Booking(Property property, User user, LocalDate startDate, LocalDate endDate,
            Integer numberOfGuests, Double totalPrice, BookingType bookingType) {
        this.property = property;
        this.user = user;
        this.startDate = startDate;
        this.endDate = endDate;
        this.numberOfGuests = numberOfGuests;
        this.totalPrice = totalPrice;
        this.bookingType = bookingType;
    }

    // Enums
    public enum BookingType {
        PROPERTY, // Property booking
        SERVICE, // Service booking
        EXPERIENCE // Experience booking
    }

    public enum BookingStatus {
        PENDING, // Booking request sent, waiting for host confirmation
        CONFIRMED, // Host has confirmed the booking
        CANCELLED, // Booking was cancelled
        COMPLETED, // Booking period has ended
        REJECTED // Host rejected the booking
    }
}