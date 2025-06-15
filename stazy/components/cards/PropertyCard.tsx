// components/PropertyCard.tsx - Updated to properly handle image arrays
import React, { useState, useRef } from "react";
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Property } from "../../data/mockProperties";

const { width, height } = Dimensions.get("window");

interface PropertyCardProps {
  property: Property | null;
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

  React.useEffect(() => {
    if (isVisible) {
      console.log("PropertyCard: Modal opened for property:", property?.id);
      // Reset image index when modal opens
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
    console.log("PropertyCard: Close button clicked");
    onClose();
  };

  const handleShare = () => {
    console.log(
      "PropertyCard: Share button clicked for property:",
      property?.id
    );
  };

  const handleHeartPress = () => {
    if (property) {
      console.log(
        "PropertyCard: Heart button clicked for property:",
        property.id
      );
      onHeartPress(property.id);
    }
  };

  const nextImage = () => {
    if (property && property.image) {
      const images = Array.isArray(property.image)
        ? property.image
        : [property.image];
      const newIndex =
        currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
      console.log(
        "PropertyCard: Next image clicked, moving to index:",
        newIndex
      );
      setCurrentImageIndex(newIndex);
    }
  };

  const prevImage = () => {
    if (property && property.image) {
      const images = Array.isArray(property.image)
        ? property.image
        : [property.image];
      const newIndex =
        currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
      console.log(
        "PropertyCard: Previous image clicked, moving to index:",
        newIndex
      );
      setCurrentImageIndex(newIndex);
    }
  };

  const handleShowAmenities = () => {
    console.log(
      "PropertyCard: Show amenities button clicked, showAll:",
      !showAllAmenities
    );
    setShowAllAmenities(!showAllAmenities);
  };

  const handleReserve = () => {
    console.log(
      "PropertyCard: Reserve button clicked for property:",
      property?.id
    );
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

  if (!property) return null;

  // Handle both single image (string) and multiple images (array)
  const images = Array.isArray(property.image)
    ? property.image
    : [property.image];
  const currentImage = images[currentImageIndex] || images[0];
  const hasMultipleImages = images.length > 1;

  const modalScale = modalAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const modalTranslateY = modalAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  // Mock amenities data
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

  return (
    <Modal
      visible={isVisible}
      transparent={true}
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
          {/* Image Section */}
          <View style={styles.modalImageContainer}>
            <ImageBackground
              source={{ uri: currentImage }}
              style={styles.modalImage}
              imageStyle={styles.modalImageStyle}
            >
              {/* Header Controls */}
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={handleClose}
                >
                  <Ionicons name="close" size={24} color="#000" />
                </TouchableOpacity>
                <View style={styles.modalHeaderRight}>
                  <TouchableOpacity
                    style={styles.modalActionButton}
                    onPress={handleShare}
                  >
                    <Ionicons name="share-outline" size={20} color="#000" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalActionButton}
                    onPress={handleHeartPress}
                  >
                    <Ionicons
                      name={
                        likedItems.has(property.id) ? "heart" : "heart-outline"
                      }
                      size={20}
                      color={likedItems.has(property.id) ? "#FF385C" : "#000"}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Image Navigation - Only show if multiple images */}
              {hasMultipleImages && (
                <>
                  <TouchableOpacity
                    style={[styles.imageNavButton, styles.imageNavLeft]}
                    onPress={prevImage}
                  >
                    <Ionicons name="chevron-back" size={24} color="#000" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.imageNavButton, styles.imageNavRight]}
                    onPress={nextImage}
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

              {/* Image dots indicator for multiple images */}
              {hasMultipleImages && (
                <View style={styles.imageDotsContainer}>
                  {images.map((_, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.imageDot,
                        index === currentImageIndex && styles.activeDot,
                      ]}
                      onPress={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </View>
              )}
            </ImageBackground>
          </View>

          {/* Content Section */}
          <ScrollView
            style={styles.modalContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Title and Rating */}
            <View style={styles.modalTitleSection}>
              <Text style={styles.modalTitle}>{property.title}</Text>
              <Text style={styles.modalLocation}>Room in Accra, Ghana</Text>
              <Text style={styles.modalDetails}>
                1 bedroom • Private attached bathroom
              </Text>
              <View style={styles.modalRatingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.modalRating}>{property.rating}</Text>
                <Text style={styles.modalReviews}>• 12 reviews</Text>
              </View>

              {/* Show total images count */}
              {hasMultipleImages && (
                <View style={styles.imageDotsContainer}>
                  <Ionicons name="camera" size={16} color="#717171" />
                  <Text style={styles.imageInfoText}>
                    {images.length} photo{images.length > 1 ? "s" : ""}{" "}
                    available
                  </Text>
                </View>
              )}
            </View>

            {/* Rest of your existing content remains the same */}
            {/* Host Info */}
            <View style={styles.hostContainer}>
              <View style={styles.hostAvatar}>
                <Text style={styles.hostAvatarText}>E</Text>
                <View style={styles.superhostBadge}>
                  <Ionicons name="star" size={8} color="white" />
                </View>
              </View>
              <View style={styles.hostInfo}>
                <Text style={styles.hostName}>Hosted by Emmanuel</Text>
                <Text style={styles.hostDetails}>
                  Superhost • 1 year hosting
                </Text>
              </View>
            </View>

            {/* Amenities */}
            <View style={styles.amenitiesContainer}>
              <Text style={styles.amenitiesTitle}>What this place offers</Text>
              {displayedAmenities.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <Ionicons
                    name={getAmenityIcon(amenity) as any}
                    size={20}
                    color="#222"
                  />
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
              {amenities.length > 3 && (
                <TouchableOpacity
                  onPress={handleShowAmenities}
                  style={styles.showMoreButton}
                >
                  <Text style={styles.showMoreText}>
                    {showAllAmenities
                      ? "Show less"
                      : `Show all ${amenities.length} amenities`}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Special Notice */}
            <View style={styles.specialNotice}>
              <Text style={styles.specialNoticeIcon}>💎</Text>
              <Text style={styles.specialNoticeText}>
                Rare find! This place is usually booked
              </Text>
            </View>

            {/* Room Type */}
            <View style={styles.roomTypeContainer}>
              <View style={styles.roomTypeHeader}>
                <Ionicons name="location" size={20} color="#222" />
                <Text style={styles.roomTypeTitle}>Room in a rental unit</Text>
              </View>
              <Text style={styles.roomTypeDescription}>
                The sunbeds and pool are great for summer trips. Perfect for
                relaxing getaways with modern amenities.
              </Text>
            </View>
          </ScrollView>

          {/* Bottom Bar */}
          <View style={styles.modalBottomBar}>
            <View style={styles.priceContainer}>
              <View style={styles.priceRow}>
                <Text style={styles.modalPrice}>${property.price}</Text>
                <Text style={styles.priceLabel}>night</Text>
              </View>
              <Text style={styles.priceDetails}>For 2 nights • Jun 20-22</Text>
              <View style={styles.cancellationInfo}>
                <Ionicons name="checkmark" size={14} color="#00A699" />
                <Text style={styles.cancellationText}>Free cancellation</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.reserveButton}
              onPress={handleReserve}
            >
              <Text style={styles.reserveButtonText}>Reserve</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
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
    position: "relative",
  },
  modalImage: {
    flex: 1,
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
    padding: 24,
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
    padding: 20,
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
});
