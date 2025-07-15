package com.stazy.backend.dto;

import com.stazy.backend.model.Wishlist;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class WishlistResponse {
    private Long id;
    private String itemType;
    private String notes;
    private LocalDateTime createdAt;

    // Entity details
    private Long entityId;
    private String title;
    private String description;
    private String location;
    private Double price;
    private Double rating;
    private List<String> images;
    private String hostEmail;

    public static WishlistResponse fromWishlist(Wishlist wishlist) {
        WishlistResponse response = new WishlistResponse();
        response.setId(wishlist.getId());
        response.setItemType(wishlist.getItemType().name());
        response.setNotes(wishlist.getNotes());
        response.setCreatedAt(wishlist.getCreatedAt());

        // Set entity details based on item type
        switch (wishlist.getItemType()) {
            case PROPERTY:
                if (wishlist.getProperty() != null) {
                    response.setEntityId(wishlist.getProperty().getId());
                    response.setTitle(wishlist.getProperty().getTitle());
                    response.setDescription(wishlist.getProperty().getDescription());
                    response.setLocation(wishlist.getProperty().getLocation());
                    response.setPrice(wishlist.getProperty().getPrice());
                    response.setRating(wishlist.getProperty().getRating());
                    response.setImages(wishlist.getProperty().getImages());
                    response.setHostEmail(wishlist.getProperty().getHostEmail());
                }
                break;

            case SERVICE:
                if (wishlist.getService() != null) {
                    response.setEntityId(wishlist.getService().getId());
                    response.setTitle(wishlist.getService().getTitle());
                    response.setDescription(wishlist.getService().getDescription());
                    response.setLocation(wishlist.getService().getLocation());
                    response.setPrice(wishlist.getService().getPrice());
                    response.setRating(wishlist.getService().getRating());
                    response.setImages(wishlist.getService().getImages());
                    response.setHostEmail(wishlist.getService().getProviderEmail());
                }
                break;

            case EXPERIENCE:
                if (wishlist.getExperience() != null) {
                    response.setEntityId(wishlist.getExperience().getId());
                    response.setTitle(wishlist.getExperience().getTitle());
                    response.setDescription(wishlist.getExperience().getDescription());
                    response.setLocation(wishlist.getExperience().getLocation());
                    response.setPrice(wishlist.getExperience().getPrice());
                    response.setRating(wishlist.getExperience().getRating());
                    response.setImages(wishlist.getExperience().getImages());
                    response.setHostEmail(wishlist.getExperience().getHostEmail());
                }
                break;
        }

        return response;
    }
}