package com.stazy.backend.service;

import com.stazy.backend.dto.CreateBookingRequest;
import com.stazy.backend.dto.UpdateBookingStatusRequest;
import com.stazy.backend.exception.PropertyException;
import com.stazy.backend.model.Booking;
import com.stazy.backend.model.Property;
import com.stazy.backend.model.ServiceOffer;
import com.stazy.backend.model.Experience;
import com.stazy.backend.model.User;
import com.stazy.backend.repository.BookingRepository;
import com.stazy.backend.repository.PropertyRepository;
import com.stazy.backend.repository.ServiceOfferRepository;
import com.stazy.backend.repository.ExperienceRepository;
import com.stazy.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private PropertyRepository propertyRepository;
    @Autowired
    private ServiceOfferRepository serviceRepository;
    @Autowired
    private ExperienceRepository experienceRepository;
    @Autowired
    private UserRepository userRepository;

    public Booking createBooking(CreateBookingRequest request, String userEmail) {
        Optional<User> userOpt = userRepository.findByEmail(userEmail);
        if (userOpt.isEmpty()) {
            throw new PropertyException("User not found");
        }
        User user = userOpt.get();

        // Parse booking type
        Booking.BookingType bookingType;
        try {
            bookingType = Booking.BookingType.valueOf(request.getBookingType());
        } catch (IllegalArgumentException e) {
            throw new PropertyException("Invalid booking type. Must be PROPERTY, SERVICE, or EXPERIENCE");
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setStartDate(request.getStartDate());
        booking.setEndDate(request.getEndDate());
        booking.setNumberOfGuests(request.getNumberOfGuests());
        booking.setBookingType(bookingType);
        booking.setSpecialRequests(request.getSpecialRequests());
        booking.setStatus(Booking.BookingStatus.PENDING);

        // Handle different entity types
        switch (bookingType) {
            case PROPERTY:
                Optional<Property> propertyOpt = propertyRepository.findById(request.getEntityId());
                if (propertyOpt.isEmpty()) {
                    throw new PropertyException("Property not found");
                }
                Property property = propertyOpt.get();
                booking.setProperty(property);

                // Get host user ID
                Optional<User> hostOpt = userRepository.findByEmail(property.getHostEmail());
                if (hostOpt.isEmpty()) {
                    throw new PropertyException("Host not found");
                }
                booking.setHostId(hostOpt.get().getId());

                // Check for conflicting bookings
                List<Booking> conflicts = bookingRepository.findConflictingBookings(
                        property, request.getStartDate(), request.getEndDate());
                if (!conflicts.isEmpty()) {
                    throw new PropertyException("The property is already booked for the selected dates.");
                }

                // Calculate total price (simple: price * nights)
                long nights = java.time.temporal.ChronoUnit.DAYS.between(request.getStartDate(), request.getEndDate());
                if (nights < 1)
                    throw new PropertyException("End date must be after start date");
                booking.setTotalPrice(property.getPrice() * nights);
                break;

            case SERVICE:
                Optional<ServiceOffer> serviceOpt = serviceRepository.findById(request.getEntityId());
                if (serviceOpt.isEmpty()) {
                    throw new PropertyException("Service not found");
                }
                ServiceOffer service = serviceOpt.get();
                booking.setService(service);

                // Get host user ID
                Optional<User> serviceHostOpt = userRepository.findByEmail(service.getProviderEmail());
                if (serviceHostOpt.isEmpty()) {
                    throw new PropertyException("Service provider not found");
                }
                booking.setHostId(serviceHostOpt.get().getId());

                booking.setTotalPrice(service.getPrice());
                break;

            case EXPERIENCE:
                Optional<Experience> experienceOpt = experienceRepository.findById(request.getEntityId());
                if (experienceOpt.isEmpty()) {
                    throw new PropertyException("Experience not found");
                }
                Experience experience = experienceOpt.get();
                booking.setExperience(experience);

                // Get host user ID
                Optional<User> experienceHostOpt = userRepository.findByEmail(experience.getHostEmail());
                if (experienceHostOpt.isEmpty()) {
                    throw new PropertyException("Experience host not found");
                }
                booking.setHostId(experienceHostOpt.get().getId());

                booking.setTotalPrice(experience.getPrice());
                break;
        }

        return bookingRepository.save(booking);
    }

    public Booking updateBookingStatus(UpdateBookingStatusRequest request, String hostEmail) {
        Optional<Booking> bookingOpt = bookingRepository.findById(request.getBookingId());
        if (bookingOpt.isEmpty()) {
            throw new PropertyException("Booking not found");
        }
        Booking booking = bookingOpt.get();

        // Check if the host owns the entity based on booking type
        boolean isOwner = false;
        switch (booking.getBookingType()) {
            case PROPERTY:
                if (booking.getProperty() != null) {
                    isOwner = booking.getProperty().getHostEmail().equals(hostEmail);
                }
                break;
            case SERVICE:
                if (booking.getService() != null) {
                    isOwner = booking.getService().getProviderEmail().equals(hostEmail);
                }
                break;
            case EXPERIENCE:
                if (booking.getExperience() != null) {
                    isOwner = booking.getExperience().getHostEmail().equals(hostEmail);
                }
                break;
        }

        if (!isOwner) {
            throw new PropertyException(
                    "You are not the owner of this " + booking.getBookingType().name().toLowerCase());
        }

        try {
            Booking.BookingStatus status = Booking.BookingStatus.valueOf(request.getStatus());
            booking.setStatus(status);
        } catch (IllegalArgumentException e) {
            throw new PropertyException("Invalid booking status");
        }
        return bookingRepository.save(booking);
    }

    public List<Booking> getBookingsForProperty(Long propertyId, String hostEmail) {
        Optional<Property> propertyOpt = propertyRepository.findById(propertyId);
        if (propertyOpt.isEmpty()) {
            throw new PropertyException("Property not found");
        }
        Property property = propertyOpt.get();
        if (!property.getHostEmail().equals(hostEmail)) {
            throw new PropertyException("You are not the owner of this property");
        }
        return bookingRepository.findByProperty(property);
    }

    public List<Booking> getBookingsForUser(String userEmail) {
        Optional<User> userOpt = userRepository.findByEmail(userEmail);
        if (userOpt.isEmpty()) {
            throw new PropertyException("User not found");
        }
        User user = userOpt.get();
        return bookingRepository.findByUser(user);
    }

    public List<Booking> getBookingsForHost(String hostEmail) {
        // Get host user ID from email
        Optional<User> hostOpt = userRepository.findByEmail(hostEmail);
        if (hostOpt.isEmpty()) {
            throw new PropertyException("Host not found");
        }

        // Use the simpler findByHostId method
        return bookingRepository.findByHostId(hostOpt.get().getId());
    }
}