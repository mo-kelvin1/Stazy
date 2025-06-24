// components/PropertyCard.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  ImageBackground,
  Pressable,
  ScrollView,
  Animated,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HomeItem } from "../../hooks/useHomeData";
import { hosts } from "../../data/hosts";
import { HostProfile } from "../../data/hosts";

const { width, height } = Dimensions.get("window");

interface PropertyCardProps {
  property: HomeItem | null;
  isVisible: boolean;
  onClose: () => void;
  likedItems: Set<string>;
  onHeartPress: (itemId: string) => void;
}

export default function PropertyCard({
  property,
  isVisible,
  onClose,
  likedItems,
  onHeartPress,
}: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const modalAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      setCurrentImageIndex(0);
      Animated.spring(modalAnimation, {
        toValue: 1,
        useNativeDriver: true,
        tension: 65,
        friction: 8,
      }).start();
    } else {
      Animated.timing(modalAnimation, {
        toValue: 0,
        duration: 170,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const handleClose = () => {
    onClose();
  };

  const handleHeartPress = () => {
    if (property) {
      onHeartPress(property.id);
    }
  };

  const nextImage = () => {
    const images = property?.images ?? [];
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    const images = property?.images ?? [];
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleShowAmenities = () => {
    setShowAllAmenities((prev) => !prev);
  };

  const handleReserve = () => {
    console.log("Reserve clicked");
  };

  const getAmenityIcon = (amenity: string) => {
    const iconMap: { [key: string]: string } = {
      Wifi: "wifi",
      "Home gym": "fitness",
      Parking: "car",
      Pool: "water",
      "Outdoor entertainment": "leaf",
      Kitchen: "restaurant",
      "Air conditioning": "snow",
    };
    return iconMap[amenity] || "checkmark-circle";
  };

  // Helper for amenity icons
  const amenityIconMap: { [key: string]: string } = {
    Wifi: "wifi",
    "Home gym": "barbell",
    Parking: "car",
    Pool: "water",
    "Outdoor entertainment": "leaf",
    Kitchen: "restaurant",
    "Air conditioning": "snow",
    Breakfast: "cafe",
    Fireplace: "flame",
    "Smart TV": "tv",
    "Private Pool": "water",
    "Garden Access": "flower",
    "Laundry Service": "shirt",
    "Shared Kitchen": "restaurant",
    "BBQ Grill": "flame",
    "Solar Power": "sunny",
    "Deck Lounge": "cafe",
    "Mini Fridge": "cube",
    "Outdoor Chairs": "chair",
    "Hot Tub": "water",
    "Board Games": "game-controller",
    "Breakfast Included": "cafe",
    Fan: "logo-fanlab",
    "Security System": "shield-checkmark",
    "Smart Lighting": "bulb",
    "Voice Assistants": "mic",
    Balcony: "business",
    "Air Conditioning": "snow",
    "Open Kitchen": "restaurant",
    "Outdoor Area": "leaf",
    "Fire Pit": "flame",
    "Wi-Fi": "wifi",
    // fallback
    default: "checkmark-circle",
  };

  // Helper to find host profile by name/email
  const getHostProfile = (
    name: string,
    email: string
  ): HostProfile | undefined => {
    return hosts.find(
      (h) =>
        h.name?.toLowerCase() === name?.toLowerCase() &&
        h.email?.toLowerCase() === email?.toLowerCase()
    );
  };

  if (!property) return null;

  // Determine type
  const type = property.type;

  // Common fields
  const images = Array.isArray(property.images)
    ? property.images
    : [property.images];
  const currentImage = images[currentImageIndex] ?? images[0];
  const hasMultipleImages = images.length > 1;

  // Render details based on type
  let detailsSection = null;
  if (type === "property") {
    detailsSection = (
      <View style={styles.modalContent}>
        <View style={styles.modalTitleSection}>
          <Text style={styles.modalTitle}>{property.title}</Text>
          <Text style={styles.modalLocation}>{property.location}</Text>
          <View style={styles.modalRatingContainer}>
            <Ionicons name="star" size={18} color="#FFD700" />
            <Text style={styles.modalRating}>{property.rating}</Text>
          </View>
          <Text style={styles.modalDetails}>
            ${property.price}{" "}
            {property.nights
              ? `for ${property.nights} night${property.nights > 1 ? "s" : ""}`
              : ""}
          </Text>
        </View>
        <View style={[styles.section, styles.sectionCard]}>
          <Text style={styles.sectionHeader}>Details</Text>
          <View style={styles.detailRow}>
            <Ionicons
              name="home"
              size={18}
              color="#007AFF"
              style={styles.detailIcon}
            />
            <Text>Type: {property.propertyType}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name="people"
              size={18}
              color="#007AFF"
              style={styles.detailIcon}
            />
            <Text>Guests: {property.guests}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name="bed"
              size={18}
              color="#007AFF"
              style={styles.detailIcon}
            />
            <Text>Bedrooms: {property.bedrooms}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name="bed-outline"
              size={18}
              color="#007AFF"
              style={styles.detailIcon}
            />
            <Text>Beds: {property.beds}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name="water"
              size={18}
              color="#007AFF"
              style={styles.detailIcon}
            />
            <Text>Bathrooms: {property.bathrooms}</Text>
          </View>
        </View>
        <View style={[styles.section, styles.sectionCard]}>
          <Text style={styles.sectionHeader}>Amenities</Text>
          {(property.amenities || []).map((amenity, idx) => (
            <View key={idx} style={styles.amenityRow}>
              <Ionicons
                name={
                  (amenityIconMap[amenity] || amenityIconMap.default) as any
                }
                size={20}
                color="#007AFF"
                style={{ marginRight: 10 }}
              />
              <Text>{amenity}</Text>
            </View>
          ))}
        </View>
        <View style={[styles.section, styles.sectionCard]}>
          <Text style={styles.sectionHeader}>Highlights</Text>
          <Text>{(property.highlights || []).join(", ")}</Text>
        </View>
        <View style={[styles.section, styles.sectionCard]}>
          <Text style={styles.sectionHeader}>Host</Text>
          {property.host && property.hostEmail && (
            <TouchableOpacity
              style={styles.hostProfileCard}
              onPress={() => {
                const hostProfile = getHostProfile(
                  property.host,
                  property.hostEmail
                );
              }}
              activeOpacity={0.7}
            >
              <View style={styles.hostAvatarLarge}>
                <Text style={styles.hostAvatarInitial}>
                  {property.host?.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text style={styles.hostNameLarge}>{property.host}</Text>
              <Text style={styles.hostEmail}>{property.hostEmail}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={[styles.section, styles.createdSection]}>
          <Ionicons
            name="calendar"
            size={18}
            color="#007AFF"
            style={styles.detailIcon}
          />
          <Text style={styles.createdText}>
            Created:{" "}
            {property.createdAt?.toLocaleString?.() ||
              String(property.createdAt)}
          </Text>
        </View>
        <TouchableOpacity style={styles.reserveButton} onPress={handleReserve}>
          <Text style={styles.reserveButtonText}>Reserve</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (type === "service") {
    detailsSection = (
      <View style={styles.modalContent}>
        <View style={styles.modalTitleSection}>
          <Text style={styles.modalTitle}>{property.title}</Text>
          <Text style={styles.modalLocation}>{property.location}</Text>
          <View style={styles.modalRatingContainer}>
            <Ionicons name="star" size={18} color="#FFD700" />
            <Text style={styles.modalRating}>{property.rating}</Text>
          </View>
          <Text style={styles.modalDetails}>
            ${property.price} • {property.duration} hour(s)
          </Text>
        </View>
        <View style={[styles.section, styles.sectionCard]}>
          <Text style={styles.sectionHeader}>Provider</Text>
          {property.provider && property.providerEmail && (
            <TouchableOpacity
              style={styles.hostProfileCard}
              onPress={() => {
                const hostProfile = getHostProfile(
                  property.provider,
                  property.providerEmail
                );
              }}
              activeOpacity={0.7}
            >
              <View style={styles.hostAvatarLarge}>
                <Text style={styles.hostAvatarInitial}>
                  {property.provider?.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text style={styles.hostNameLarge}>{property.provider}</Text>
              <Text style={styles.hostEmail}>{property.providerEmail}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={[styles.section, styles.sectionCard]}>
          <Text style={styles.sectionHeader}>Type & Category</Text>
          <View style={styles.detailRow}>
            <Ionicons
              name="construct"
              size={18}
              color="#007AFF"
              style={styles.detailIcon}
            />
            <Text>Type: {property.serviceType}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name="pricetag"
              size={18}
              color="#007AFF"
              style={styles.detailIcon}
            />
            <Text>Category: {property.category}</Text>
          </View>
        </View>
        <View style={[styles.section, styles.sectionCard]}>
          <Text style={styles.sectionHeader}>Included</Text>
          {(property.included || []).map((item, idx) => (
            <View key={idx} style={styles.amenityRow}>
              <Ionicons
                name="checkmark-circle"
                size={20}
                color="#34C759"
                style={{ marginRight: 10 }}
              />
              <Text>{item}</Text>
            </View>
          ))}
        </View>
        <View style={[styles.section, styles.sectionCard]}>
          <Text style={styles.sectionHeader}>Requirements</Text>
          {(property.requirements || []).map((item, idx) => (
            <View key={idx} style={styles.amenityRow}>
              <Ionicons
                name="alert-circle"
                size={20}
                color="#FF9500"
                style={{ marginRight: 10 }}
              />
              <Text>{item}</Text>
            </View>
          ))}
        </View>
        <View style={[styles.section, styles.sectionCard]}>
          <Text style={styles.sectionHeader}>Max Guests</Text>
          <View style={styles.detailRow}>
            <Ionicons
              name="people"
              size={18}
              color="#007AFF"
              style={styles.detailIcon}
            />
            <Text>{property.maxGuests}</Text>
          </View>
        </View>
        <View style={[styles.section, styles.sectionCard]}>
          <Text style={styles.sectionHeader}>Availability</Text>
          <View style={styles.detailRow}>
            <Ionicons
              name="calendar"
              size={18}
              color="#007AFF"
              style={styles.detailIcon}
            />
            <Text>{property.availability?.days?.join(", ")}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name="time"
              size={18}
              color="#007AFF"
              style={styles.detailIcon}
            />
            <Text>{property.availability?.timeSlots?.join(", ")}</Text>
          </View>
        </View>
        <View style={[styles.section, styles.createdSection]}>
          <Ionicons
            name="calendar"
            size={18}
            color="#007AFF"
            style={styles.detailIcon}
          />
          <Text style={styles.createdText}>
            Created:{" "}
            {property.createdAt?.toLocaleString?.() ||
              String(property.createdAt)}
          </Text>
        </View>
        <TouchableOpacity style={styles.reserveButton} onPress={handleReserve}>
          <Text style={styles.reserveButtonText}>Reserve</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (type === "experience") {
    detailsSection = (
      <View style={styles.modalContent}>
        <View style={styles.modalTitleSection}>
          <Text style={styles.modalTitle}>{property.title}</Text>
          <Text style={styles.modalLocation}>{property.location}</Text>
          <View style={styles.modalRatingContainer}>
            <Ionicons name="star" size={18} color="#FFD700" />
            <Text style={styles.modalRating}>{property.rating}</Text>
          </View>
          <Text style={styles.modalDetails}>
            ${property.price} • {property.duration} hour(s)
          </Text>
        </View>
        <View style={[styles.section, styles.sectionCard]}>
          <Text style={styles.sectionHeader}>Host</Text>
          {property.hostName && property.hostEmail && (
            <TouchableOpacity
              style={styles.hostProfileCard}
              onPress={() => {
                const hostProfile = getHostProfile(
                  property.hostName,
                  property.hostEmail
                );
              }}
              activeOpacity={0.7}
            >
              <View style={styles.hostAvatarLarge}>
                <Text style={styles.hostAvatarInitial}>
                  {property.hostName?.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text style={styles.hostNameLarge}>{property.hostName}</Text>
              <Text style={styles.hostEmail}>{property.hostEmail}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={[styles.section, styles.sectionCard]}>
          <Text style={styles.sectionHeader}>Type & Category</Text>
          <View style={styles.detailRow}>
            <Ionicons
              name="construct"
              size={18}
              color="#007AFF"
              style={styles.detailIcon}
            />
            <Text>Type: {property.experienceType}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name="pricetag"
              size={18}
              color="#007AFF"
              style={styles.detailIcon}
            />
            <Text>Category: {property.category}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name="barbell"
              size={18}
              color="#007AFF"
              style={styles.detailIcon}
            />
            <Text>Difficulty: {property.difficulty}</Text>
          </View>
        </View>
        <View style={[styles.section, styles.sectionCard]}>
          <Text style={styles.sectionHeader}>Included</Text>
          {(property.included || []).map((item, idx) => (
            <View key={idx} style={styles.amenityRow}>
              <Ionicons
                name="checkmark-circle"
                size={20}
                color="#34C759"
                style={{ marginRight: 10 }}
              />
              <Text>{item}</Text>
            </View>
          ))}
        </View>
        <View style={[styles.section, styles.sectionCard]}>
          <Text style={styles.sectionHeader}>To Bring</Text>
          {(property.toBring || []).map((item, idx) => (
            <View key={idx} style={styles.amenityRow}>
              <Ionicons
                name="briefcase"
                size={20}
                color="#FF9500"
                style={{ marginRight: 10 }}
              />
              <Text>{item}</Text>
            </View>
          ))}
        </View>
        <View style={[styles.section, styles.sectionCard]}>
          <Text style={styles.sectionHeader}>Meeting Point</Text>
          <View style={styles.detailRow}>
            <Ionicons
              name="navigate"
              size={18}
              color="#007AFF"
              style={styles.detailIcon}
            />
            <Text>{property.meetingPoint}</Text>
          </View>
        </View>
        <View style={[styles.section, styles.sectionCard]}>
          <Text style={styles.sectionHeader}>Languages</Text>
          <View style={styles.detailRow}>
            <Ionicons
              name="language"
              size={18}
              color="#007AFF"
              style={styles.detailIcon}
            />
            <Text>{(property.languages || []).join(", ")}</Text>
          </View>
        </View>
        <View style={[styles.section, styles.sectionCard]}>
          <Text style={styles.sectionHeader}>Max Participants</Text>
          <View style={styles.detailRow}>
            <Ionicons
              name="people"
              size={18}
              color="#007AFF"
              style={styles.detailIcon}
            />
            <Text>{property.maxParticipants}</Text>
          </View>
        </View>
        <View style={[styles.section, styles.sectionCard]}>
          <Text style={styles.sectionHeader}>Age Restriction</Text>
          <View style={styles.detailRow}>
            <Ionicons
              name="alert"
              size={18}
              color="#007AFF"
              style={styles.detailIcon}
            />
            <Text>
              {property.ageRestriction?.minimum}
              {property.ageRestriction?.maximum
                ? `-${property.ageRestriction.maximum}`
                : "+"}
            </Text>
          </View>
        </View>
        <View style={[styles.section, styles.sectionCard]}>
          <Text style={styles.sectionHeader}>Availability</Text>
          <View style={styles.detailRow}>
            <Ionicons
              name="calendar"
              size={18}
              color="#007AFF"
              style={styles.detailIcon}
            />
            <Text>{property.availability?.days?.join(", ")}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name="time"
              size={18}
              color="#007AFF"
              style={styles.detailIcon}
            />
            <Text>{property.availability?.timeSlots?.join(", ")}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.reserveButton} onPress={handleReserve}>
          <Text style={styles.reserveButtonText}>Reserve</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const amenities = [
    "Outdoor entertainment",
    "Home gym",
    "Wifi",
    "Pool",
    "Parking",
    "Kitchen",
    "Air conditioning",
  ];

  const displayedAmenities = showAllAmenities
    ? amenities
    : amenities.slice(0, 3);

  const modalScale = modalAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const modalTranslateY = modalAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  return (
    <>
      <Modal
        visible={isVisible}
        transparent
        animationType="none"
        onRequestClose={handleClose}
      >
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalBackdrop} onPress={handleClose} />
          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [
                  { scale: modalScale },
                  { translateY: modalTranslateY },
                ],
                opacity: modalAnimation,
              },
            ]}
          >
            {/* Header + Image Section */}
            <View style={styles.modalImageContainer}>
              <ImageBackground
                source={{ uri: currentImage }}
                style={[styles.modalImage, { width: width, height: 300 }]}
                imageStyle={styles.modalImageStyle}
                resizeMode="cover"
              >
                <View style={styles.modalHeader}>
                  <TouchableOpacity
                    onPress={handleClose}
                    style={styles.modalCloseButton}
                  >
                    <Ionicons name="close" size={24} color="#000" />
                  </TouchableOpacity>
                  <View style={styles.modalHeaderRight}>
                    <TouchableOpacity
                      onPress={handleHeartPress}
                      style={styles.modalActionButton}
                    >
                      <Ionicons
                        name={
                          likedItems.has(property.id)
                            ? "heart"
                            : "heart-outline"
                        }
                        size={20}
                        color={likedItems.has(property.id) ? "#FF385C" : "#000"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Navigation Buttons */}
                {hasMultipleImages && (
                  <>
                    <TouchableOpacity
                      onPress={prevImage}
                      style={[styles.imageNavButton, styles.imageNavLeft]}
                    >
                      <Ionicons name="chevron-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={nextImage}
                      style={[styles.imageNavButton, styles.imageNavRight]}
                    >
                      <Ionicons name="chevron-forward" size={24} color="#000" />
                    </TouchableOpacity>
                    <View style={styles.imageCounter}>
                      <Text style={styles.imageCounterText}>
                        {currentImageIndex + 1} / {images.length}
                      </Text>
                    </View>
                  </>
                )}
              </ImageBackground>
            </View>

            {/* Scrollable Content */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 0 }}
            >
              {detailsSection}
            </ScrollView>
            {/* Description */}
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 0,
    overflow: "hidden",
  },
  modalImageContainer: {
    height: 300,
    width: "100%",
    position: "relative",
  },
  modalImage: {
    width: "100%",
    height: 300,
    justifyContent: "space-between",
  },
  modalImageStyle: {
    borderRadius: 0,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
  },
  modalCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeaderRight: {
    flexDirection: "row",
    gap: 12,
  },
  modalActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageNavButton: {
    position: "absolute",
    top: "50%",
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateY: -22 }],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageNavLeft: {
    left: 20,
  },
  imageNavRight: {
    right: 20,
  },
  imageCounter: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  imageCounterText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  modalContent: {
    flex: 1,
    margin: 30,
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 0,
  },
  modalTitleSection: {
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
    lineHeight: 32,
  },
  modalLocation: {
    fontSize: 18,
    color: "#717171",
    marginBottom: 6,
  },
  modalDetails: {
    fontSize: 16,
    color: "#717171",
    marginBottom: 12,
  },
  modalRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalRating: {
    marginLeft: 6,
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
  modalReviews: {
    marginLeft: 6,
    fontSize: 18,
    color: "#717171",
  },
  hostContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    padding: 0,
    borderRadius: 16,
    marginBottom: 24,
  },
  hostAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    position: "relative",
  },
  hostAvatarText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  superhostBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  hostInfo: {
    flex: 1,
  },
  hostName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    marginBottom: 4,
  },
  hostDetails: {
    fontSize: 16,
    color: "#717171",
  },
  amenitiesContainer: {
    marginBottom: 24,
  },
  amenitiesTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#222",
    marginBottom: 16,
  },
  amenityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  amenityText: {
    marginLeft: 16,
    fontSize: 18,
    color: "#222",
  },
  showMoreButton: {
    marginTop: 12,
  },
  showMoreText: {
    fontSize: 18,
    color: "#0066CC",
    fontWeight: "600",
  },
  specialNotice: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8F0",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FFE4B5",
    marginBottom: 24,
  },
  specialNoticeIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  specialNoticeText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#D2691E",
  },
  roomTypeContainer: {
    marginBottom: 24,
  },
  roomTypeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  roomTypeTitle: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
  roomTypeDescription: {
    marginLeft: 36,
    fontSize: 16,
    color: "#717171",
    lineHeight: 24,
  },
  modalBottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    backgroundColor: "white",
  },
  priceContainer: {
    flex: 1,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  modalPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
  },
  priceLabel: {
    marginLeft: 6,
    fontSize: 18,
    color: "#717171",
  },
  priceDetails: {
    fontSize: 16,
    color: "#717171",
    marginTop: 6,
  },
  cancellationInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  cancellationText: {
    marginLeft: 6,
    fontSize: 16,
    color: "#00A699",
    fontWeight: "500",
  },
  reserveButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    minWidth: 140,
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  reserveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  imageDotsContainer: {
    position: "absolute",
    bottom: 8,
    right: 8,
    flexDirection: "row",
  },
  imageDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "white",
    marginRight: 4,
  },
  imageDotActive: {
    backgroundColor: "#FF385C",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  activeDot: {
    backgroundColor: "#FF385C",
  },
  imageInfoText: {
    fontSize: 14,
    color: "#717171",
    marginLeft: 6,
  },
  section: {
    marginBottom: 18,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
    marginBottom: 4,
    marginTop: 8,
  },
  sectionCard: {
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 10,
    marginHorizontal: 0,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  amenityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  detailIcon: {
    marginRight: 8,
  },
  createdSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F7FF",
    borderRadius: 12,
    padding: 8,
    marginTop: 8,
    marginBottom: 14,
    marginHorizontal: 0,
  },
  createdText: {
    marginLeft: 8,
    color: "#222",
    fontSize: 15,
  },
  hostProfileCard: {
    alignItems: "center",
    marginVertical: 10,
  },
  hostAvatarLarge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#007AFF22",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  hostAvatarInitial: {
    fontSize: 36,
    color: "#007AFF",
    fontWeight: "bold",
  },
  hostNameLarge: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 2,
  },
  hostEmail: {
    fontSize: 15,
    color: "#888",
  },
});
