package com.stazy.backend.repository;

import com.stazy.backend.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {

    List<Property> findByHostEmail(String hostEmail);

    List<Property> findByIsAvailableTrue();

    Optional<Property> findByIdAndHostEmail(Long id, String hostEmail);

    @Query("SELECT p FROM Property p WHERE p.isAvailable = true ORDER BY p.createdAt DESC")
    List<Property> findAllAvailableProperties();

    @Query("SELECT p FROM Property p WHERE p.hostEmail = :hostEmail AND p.isAvailable = true")
    List<Property> findAvailablePropertiesByHostEmail(@Param("hostEmail") String hostEmail);

    @Query("SELECT p FROM Property p WHERE p.category = :category AND p.isAvailable = true")
    List<Property> findByCategory(@Param("category") Property.PropertyCategory category);

    @Query("SELECT p FROM Property p WHERE p.propertyType = :propertyType AND p.isAvailable = true")
    List<Property> findByPropertyType(@Param("propertyType") Property.PropertyType propertyType);

    @Query("SELECT p FROM Property p WHERE p.price BETWEEN :minPrice AND :maxPrice AND p.isAvailable = true")
    List<Property> findByPriceRange(@Param("minPrice") Double minPrice, @Param("maxPrice") Double maxPrice);

    @Query("SELECT p FROM Property p WHERE p.location LIKE %:location% AND p.isAvailable = true")
    List<Property> findByLocationContaining(@Param("location") String location);

    @Query("SELECT p FROM Property p WHERE p.isAvailable = true AND ("
            + "LOWER(p.title) LIKE LOWER(CONCAT('%', :title, '%'))"
            + ")")
    List<Property> findByTitleContainingIgnoreCase(@Param("title") String title);

    @Query("SELECT p FROM Property p WHERE p.isAvailable = true AND p.hostEmail != :excludeHostEmail ORDER BY p.createdAt DESC")
    Page<Property> findAllAvailablePropertiesExcludingHost(@Param("excludeHostEmail") String excludeHostEmail, Pageable pageable);
}