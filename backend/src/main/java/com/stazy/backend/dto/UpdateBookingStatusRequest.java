package com.stazy.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateBookingStatusRequest {
    private Long bookingId;
    private String status; // Should match Booking.BookingStatus enum
}