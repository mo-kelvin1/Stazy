package com.stazy.backend.controller;

import com.stazy.backend.dto.*;
import com.stazy.backend.model.Booking;
import com.stazy.backend.service.BookingService;
import com.stazy.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {
    @Autowired
    private BookingService bookingService;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody CreateBookingRequest request,
            @RequestHeader("Authorization") String authorization) {
        try {
            String token = authorization.replace("Bearer ", "");
            String userEmail = jwtUtil.getEmailFromToken(token);
            Booking booking = bookingService.createBooking(request, userEmail);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new CreateBookingResponse(booking.getId(), "Booking created successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PatchMapping("/status")
    public ResponseEntity<?> updateBookingStatus(@RequestBody UpdateBookingStatusRequest request,
            @RequestHeader("Authorization") String authorization) {
        try {
            String token = authorization.replace("Bearer ", "");
            String hostEmail = jwtUtil.getEmailFromToken(token);
            Booking booking = bookingService.updateBookingStatus(request, hostEmail);
            return ResponseEntity.ok(BookingResponse.fromBooking(booking));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/property/{propertyId}")
    public ResponseEntity<?> getBookingsForProperty(@PathVariable Long propertyId,
            @RequestHeader("Authorization") String authorization) {
        try {
            String token = authorization.replace("Bearer ", "");
            String hostEmail = jwtUtil.getEmailFromToken(token);
            List<Booking> bookings = bookingService.getBookingsForProperty(propertyId, hostEmail);
            List<BookingResponse> responses = bookings.stream()
                    .map(BookingResponse::fromBooking)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/my-bookings")
    public ResponseEntity<?> getMyBookings(@RequestHeader("Authorization") String authorization) {
        try {
            String token = authorization.replace("Bearer ", "");
            String userEmail = jwtUtil.getEmailFromToken(token);
            List<Booking> bookings = bookingService.getBookingsForUser(userEmail);
            List<BookingResponse> responses = bookings.stream()
                    .map(BookingResponse::fromBooking)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/host-bookings")
    public ResponseEntity<?> getHostBookings(@RequestHeader("Authorization") String authorization) {
        try {
            String token = authorization.replace("Bearer ", "");
            String hostEmail = jwtUtil.getEmailFromToken(token);
            List<Booking> bookings = bookingService.getBookingsForHost(hostEmail);
            List<BookingResponse> responses = bookings.stream()
                    .map(BookingResponse::fromBooking)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long bookingId,
            @RequestHeader("Authorization") String authorization) {
        try {
            String token = authorization.replace("Bearer ", "");
            String userEmail = jwtUtil.getEmailFromToken(token);
            bookingService.deleteBooking(bookingId, userEmail);
            return ResponseEntity.ok(new ApiResponse(true, "Booking deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }
}