package com.stazy.backend.service;

import com.stazy.backend.dto.CreateServiceOfferRequest;
import com.stazy.backend.dto.UpdateServiceOfferRequest;
import com.stazy.backend.exception.PropertyException;
import com.stazy.backend.model.ServiceOffer;
import com.stazy.backend.model.User;
import com.stazy.backend.repository.ServiceOfferRepository;
import com.stazy.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceOfferService {

    @Autowired
    private ServiceOfferRepository serviceOfferRepository;

    @Autowired
    private UserRepository userRepository;

    public ServiceOffer createServiceOffer(CreateServiceOfferRequest request, String providerEmail) {
        // Verify that the user exists
        Optional<User> userOpt = userRepository.findByEmail(providerEmail);
        if (userOpt.isEmpty()) {
            throw new PropertyException("User not found with email: " + providerEmail);
        }

        // Validate that serviceType is provided
        if (request.getServiceType() == null) {
            throw new PropertyException("Service type is required");
        }

        ServiceOffer serviceOffer = new ServiceOffer();
        serviceOffer.setServiceType(request.getServiceType());
        serviceOffer.setProviderEmail(providerEmail);
        serviceOffer.setProvider(userOpt.get().getFirstName() + " " + userOpt.get().getLastName());

        // Set optional fields if provided
        if (request.getTitle() != null) {
            serviceOffer.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            serviceOffer.setDescription(request.getDescription());
        }
        if (request.getLocation() != null) {
            serviceOffer.setLocation(request.getLocation());
        }
        if (request.getPrice() != null) {
            serviceOffer.setPrice(request.getPrice());
        }
        if (request.getDuration() != null) {
            serviceOffer.setDuration(request.getDuration());
        }
        if (request.getImages() != null) {
            serviceOffer.setImages(request.getImages());
        }
        if (request.getCategory() != null) {
            serviceOffer.setCategory(request.getCategory());
        }
        if (request.getIsGuestFavorite() != null) {
            serviceOffer.setIsGuestFavorite(request.getIsGuestFavorite());
        }
        if (request.getAvailabilityDays() != null) {
            serviceOffer.setAvailabilityDays(request.getAvailabilityDays());
        }
        if (request.getAvailabilityTimeSlots() != null) {
            serviceOffer.setAvailabilityTimeSlots(request.getAvailabilityTimeSlots());
        }
        if (request.getRequirements() != null) {
            serviceOffer.setRequirements(request.getRequirements());
        }
        if (request.getIncluded() != null) {
            serviceOffer.setIncluded(request.getIncluded());
        }
        if (request.getMaxGuests() != null) {
            serviceOffer.setMaxGuests(request.getMaxGuests());
        }
        if (request.getProvider() != null) {
            serviceOffer.setProvider(request.getProvider());
        }
        if (request.getIsAvailable() != null) {
            serviceOffer.setIsAvailable(request.getIsAvailable());
        }

        return serviceOfferRepository.save(serviceOffer);
    }

    public ServiceOffer updateServiceOffer(Long serviceId, UpdateServiceOfferRequest request, String providerEmail) {
        Optional<ServiceOffer> serviceOpt = serviceOfferRepository.findByIdAndProviderEmail(serviceId, providerEmail);
        if (serviceOpt.isEmpty()) {
            throw new PropertyException("Service offer not found or you don't have permission to update it");
        }

        ServiceOffer serviceOffer = serviceOpt.get();

        // Update only the fields that are provided in the request
        if (request.getTitle() != null) {
            serviceOffer.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            serviceOffer.setDescription(request.getDescription());
        }
        if (request.getLocation() != null) {
            serviceOffer.setLocation(request.getLocation());
        }
        if (request.getPrice() != null) {
            serviceOffer.setPrice(request.getPrice());
        }
        if (request.getDuration() != null) {
            serviceOffer.setDuration(request.getDuration());
        }
        if (request.getImages() != null) {
            serviceOffer.setImages(request.getImages());
        }
        if (request.getCategory() != null) {
            serviceOffer.setCategory(request.getCategory());
        }
        if (request.getServiceType() != null) {
            serviceOffer.setServiceType(request.getServiceType());
        }
        if (request.getIsGuestFavorite() != null) {
            serviceOffer.setIsGuestFavorite(request.getIsGuestFavorite());
        }
        if (request.getAvailabilityDays() != null) {
            serviceOffer.setAvailabilityDays(request.getAvailabilityDays());
        }
        if (request.getAvailabilityTimeSlots() != null) {
            serviceOffer.setAvailabilityTimeSlots(request.getAvailabilityTimeSlots());
        }
        if (request.getRequirements() != null) {
            serviceOffer.setRequirements(request.getRequirements());
        }
        if (request.getIncluded() != null) {
            serviceOffer.setIncluded(request.getIncluded());
        }
        if (request.getMaxGuests() != null) {
            serviceOffer.setMaxGuests(request.getMaxGuests());
        }
        if (request.getProvider() != null) {
            serviceOffer.setProvider(request.getProvider());
        }
        if (request.getIsAvailable() != null) {
            serviceOffer.setIsAvailable(request.getIsAvailable());
        }

        return serviceOfferRepository.save(serviceOffer);
    }

    public ServiceOffer getServiceOfferById(Long serviceId) {
        Optional<ServiceOffer> serviceOpt = serviceOfferRepository.findById(serviceId);
        if (serviceOpt.isEmpty()) {
            throw new PropertyException("Service offer not found with id: " + serviceId);
        }
        return serviceOpt.get();
    }

    public List<ServiceOffer> getAllServiceOffers() {
        return serviceOfferRepository.findAllAvailableServiceOffers();
    }

    public List<ServiceOffer> getAllServiceOffersExcludingUser(String userEmail) {
        return serviceOfferRepository.findAllAvailableServiceOffersExcludingProvider(userEmail);
    }

    public List<ServiceOffer> getServiceOffersByProviderEmail(String providerEmail) {
        return serviceOfferRepository.findAvailableServiceOffersByProviderEmail(providerEmail);
    }

    public List<ServiceOffer> getServiceOffersByCategory(ServiceOffer.ServiceCategory category) {
        return serviceOfferRepository.findByCategory(category);
    }

    public List<ServiceOffer> getServiceOffersByServiceType(ServiceOffer.ServiceType serviceType) {
        return serviceOfferRepository.findByServiceType(serviceType);
    }

    public List<ServiceOffer> getServiceOffersByPriceRange(Double minPrice, Double maxPrice) {
        return serviceOfferRepository.findByPriceRange(minPrice, maxPrice);
    }

    public List<ServiceOffer> getServiceOffersByLocation(String location) {
        return serviceOfferRepository.findByLocationContaining(location);
    }

    public boolean isServiceOfferOwner(Long serviceId, String providerEmail) {
        Optional<ServiceOffer> serviceOpt = serviceOfferRepository.findByIdAndProviderEmail(serviceId, providerEmail);
        return serviceOpt.isPresent();
    }

    public void deleteServiceOffer(Long serviceId, String providerEmail) {
        Optional<ServiceOffer> serviceOpt = serviceOfferRepository.findByIdAndProviderEmail(serviceId, providerEmail);
        if (serviceOpt.isEmpty()) {
            throw new PropertyException("Service offer not found or you don't have permission to delete it");
        }
        serviceOfferRepository.delete(serviceOpt.get());
    }

    public ServiceOffer toggleServiceOfferAvailability(Long serviceId, String providerEmail) {
        Optional<ServiceOffer> serviceOpt = serviceOfferRepository.findByIdAndProviderEmail(serviceId, providerEmail);
        if (serviceOpt.isEmpty()) {
            throw new PropertyException("Service offer not found or you don't have permission to update it");
        }

        ServiceOffer serviceOffer = serviceOpt.get();
        serviceOffer.setIsAvailable(!serviceOffer.getIsAvailable());
        return serviceOfferRepository.save(serviceOffer);
    }
}