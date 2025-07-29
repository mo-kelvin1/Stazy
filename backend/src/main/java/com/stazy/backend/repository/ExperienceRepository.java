package com.stazy.backend.repository;

import com.stazy.backend.model.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Long> {

    List<Experience> findByHostEmail(String hostEmail);

    List<Experience> findByIsAvailableTrue();

    Optional<Experience> findByIdAndHostEmail(Long id, String hostEmail);

    @Query("SELECT e FROM Experience e WHERE e.isAvailable = true ORDER BY e.createdAt DESC")
    List<Experience> findAllAvailableExperiences();

    @Query("SELECT e FROM Experience e WHERE e.hostEmail = :hostEmail AND e.isAvailable = true")
    List<Experience> findAvailableExperiencesByHostEmail(@Param("hostEmail") String hostEmail);

    @Query("SELECT e FROM Experience e WHERE e.category = :category AND e.isAvailable = true")
    List<Experience> findByCategory(@Param("category") Experience.ExperienceCategory category);

    @Query("SELECT e FROM Experience e WHERE e.experienceType = :experienceType AND e.isAvailable = true")
    List<Experience> findByExperienceType(@Param("experienceType") Experience.ExperienceType experienceType);

    @Query("SELECT e FROM Experience e WHERE e.price BETWEEN :minPrice AND :maxPrice AND e.isAvailable = true")
    List<Experience> findByPriceRange(@Param("minPrice") Double minPrice, @Param("maxPrice") Double maxPrice);

    @Query("SELECT e FROM Experience e WHERE e.location LIKE %:location% AND e.isAvailable = true")
    List<Experience> findByLocationContaining(@Param("location") String location);

    @Query("SELECT e FROM Experience e WHERE LOWER(e.title) LIKE LOWER(CONCAT('%', :title, '%')) AND e.isAvailable = true")
    List<Experience> findByTitleContainingIgnoreCase(@Param("title") String title);

    @Query("SELECT e FROM Experience e WHERE e.isAvailable = true AND e.hostEmail != :excludeHostEmail ORDER BY e.createdAt DESC")
    Page<Experience> findAllAvailableExperiencesExcludingHost(@Param("excludeHostEmail") String excludeHostEmail, Pageable pageable);

    @Query("SELECT e FROM Experience e WHERE e.difficulty = :difficulty AND e.isAvailable = true")
    List<Experience> findByDifficulty(@Param("difficulty") Experience.Difficulty difficulty);

    @Query("SELECT e FROM Experience e WHERE e.duration BETWEEN :minDuration AND :maxDuration AND e.isAvailable = true")
    List<Experience> findByDurationRange(@Param("minDuration") Integer minDuration,
            @Param("maxDuration") Integer maxDuration);
}