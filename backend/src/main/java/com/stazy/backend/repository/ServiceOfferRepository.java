package com.stazy.backend.repository;

import com.stazy.backend.model.ServiceOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface ServiceOfferRepository extends JpaRepository<ServiceOffer, Long> {

    List<ServiceOffer> findByProviderEmail(String providerEmail);

    List<ServiceOffer> findByIsAvailableTrue();

    Optional<ServiceOffer> findByIdAndProviderEmail(Long id, String providerEmail);

    @Query("SELECT s FROM ServiceOffer s WHERE s.isAvailable = true ORDER BY s.createdAt DESC")
    List<ServiceOffer> findAllAvailableServiceOffers();

    @Query("SELECT s FROM ServiceOffer s WHERE s.providerEmail = :providerEmail AND s.isAvailable = true")
    List<ServiceOffer> findAvailableServiceOffersByProviderEmail(@Param("providerEmail") String providerEmail);

    @Query("SELECT s FROM ServiceOffer s WHERE s.category = :category AND s.isAvailable = true")
    List<ServiceOffer> findByCategory(@Param("category") ServiceOffer.ServiceCategory category);

    @Query("SELECT s FROM ServiceOffer s WHERE s.serviceType = :serviceType AND s.isAvailable = true")
    List<ServiceOffer> findByServiceType(@Param("serviceType") ServiceOffer.ServiceType serviceType);

    @Query("SELECT s FROM ServiceOffer s WHERE s.price BETWEEN :minPrice AND :maxPrice AND s.isAvailable = true")
    List<ServiceOffer> findByPriceRange(@Param("minPrice") Double minPrice, @Param("maxPrice") Double maxPrice);

    @Query("SELECT s FROM ServiceOffer s WHERE s.location LIKE %:location% AND s.isAvailable = true")
    List<ServiceOffer> findByLocationContaining(@Param("location") String location);

    @Query("SELECT s FROM ServiceOffer s WHERE LOWER(s.title) LIKE LOWER(CONCAT('%', :title, '%')) AND s.isAvailable = true")
    List<ServiceOffer> findByTitleContainingIgnoreCase(@Param("title") String title);

    @Query("SELECT s FROM ServiceOffer s WHERE s.isAvailable = true AND s.providerEmail != :excludeProviderEmail ORDER BY s.createdAt DESC")
    Page<ServiceOffer> findAllAvailableServiceOffersExcludingProvider(@Param("excludeProviderEmail") String excludeProviderEmail, Pageable pageable);
}