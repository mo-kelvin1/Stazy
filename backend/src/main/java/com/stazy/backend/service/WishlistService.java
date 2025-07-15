package com.stazy.backend.service;

import com.stazy.backend.dto.WishlistRequest;
import com.stazy.backend.exception.PropertyException;
import com.stazy.backend.model.Wishlist;
import com.stazy.backend.model.Property;
import com.stazy.backend.model.ServiceOffer;
import com.stazy.backend.model.Experience;
import com.stazy.backend.model.User;
import com.stazy.backend.repository.WishlistRepository;
import com.stazy.backend.repository.PropertyRepository;
import com.stazy.backend.repository.ServiceOfferRepository;
import com.stazy.backend.repository.ExperienceRepository;
import com.stazy.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WishlistService {
    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private ServiceOfferRepository serviceRepository;

    @Autowired
    private ExperienceRepository experienceRepository;

    @Autowired
    private UserRepository userRepository;

    public Wishlist addToWishlist(WishlistRequest request, String userEmail) {
        Optional<User> userOpt = userRepository.findByEmail(userEmail);
        if (userOpt.isEmpty()) {
            throw new PropertyException("User not found");
        }
        User user = userOpt.get();

        // Parse item type
        Wishlist.ItemType itemType;
        try {
            itemType = Wishlist.ItemType.valueOf(request.getItemType());
        } catch (IllegalArgumentException e) {
            throw new PropertyException("Invalid item type. Must be PROPERTY, SERVICE, or EXPERIENCE");
        }

        // Check if item already exists in wishlist
        boolean alreadyExists = false;
        switch (itemType) {
            case PROPERTY:
                alreadyExists = wishlistRepository.findByUserEmailAndPropertyId(userEmail, request.getEntityId())
                        .isPresent();
                break;
            case SERVICE:
                alreadyExists = wishlistRepository.findByUserEmailAndServiceId(userEmail, request.getEntityId())
                        .isPresent();
                break;
            case EXPERIENCE:
                alreadyExists = wishlistRepository.findByUserEmailAndExperienceId(userEmail, request.getEntityId())
                        .isPresent();
                break;
        }

        if (alreadyExists) {
            throw new PropertyException("Item is already in your wishlist");
        }

        // Create wishlist item based on type
        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);
        wishlist.setItemType(itemType);
        wishlist.setNotes(request.getNotes());

        switch (itemType) {
            case PROPERTY:
                Optional<Property> propertyOpt = propertyRepository.findById(request.getEntityId());
                if (propertyOpt.isEmpty()) {
                    throw new PropertyException("Property not found");
                }
                wishlist.setProperty(propertyOpt.get());
                break;

            case SERVICE:
                Optional<ServiceOffer> serviceOpt = serviceRepository.findById(request.getEntityId());
                if (serviceOpt.isEmpty()) {
                    throw new PropertyException("Service not found");
                }
                wishlist.setService(serviceOpt.get());
                break;

            case EXPERIENCE:
                Optional<Experience> experienceOpt = experienceRepository.findById(request.getEntityId());
                if (experienceOpt.isEmpty()) {
                    throw new PropertyException("Experience not found");
                }
                wishlist.setExperience(experienceOpt.get());
                break;
        }

        return wishlistRepository.save(wishlist);
    }

    public void removeFromWishlist(Long entityId, String itemType, String userEmail) {
        Wishlist.ItemType type;
        try {
            type = Wishlist.ItemType.valueOf(itemType);
        } catch (IllegalArgumentException e) {
            throw new PropertyException("Invalid item type");
        }

        switch (type) {
            case PROPERTY:
                wishlistRepository.deleteByUserEmailAndPropertyId(userEmail, entityId);
                break;
            case SERVICE:
                wishlistRepository.deleteByUserEmailAndServiceId(userEmail, entityId);
                break;
            case EXPERIENCE:
                wishlistRepository.deleteByUserEmailAndExperienceId(userEmail, entityId);
                break;
        }
    }

    public List<Wishlist> getUserWishlist(String userEmail) {
        return wishlistRepository.findByUserEmail(userEmail);
    }

    public Long getWishlistCount(String userEmail) {
        return wishlistRepository.countByUserEmail(userEmail);
    }

    public boolean isInWishlist(Long entityId, String itemType, String userEmail) {
        Wishlist.ItemType type;
        try {
            type = Wishlist.ItemType.valueOf(itemType);
        } catch (IllegalArgumentException e) {
            return false;
        }

        switch (type) {
            case PROPERTY:
                return wishlistRepository.findByUserEmailAndPropertyId(userEmail, entityId).isPresent();
            case SERVICE:
                return wishlistRepository.findByUserEmailAndServiceId(userEmail, entityId).isPresent();
            case EXPERIENCE:
                return wishlistRepository.findByUserEmailAndExperienceId(userEmail, entityId).isPresent();
            default:
                return false;
        }
    }
}