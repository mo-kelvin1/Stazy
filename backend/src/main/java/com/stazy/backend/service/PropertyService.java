package com.stazy.backend.service;

import com.stazy.backend.dto.CreatePropertyRequest;
import com.stazy.backend.dto.UpdatePropertyRequest;
import com.stazy.backend.exception.PropertyException;
import com.stazy.backend.model.Property;
import com.stazy.backend.model.User;
import com.stazy.backend.repository.PropertyRepository;
import com.stazy.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserRepository userRepository;

    public Property createProperty(CreatePropertyRequest request, String hostEmail) {
        // Verify that the user exists
        Optional<User> userOpt = userRepository.findByEmail(hostEmail);
        if (userOpt.isEmpty()) {
            throw new PropertyException("User not found with email: " + hostEmail);
        }

        // Validate that propertyType is provided
        if (request.getPropertyType() == null) {
            throw new PropertyException("Property type is required");
        }

        Property property = new Property();
        property.setPropertyType(request.getPropertyType());
        property.setHostEmail(hostEmail);
        property.setHostId(userOpt.get().getId().toString());

        // Set optional fields if provided
        if (request.getTitle() != null) {
            property.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            property.setDescription(request.getDescription());
        }
        if (request.getLocation() != null) {
            property.setLocation(request.getLocation());
        }
        if (request.getPrice() != null) {
            property.setPrice(request.getPrice());
        }
        if (request.getWeekendPrice() != null) {
            property.setWeekendPrice(request.getWeekendPrice());
        }
        if (request.getNights() != null) {
            property.setNights(request.getNights());
        }
        if (request.getImages() != null) {
            property.setImages(request.getImages());
        }
        if (request.getCategory() != null) {
            property.setCategory(request.getCategory());
        }
        if (request.getIsGuestFavorite() != null) {
            property.setIsGuestFavorite(request.getIsGuestFavorite());
        }
        if (request.getAmenities() != null) {
            property.setAmenities(request.getAmenities());
        }
        if (request.getHighlights() != null) {
            property.setHighlights(request.getHighlights());
        }
        if (request.getMinGuests() != null) {
            property.setMinGuests(request.getMinGuests());
        }
        if (request.getMaxGuests() != null) {
            property.setMaxGuests(request.getMaxGuests());
        }
        if (request.getBedrooms() != null) {
            property.setBedrooms(request.getBedrooms());
        }
        if (request.getBeds() != null) {
            property.setBeds(request.getBeds());
        }
        if (request.getBathrooms() != null) {
            property.setBathrooms(request.getBathrooms());
        }
        if (request.getHostId() != null) {
            property.setHostId(request.getHostId());
        }
        if (request.getIsAvailable() != null) {
            property.setIsAvailable(request.getIsAvailable());
        }

        return propertyRepository.save(property);
    }

    public Property updateProperty(Long propertyId, UpdatePropertyRequest request, String hostEmail) {
        Optional<Property> propertyOpt = propertyRepository.findByIdAndHostEmail(propertyId, hostEmail);
        if (propertyOpt.isEmpty()) {
            throw new PropertyException("Property not found or you don't have permission to update it");
        }

        Property property = propertyOpt.get();

        // Update only the fields that are provided in the request
        if (request.getTitle() != null) {
            property.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            property.setDescription(request.getDescription());
        }
        if (request.getLocation() != null) {
            property.setLocation(request.getLocation());
        }
        if (request.getPrice() != null) {
            property.setPrice(request.getPrice());
        }
        if (request.getWeekendPrice() != null) {
            property.setWeekendPrice(request.getWeekendPrice());
        }
        if (request.getNights() != null) {
            property.setNights(request.getNights());
        }
        if (request.getImages() != null) {
            property.setImages(request.getImages());
        }
        if (request.getCategory() != null) {
            property.setCategory(request.getCategory());
        }
        if (request.getPropertyType() != null) {
            property.setPropertyType(request.getPropertyType());
        }
        if (request.getIsGuestFavorite() != null) {
            property.setIsGuestFavorite(request.getIsGuestFavorite());
        }
        if (request.getAmenities() != null) {
            property.setAmenities(request.getAmenities());
        }
        if (request.getHighlights() != null) {
            property.setHighlights(request.getHighlights());
        }
        if (request.getMinGuests() != null) {
            property.setMinGuests(request.getMinGuests());
        }
        if (request.getMaxGuests() != null) {
            property.setMaxGuests(request.getMaxGuests());
        }
        if (request.getBedrooms() != null) {
            property.setBedrooms(request.getBedrooms());
        }
        if (request.getBeds() != null) {
            property.setBeds(request.getBeds());
        }
        if (request.getBathrooms() != null) {
            property.setBathrooms(request.getBathrooms());
        }
        if (request.getHostId() != null) {
            property.setHostId(request.getHostId());
        }
        if (request.getIsAvailable() != null) {
            property.setIsAvailable(request.getIsAvailable());
        }

        return propertyRepository.save(property);
    }

    public Property getPropertyById(Long propertyId) {
        Optional<Property> propertyOpt = propertyRepository.findById(propertyId);
        if (propertyOpt.isEmpty()) {
            throw new PropertyException("Property not found with id: " + propertyId);
        }
        return propertyOpt.get();
    }

    public List<Property> getAllProperties() {
        return propertyRepository.findAllAvailableProperties();
    }

    public List<Property> getAllPropertiesExcludingUser(String userEmail) {
        return propertyRepository.findAllAvailablePropertiesExcludingHost(userEmail);
    }

    public List<Property> getPropertiesByHostEmail(String hostEmail) {
        return propertyRepository.findAvailablePropertiesByHostEmail(hostEmail);
    }

    public List<Property> getPropertiesByCategory(Property.PropertyCategory category) {
        return propertyRepository.findByCategory(category);
    }

    public List<Property> getPropertiesByPropertyType(Property.PropertyType propertyType) {
        return propertyRepository.findByPropertyType(propertyType);
    }

    public List<Property> getPropertiesByPriceRange(Double minPrice, Double maxPrice) {
        return propertyRepository.findByPriceRange(minPrice, maxPrice);
    }

    public List<Property> getPropertiesByLocation(String location) {
        return propertyRepository.findByLocationContaining(location);
    }

    public boolean isPropertyOwner(Long propertyId, String hostEmail) {
        Optional<Property> propertyOpt = propertyRepository.findByIdAndHostEmail(propertyId, hostEmail);
        return propertyOpt.isPresent();
    }

    public void deleteProperty(Long propertyId, String hostEmail) {
        Optional<Property> propertyOpt = propertyRepository.findByIdAndHostEmail(propertyId, hostEmail);
        if (propertyOpt.isEmpty()) {
            throw new PropertyException("Property not found or you don't have permission to delete it");
        }
        propertyRepository.delete(propertyOpt.get());
    }

    public Property togglePropertyAvailability(Long propertyId, String hostEmail) {
        Optional<Property> propertyOpt = propertyRepository.findByIdAndHostEmail(propertyId, hostEmail);
        if (propertyOpt.isEmpty()) {
            throw new PropertyException("Property not found or you don't have permission to update it");
        }

        Property property = propertyOpt.get();
        property.setIsAvailable(!property.getIsAvailable());
        return propertyRepository.save(property);
    }
}