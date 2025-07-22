package com.stazy.backend.service;

import com.stazy.backend.dto.CreateExperienceRequest;
import com.stazy.backend.dto.UpdateExperienceRequest;
import com.stazy.backend.exception.PropertyException;
import com.stazy.backend.model.Experience;
import com.stazy.backend.model.User;
import com.stazy.backend.repository.ExperienceRepository;
import com.stazy.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExperienceService {

    @Autowired
    private ExperienceRepository experienceRepository;

    @Autowired
    private UserRepository userRepository;

    public Experience createExperience(CreateExperienceRequest request, String hostEmail) {
        // Verify that the user exists
        Optional<User> userOpt = userRepository.findByEmail(hostEmail);
        if (userOpt.isEmpty()) {
            throw new PropertyException("User not found with email: " + hostEmail);
        }

        // Validate that experienceType is provided
        if (request.getExperienceType() == null) {
            throw new PropertyException("Experience type is required");
        }

        Experience experience = new Experience();
        experience.setExperienceType(request.getExperienceType());
        experience.setHostEmail(hostEmail);
        experience.setHostName(userOpt.get().getFirstName() + " " + userOpt.get().getLastName());

        // Set optional fields if provided
        if (request.getTitle() != null) {
            experience.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            experience.setDescription(request.getDescription());
        }
        if (request.getLocation() != null) {
            experience.setLocation(request.getLocation());
        }
        if (request.getPrice() != null) {
            experience.setPrice(request.getPrice());
        }
        if (request.getDuration() != null) {
            experience.setDuration(request.getDuration());
        }
        if (request.getImages() != null) {
            experience.setImages(request.getImages());
        }
        if (request.getCategory() != null) {
            experience.setCategory(request.getCategory());
        }
        if (request.getDifficulty() != null) {
            experience.setDifficulty(request.getDifficulty());
        }
        if (request.getMinimumAge() != null) {
            experience.getAgeRestriction().setMinimum(request.getMinimumAge());
        }
        if (request.getMaximumAge() != null) {
            experience.getAgeRestriction().setMaximum(request.getMaximumAge());
        }
        if (request.getMaxParticipants() != null) {
            experience.setMaxParticipants(request.getMaxParticipants());
        }
        if (request.getIncluded() != null) {
            experience.setIncluded(request.getIncluded());
        }
        if (request.getToBring() != null) {
            experience.setToBring(request.getToBring());
        }
        if (request.getMeetingPoint() != null) {
            experience.setMeetingPoint(request.getMeetingPoint());
        }
        if (request.getLanguages() != null) {
            experience.setLanguages(request.getLanguages());
        }
        if (request.getAvailabilityDays() != null) {
            experience.getAvailability().setDays(request.getAvailabilityDays());
        }
        if (request.getAvailabilityTimeSlots() != null) {
            experience.getAvailability().setTimeSlots(request.getAvailabilityTimeSlots());
        }
        if (request.getIsGuestFavorite() != null) {
            experience.setIsGuestFavorite(request.getIsGuestFavorite());
        }
        if (request.getIsAvailable() != null) {
            experience.setIsAvailable(request.getIsAvailable());
        }

        return experienceRepository.save(experience);
    }

    public Experience updateExperience(Long experienceId, UpdateExperienceRequest request, String hostEmail) {
        Optional<Experience> experienceOpt = experienceRepository.findByIdAndHostEmail(experienceId, hostEmail);
        if (experienceOpt.isEmpty()) {
            throw new PropertyException("Experience not found or you don't have permission to update it");
        }

        Experience experience = experienceOpt.get();

        // Update only the fields that are provided in the request
        if (request.getTitle() != null) {
            experience.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            experience.setDescription(request.getDescription());
        }
        if (request.getLocation() != null) {
            experience.setLocation(request.getLocation());
        }
        if (request.getPrice() != null) {
            experience.setPrice(request.getPrice());
        }
        if (request.getDuration() != null) {
            experience.setDuration(request.getDuration());
        }
        if (request.getImages() != null) {
            experience.setImages(request.getImages());
        }
        if (request.getCategory() != null) {
            experience.setCategory(request.getCategory());
        }
        if (request.getExperienceType() != null) {
            experience.setExperienceType(request.getExperienceType());
        }
        if (request.getDifficulty() != null) {
            experience.setDifficulty(request.getDifficulty());
        }
        if (request.getMinimumAge() != null) {
            experience.getAgeRestriction().setMinimum(request.getMinimumAge());
        }
        if (request.getMaximumAge() != null) {
            experience.getAgeRestriction().setMaximum(request.getMaximumAge());
        }
        if (request.getMaxParticipants() != null) {
            experience.setMaxParticipants(request.getMaxParticipants());
        }
        if (request.getIncluded() != null) {
            experience.setIncluded(request.getIncluded());
        }
        if (request.getToBring() != null) {
            experience.setToBring(request.getToBring());
        }
        if (request.getMeetingPoint() != null) {
            experience.setMeetingPoint(request.getMeetingPoint());
        }
        if (request.getLanguages() != null) {
            experience.setLanguages(request.getLanguages());
        }
        if (request.getAvailabilityDays() != null) {
            experience.getAvailability().setDays(request.getAvailabilityDays());
        }
        if (request.getAvailabilityTimeSlots() != null) {
            experience.getAvailability().setTimeSlots(request.getAvailabilityTimeSlots());
        }
        if (request.getIsGuestFavorite() != null) {
            experience.setIsGuestFavorite(request.getIsGuestFavorite());
        }
        if (request.getIsAvailable() != null) {
            experience.setIsAvailable(request.getIsAvailable());
        }

        return experienceRepository.save(experience);
    }

    public Experience getExperienceById(Long experienceId) {
        Optional<Experience> experienceOpt = experienceRepository.findById(experienceId);
        if (experienceOpt.isEmpty()) {
            throw new PropertyException("Experience not found with id: " + experienceId);
        }
        return experienceOpt.get();
    }

    public List<Experience> getAllExperiences() {
        return experienceRepository.findAllAvailableExperiences();
    }

    public List<Experience> getAllExperiencesExcludingUser(String userEmail) {
        return experienceRepository.findAllAvailableExperiencesExcludingHost(userEmail);
    }

    public List<Experience> getExperiencesByHostEmail(String hostEmail) {
        return experienceRepository.findAvailableExperiencesByHostEmail(hostEmail);
    }

    public List<Experience> getExperiencesByCategory(Experience.ExperienceCategory category) {
        return experienceRepository.findByCategory(category);
    }

    public List<Experience> getExperiencesByExperienceType(Experience.ExperienceType experienceType) {
        return experienceRepository.findByExperienceType(experienceType);
    }

    public List<Experience> getExperiencesByPriceRange(Double minPrice, Double maxPrice) {
        return experienceRepository.findByPriceRange(minPrice, maxPrice);
    }

    public List<Experience> getExperiencesByLocation(String location) {
        return experienceRepository.findByLocationContaining(location);
    }

    public List<Experience> getExperiencesByDifficulty(Experience.Difficulty difficulty) {
        return experienceRepository.findByDifficulty(difficulty);
    }

    public List<Experience> getExperiencesByDurationRange(Integer minDuration, Integer maxDuration) {
        return experienceRepository.findByDurationRange(minDuration, maxDuration);
    }

    public boolean isExperienceOwner(Long experienceId, String hostEmail) {
        return experienceRepository.findByIdAndHostEmail(experienceId, hostEmail).isPresent();
    }

    public void deleteExperience(Long experienceId, String hostEmail) {
        Optional<Experience> experienceOpt = experienceRepository.findByIdAndHostEmail(experienceId, hostEmail);
        if (experienceOpt.isEmpty()) {
            throw new PropertyException("Experience not found or you don't have permission to delete it");
        }
        experienceRepository.delete(experienceOpt.get());
    }

    public Experience toggleExperienceAvailability(Long experienceId, String hostEmail) {
        Optional<Experience> experienceOpt = experienceRepository.findByIdAndHostEmail(experienceId, hostEmail);
        if (experienceOpt.isEmpty()) {
            throw new PropertyException("Experience not found or you don't have permission to update it");
        }

        Experience experience = experienceOpt.get();
        experience.setIsAvailable(!experience.getIsAvailable());
        return experienceRepository.save(experience);
    }

    public List<Experience> getExperiencesByTitle(String title) {
        return experienceRepository.findByTitleContainingIgnoreCase(title);
    }
}