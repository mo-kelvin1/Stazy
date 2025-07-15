package com.stazy.backend.controller;

import com.stazy.backend.dto.*;
import com.stazy.backend.model.ServiceOffer;
import com.stazy.backend.service.ServiceOfferService;
import com.stazy.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/service-offers")
@CrossOrigin(origins = "*")
public class ServiceOfferController {

    @Autowired
    private ServiceOfferService serviceOfferService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> createServiceOffer(@RequestBody CreateServiceOfferRequest request,
            @RequestHeader("Authorization") String authorization) {
        try {
            // Extract token from Authorization header
            String token = authorization.replace("Bearer ", "");
            String providerEmail = jwtUtil.getEmailFromToken(token);

            ServiceOffer createdServiceOffer = serviceOfferService.createServiceOffer(request, providerEmail);
            CreateServiceOfferResponse response = new CreateServiceOfferResponse(
                    createdServiceOffer.getId(),
                    "Service offer created successfully");

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PutMapping("/{serviceId}")
    public ResponseEntity<?> updateServiceOffer(@PathVariable Long serviceId,
            @RequestBody UpdateServiceOfferRequest request,
            @RequestHeader("Authorization") String authorization) {
        try {
            // Extract token from Authorization header
            String token = authorization.replace("Bearer ", "");
            String providerEmail = jwtUtil.getEmailFromToken(token);

            ServiceOffer updatedServiceOffer = serviceOfferService.updateServiceOffer(serviceId, request,
                    providerEmail);
            ServiceOfferResponse response = ServiceOfferResponse.fromServiceOffer(updatedServiceOffer);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/{serviceId}")
    public ResponseEntity<?> getServiceOfferById(@PathVariable Long serviceId,
            @RequestHeader("Authorization") String authorization) {
        try {
            ServiceOffer serviceOffer = serviceOfferService.getServiceOfferById(serviceId);
            ServiceOfferResponse response = ServiceOfferResponse.fromServiceOffer(serviceOffer);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllServiceOffers(@RequestHeader("Authorization") String authorization) {
        try {
            // Extract token from Authorization header
            String token = authorization.replace("Bearer ", "");
            String userEmail = jwtUtil.getEmailFromToken(token);

            List<ServiceOffer> serviceOffers = serviceOfferService.getAllServiceOffersExcludingUser(userEmail);
            List<ServiceOfferResponse> responses = serviceOffers.stream()
                    .map(ServiceOfferResponse::fromServiceOffer)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/my-services")
    public ResponseEntity<?> getMyServiceOffers(@RequestHeader("Authorization") String authorization) {
        try {
            // Extract token from Authorization header
            String token = authorization.replace("Bearer ", "");
            String providerEmail = jwtUtil.getEmailFromToken(token);

            List<ServiceOffer> serviceOffers = serviceOfferService.getServiceOffersByProviderEmail(providerEmail);
            List<ServiceOfferResponse> responses = serviceOffers.stream()
                    .map(ServiceOfferResponse::fromServiceOffer)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<?> getServiceOffersByCategory(@PathVariable String category,
            @RequestHeader("Authorization") String authorization) {
        try {
            ServiceOffer.ServiceCategory serviceCategory = ServiceOffer.ServiceCategory.valueOf(category.toUpperCase());
            List<ServiceOffer> serviceOffers = serviceOfferService.getServiceOffersByCategory(serviceCategory);
            List<ServiceOfferResponse> responses = serviceOffers.stream()
                    .map(ServiceOfferResponse::fromServiceOffer)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/type/{serviceType}")
    public ResponseEntity<?> getServiceOffersByType(@PathVariable String serviceType,
            @RequestHeader("Authorization") String authorization) {
        try {
            ServiceOffer.ServiceType type = ServiceOffer.ServiceType.valueOf(serviceType.toUpperCase());
            List<ServiceOffer> serviceOffers = serviceOfferService.getServiceOffersByServiceType(type);
            List<ServiceOfferResponse> responses = serviceOffers.stream()
                    .map(ServiceOfferResponse::fromServiceOffer)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/search/price")
    public ResponseEntity<?> getServiceOffersByPriceRange(@RequestParam Double minPrice,
            @RequestParam Double maxPrice,
            @RequestHeader("Authorization") String authorization) {
        try {
            List<ServiceOffer> serviceOffers = serviceOfferService.getServiceOffersByPriceRange(minPrice, maxPrice);
            List<ServiceOfferResponse> responses = serviceOffers.stream()
                    .map(ServiceOfferResponse::fromServiceOffer)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/search/location")
    public ResponseEntity<?> getServiceOffersByLocation(@RequestParam String location,
            @RequestHeader("Authorization") String authorization) {
        try {
            List<ServiceOffer> serviceOffers = serviceOfferService.getServiceOffersByLocation(location);
            List<ServiceOfferResponse> responses = serviceOffers.stream()
                    .map(ServiceOfferResponse::fromServiceOffer)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @DeleteMapping("/{serviceId}")
    public ResponseEntity<?> deleteServiceOffer(@PathVariable Long serviceId,
            @RequestHeader("Authorization") String authorization) {
        try {
            // Extract token from Authorization header
            String token = authorization.replace("Bearer ", "");
            String providerEmail = jwtUtil.getEmailFromToken(token);

            serviceOfferService.deleteServiceOffer(serviceId, providerEmail);
            return ResponseEntity.ok(new ApiResponse(true, "Service offer deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PatchMapping("/{serviceId}/toggle-availability")
    public ResponseEntity<?> toggleServiceOfferAvailability(@PathVariable Long serviceId,
            @RequestHeader("Authorization") String authorization) {
        try {
            // Extract token from Authorization header
            String token = authorization.replace("Bearer ", "");
            String providerEmail = jwtUtil.getEmailFromToken(token);

            ServiceOffer updatedServiceOffer = serviceOfferService.toggleServiceOfferAvailability(serviceId,
                    providerEmail);
            ServiceOfferResponse response = ServiceOfferResponse.fromServiceOffer(updatedServiceOffer);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }
}