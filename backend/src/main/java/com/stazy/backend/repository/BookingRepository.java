package com.stazy.backend.repository;

import com.stazy.backend.model.Booking;
import com.stazy.backend.model.Property;
import com.stazy.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
        List<Booking> findByProperty(Property property);

        @Query("SELECT b FROM Booking b WHERE b.property = :property AND b.status = 'CONFIRMED' AND " +
                        "((b.startDate <= :endDate AND b.endDate >= :startDate))")
        List<Booking> findConflictingBookings(@Param("property") Property property,
                        @Param("startDate") LocalDate startDate,
                        @Param("endDate") LocalDate endDate);

        List<Booking> findByUser(User user);

        // Find bookings by entity type
        @Query("SELECT b FROM Booking b WHERE b.bookingType = :bookingType")
        List<Booking> findByBookingType(@Param("bookingType") Booking.BookingType bookingType);

        // Find bookings for a host (properties, services, and experiences)
        @Query("SELECT b FROM Booking b WHERE " +
                        "(b.property IS NOT NULL AND b.property.hostEmail = :hostEmail) OR " +
                        "(b.service IS NOT NULL AND b.service.providerEmail = :hostEmail) OR " +
                        "(b.experience IS NOT NULL AND b.experience.hostEmail = :hostEmail)")
        List<Booking> findByHostEmail(@Param("hostEmail") String hostEmail);

        // Simple method to find bookings by hostId
        List<Booking> findByHostId(Long hostId);
}