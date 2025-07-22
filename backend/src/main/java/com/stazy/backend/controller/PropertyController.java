package com.stazy.backend.controller;

import com.stazy.backend.dto.*;
import com.stazy.backend.model.Property;
import com.stazy.backend.service.PropertyService;
import com.stazy.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "*")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> createProperty(@RequestBody CreatePropertyRequest request,
            @RequestHeader("Authorization") String authorization) {
        System.out.println("[DEBUG] Received createProperty request: " + request);
        try {
            // Extract token from Authorization header
            String token = authorization.replace("Bearer ", "");
            String hostEmail = jwtUtil.getEmailFromToken(token);
            System.out.println("[DEBUG] Host email: " + hostEmail);

            Property createdProperty = propertyService.createProperty(request, hostEmail);
            System.out.println("[DEBUG] Created property ID: " + createdProperty.getId());
            CreatePropertyResponse response = new CreatePropertyResponse(
                    createdProperty.getId(),
                    "Property created successfully");

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            System.out.println("[ERROR] Exception in createProperty: " + e.getMessage());
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PutMapping("/{propertyId}")
    public ResponseEntity<?> updateProperty(@PathVariable Long propertyId,
            @RequestBody UpdatePropertyRequest request,
            @RequestHeader("Authorization") String authorization) {
        try {
            // Extract token from Authorization header
            String token = authorization.replace("Bearer ", "");
            String hostEmail = jwtUtil.getEmailFromToken(token);

            Property updatedProperty = propertyService.updateProperty(propertyId, request, hostEmail);
            PropertyResponse response = PropertyResponse.fromProperty(updatedProperty);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/{propertyId}")
    public ResponseEntity<?> getPropertyById(@PathVariable Long propertyId,
            @RequestHeader("Authorization") String authorization) {
        try {
            Property property = propertyService.getPropertyById(propertyId);
            PropertyResponse response = PropertyResponse.fromProperty(property);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllProperties(@RequestHeader("Authorization") String authorization) {
        try {
            // Extract token from Authorization header
            String token = authorization.replace("Bearer ", "");
            String userEmail = jwtUtil.getEmailFromToken(token);

            List<Property> properties = propertyService.getAllPropertiesExcludingUser(userEmail);
            List<PropertyResponse> responses = properties.stream()
                    .map(PropertyResponse::fromProperty)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/my-properties")
    public ResponseEntity<?> getMyProperties(@RequestHeader("Authorization") String authorization) {
        try {
            // Extract token from Authorization header
            String token = authorization.replace("Bearer ", "");
            String hostEmail = jwtUtil.getEmailFromToken(token);

            List<Property> properties = propertyService.getPropertiesByHostEmail(hostEmail);
            List<PropertyResponse> responses = properties.stream()
                    .map(PropertyResponse::fromProperty)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<?> getPropertiesByCategory(@PathVariable String category,
            @RequestHeader("Authorization") String authorization) {
        try {
            Property.PropertyCategory propertyCategory = Property.PropertyCategory.valueOf(category.toUpperCase());
            List<Property> properties = propertyService.getPropertiesByCategory(propertyCategory);
            List<PropertyResponse> responses = properties.stream()
                    .map(PropertyResponse::fromProperty)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/type/{propertyType}")
    public ResponseEntity<?> getPropertiesByType(@PathVariable String propertyType,
            @RequestHeader("Authorization") String authorization) {
        try {
            Property.PropertyType type = Property.PropertyType.valueOf(propertyType.toUpperCase());
            List<Property> properties = propertyService.getPropertiesByPropertyType(type);
            List<PropertyResponse> responses = properties.stream()
                    .map(PropertyResponse::fromProperty)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/search/price")
    public ResponseEntity<?> getPropertiesByPriceRange(@RequestParam Double minPrice,
            @RequestParam Double maxPrice,
            @RequestHeader("Authorization") String authorization) {
        try {
            List<Property> properties = propertyService.getPropertiesByPriceRange(minPrice, maxPrice);
            List<PropertyResponse> responses = properties.stream()
                    .map(PropertyResponse::fromProperty)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/search/location")
    public ResponseEntity<?> getPropertiesByLocation(@RequestParam String location,
            @RequestHeader("Authorization") String authorization) {
        try {
            List<Property> properties = propertyService.getPropertiesByLocation(location);
            List<PropertyResponse> responses = properties.stream()
                    .map(PropertyResponse::fromProperty)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/search/name")
    public ResponseEntity<?> getPropertiesByTitle(@RequestParam String name,
            @RequestHeader("Authorization") String authorization) {
        try {
            List<Property> properties = propertyService.getPropertiesByTitle(name);
            List<PropertyResponse> responses = properties.stream()
                    .map(PropertyResponse::fromProperty)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @DeleteMapping("/{propertyId}")
    public ResponseEntity<?> deleteProperty(@PathVariable Long propertyId,
            @RequestHeader("Authorization") String authorization) {
        try {
            // Extract token from Authorization header
            String token = authorization.replace("Bearer ", "");
            String hostEmail = jwtUtil.getEmailFromToken(token);

            propertyService.deleteProperty(propertyId, hostEmail);
            return ResponseEntity.ok(new ApiResponse(true, "Property deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PatchMapping("/{propertyId}/toggle-availability")
    public ResponseEntity<?> togglePropertyAvailability(@PathVariable Long propertyId,
            @RequestHeader("Authorization") String authorization) {
        try {
            // Extract token from Authorization header
            String token = authorization.replace("Bearer ", "");
            String hostEmail = jwtUtil.getEmailFromToken(token);

            Property updatedProperty = propertyService.togglePropertyAvailability(propertyId, hostEmail);
            PropertyResponse response = PropertyResponse.fromProperty(updatedProperty);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PostMapping("/upload-image")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        System.out.println("[DEBUG] Received uploadImage request: " + file.getOriginalFilename());
        try {
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path uploadPath = Paths.get("uploads/" + filename);
            Files.createDirectories(uploadPath.getParent());
            Files.write(uploadPath, file.getBytes());
            String url = "http://10.30.22.161:8080/uploads/" + filename;
            System.out.println("[DEBUG] Uploaded image URL: " + url);
            return ResponseEntity.ok(url);
        } catch (Exception e) {
            System.out.println("[ERROR] Exception in uploadImage: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image");
        }
    }
}