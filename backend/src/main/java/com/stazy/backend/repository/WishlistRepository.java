package com.stazy.backend.repository;

import com.stazy.backend.model.Wishlist;
import com.stazy.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

    // Find all wishlist items for a user
    List<Wishlist> findByUser(User user);

    // Find wishlist items by user email
    @Query("SELECT w FROM Wishlist w WHERE w.user.email = :userEmail")
    List<Wishlist> findByUserEmail(@Param("userEmail") String userEmail);

    // Check if a property is in user's wishlist
    @Query("SELECT w FROM Wishlist w WHERE w.user.email = :userEmail AND w.property.id = :propertyId")
    Optional<Wishlist> findByUserEmailAndPropertyId(@Param("userEmail") String userEmail,
            @Param("propertyId") Long propertyId);

    // Check if a service is in user's wishlist
    @Query("SELECT w FROM Wishlist w WHERE w.user.email = :userEmail AND w.service.id = :serviceId")
    Optional<Wishlist> findByUserEmailAndServiceId(@Param("userEmail") String userEmail,
            @Param("serviceId") Long serviceId);

    // Check if an experience is in user's wishlist
    @Query("SELECT w FROM Wishlist w WHERE w.user.email = :userEmail AND w.experience.id = :experienceId")
    Optional<Wishlist> findByUserEmailAndExperienceId(@Param("userEmail") String userEmail,
            @Param("experienceId") Long experienceId);

    // Delete wishlist item by user email and entity ID
    @Modifying
    @Transactional
    @Query("DELETE FROM Wishlist w WHERE w.user.email = :userEmail AND w.property.id = :entityId")
    void deleteByUserEmailAndPropertyId(@Param("userEmail") String userEmail, @Param("entityId") Long entityId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Wishlist w WHERE w.user.email = :userEmail AND w.service.id = :entityId")
    void deleteByUserEmailAndServiceId(@Param("userEmail") String userEmail, @Param("entityId") Long entityId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Wishlist w WHERE w.user.email = :userEmail AND w.experience.id = :entityId")
    void deleteByUserEmailAndExperienceId(@Param("userEmail") String userEmail, @Param("entityId") Long entityId);

    // Count wishlist items for a user
    @Query("SELECT COUNT(w) FROM Wishlist w WHERE w.user.email = :userEmail")
    Long countByUserEmail(@Param("userEmail") String userEmail);
}