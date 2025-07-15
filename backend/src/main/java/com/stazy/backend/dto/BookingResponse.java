package com.stazy.backend.dto;

import com.stazy.backend.model.Booking;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class BookingResponse {
    private Long id;
    private Long propertyId;
    private Long userId;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer numberOfGuests;
    private Double totalPrice;
    private String status;
    private String specialRequests;

    // Host information
    private Long hostId;

    // User information
    private String userEmail;
    private String userFirstName;
    private String userLastName;

    // Entity details (can be property, service, or experience)
    private String entityTitle;
    private String entityLocation;
    private String hostEmail;
    private String entityImages;
    private String bookingType;

    public static BookingResponse fromBooking(Booking booking) {
        BookingResponse response = new BookingResponse();
        response.setId(booking.getId());
        response.setUserId(booking.getUser().getId());
        response.setStartDate(booking.getStartDate());
        response.setEndDate(booking.getEndDate());
        response.setNumberOfGuests(booking.getNumberOfGuests());
        response.setTotalPrice(booking.getTotalPrice());
        response.setStatus(booking.getStatus().name());
        response.setSpecialRequests(booking.getSpecialRequests());
        response.setBookingType(booking.getBookingType().name());

        // Set host information
        response.setHostId(booking.getHostId());

        // Set user information
        response.setUserEmail(booking.getUser().getEmail());
        response.setUserFirstName(booking.getUser().getFirstName());
        response.setUserLastName(booking.getUser().getLastName());

        // Handle different entity types
        switch (booking.getBookingType()) {
            case PROPERTY:
                if (booking.getProperty() != null) {
                    response.setPropertyId(booking.getProperty().getId());
                    response.setEntityTitle(booking.getProperty().getTitle());
                    response.setEntityLocation(booking.getProperty().getLocation());
                    response.setHostEmail(booking.getProperty().getHostEmail());
                    if (booking.getProperty().getImages() != null && !booking.getProperty().getImages().isEmpty()) {
                        response.setEntityImages(booking.getProperty().getImages().get(0));
                    }
                }
                break;

            case SERVICE:
                if (booking.getService() != null) {
                    response.setPropertyId(booking.getService().getId()); // Reusing propertyId field for service ID
                    response.setEntityTitle(booking.getService().getTitle());
                    response.setEntityLocation(booking.getService().getLocation());
                    response.setHostEmail(booking.getService().getProviderEmail());
                    if (booking.getService().getImages() != null && !booking.getService().getImages().isEmpty()) {
                        response.setEntityImages(booking.getService().getImages().get(0));
                    }
                }
                break;

            case EXPERIENCE:
                if (booking.getExperience() != null) {
                    response.setPropertyId(booking.getExperience().getId()); // Reusing propertyId field for experience
                                                                             // ID
                    response.setEntityTitle(booking.getExperience().getTitle());
                    response.setEntityLocation(booking.getExperience().getLocation());
                    response.setHostEmail(booking.getExperience().getHostEmail());
                    if (booking.getExperience().getImages() != null && !booking.getExperience().getImages().isEmpty()) {
                        response.setEntityImages(booking.getExperience().getImages().get(0));
                    }
                }
                break;
        }

        return response;
    }
}