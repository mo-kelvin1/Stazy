import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { router } from "expo-router";
import { Property } from "../../types/Property";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";

interface RenderPropertyContentProps {
  itemId: string;
}

export const renderPropertyContent = ({
  itemId,
}: RenderPropertyContentProps) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tokenStore = new SimulatedTokenStore();
  const { width } = useWindowDimensions();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = await tokenStore.getToken();
        if (!token) {
          setError("Authentication required");
          return;
        }

        const response = await fetch(
          `http://10.132.119.88:8080/api/properties/${itemId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProperty(data);
      } catch (err) {
        console.error("Error fetching property:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch property"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [itemId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading property details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Ionicons name="alert-circle" size={48} color="#FF385C" />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!property) {
    return (
      <View style={styles.centered}>
        <Ionicons name="home-outline" size={48} color="#666" />
        <Text style={styles.notFoundText}>Property not found</Text>
      </View>
    );
  }

  const prop = property as any;

  // Helper function to render property value
  const renderPropertyValue = (value: any): string => {
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value)
        .replace(/[{}\"]+/g, "")
        .replace(/,/g, ", ");
    }
    return String(value);
  };

  // Create price text variables
  const priceText = "$" + (prop.price || 0) + " / night";
  const weekendPriceText = prop.weekendPrice
    ? "Weekend: $" + prop.weekendPrice + " / night"
    : "";

  // Get all properties of the item
  const allProperties = Object.keys(prop);

  // Filter out properties we don't want to display
  const propertiesToDisplay = allProperties.filter((propertyName) => {
    const lowerPropertyName = propertyName.toLowerCase();
    return (
      !lowerPropertyName.includes("image") &&
      !lowerPropertyName.includes("id") &&
      !lowerPropertyName.includes("hostid")
    );
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Swipeable Image Carousel */}
        <View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width);
              setActiveImage(index);
            }}
            scrollEventThrottle={16}
            style={{ width, height: 300 }}
          >
            {prop.images &&
              prop.images.length > 0 &&
              prop.images.map((img: string, idx: number) => (
                <Image
                  key={idx}
                  source={{ uri: img }}
                  style={{ width, height: 300, borderRadius: 24 }}
                  resizeMode="cover"
                />
              ))}
          </ScrollView>
          {/* Image indicators */}
          <View style={styles.imageIndicators}>
            {prop.images &&
              prop.images.length > 1 &&
              prop.images.map((_: string, idx: number) => (
                <View
                  key={idx}
                  style={[
                    styles.indicatorDot,
                    activeImage === idx && styles.activeIndicatorDot,
                  ]}
                />
              ))}
          </View>
        </View>
        <View style={styles.detailsContainer}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.title}>
              {prop.title || "Untitled Property"}
            </Text>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={16} color="#007AFF" />
              <Text style={styles.location}>
                {prop.location || "Location not specified"}
              </Text>
            </View>
            <View style={styles.priceRow}>
              <Ionicons name="card" size={20} color="#007AFF" />
              <Text style={styles.price}>{priceText}</Text>
            </View>
            {prop.weekendPrice && (
              <View style={styles.weekendPriceRow}>
                <Ionicons name="calendar" size={16} color="#666" />
                <Text style={styles.weekendPrice}>{weekendPriceText}</Text>
              </View>
            )}
            <Text style={styles.description}>
              {prop.description || "No description available"}
            </Text>
          </View>

          {/* Rating Section */}
          {prop.rating && (
            <View style={styles.ratingSection}>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={20} color="#FFD700" />
                <Text style={styles.rating}>{prop.rating}/5</Text>
              </View>
            </View>
          )}

          {/* Property Details */}
          <View style={styles.detailsSection}>
            <View style={styles.sectionHeader}>
              <Ionicons name="information-circle" size={20} color="#007AFF" />
              <Text style={styles.sectionTitle}>Property Details</Text>
            </View>

            {prop.propertyType && (
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Ionicons name="ellipse" size={8} color="#007AFF" />
                  <Text style={styles.detailLabel}>Property Type:</Text>
                </View>
                <Text style={styles.detailValue}>{prop.propertyType}</Text>
              </View>
            )}

            {prop.bedrooms && (
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Ionicons name="ellipse" size={8} color="#007AFF" />
                  <Text style={styles.detailLabel}>Bedrooms:</Text>
                </View>
                <Text style={styles.detailValue}>{prop.bedrooms}</Text>
              </View>
            )}

            {prop.bathrooms && (
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Ionicons name="ellipse" size={8} color="#007AFF" />
                  <Text style={styles.detailLabel}>Bathrooms:</Text>
                </View>
                <Text style={styles.detailValue}>{prop.bathrooms}</Text>
              </View>
            )}

            {prop.maxGuests && (
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Ionicons name="ellipse" size={8} color="#007AFF" />
                  <Text style={styles.detailLabel}>Max Guests:</Text>
                </View>
                <Text style={styles.detailValue}>{prop.maxGuests}</Text>
              </View>
            )}

            {prop.squareFootage && (
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Ionicons name="ellipse" size={8} color="#007AFF" />
                  <Text style={styles.detailLabel}>Square Footage:</Text>
                </View>
                <Text style={styles.detailValue}>
                  {prop.squareFootage} sq ft
                </Text>
              </View>
            )}
          </View>

          {/* Location & Pricing */}
          <View style={styles.locationSection}>
            <View style={styles.sectionHeader}>
              <Ionicons name="location" size={20} color="#4CAF50" />
              <Text style={styles.sectionTitle}>Location & Pricing</Text>
            </View>

            {prop.location && (
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Ionicons name="ellipse" size={8} color="#4CAF50" />
                  <Text style={styles.detailLabel}>Address:</Text>
                </View>
                <Text style={styles.detailValue}>{prop.location}</Text>
              </View>
            )}

            {prop.price && (
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Ionicons name="ellipse" size={8} color="#4CAF50" />
                  <Text style={styles.detailLabel}>Nightly Rate:</Text>
                </View>
                <Text style={styles.detailValue}>${prop.price}</Text>
              </View>
            )}

            {prop.weekendPrice && (
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Ionicons name="ellipse" size={8} color="#4CAF50" />
                  <Text style={styles.detailLabel}>Weekend Rate:</Text>
                </View>
                <Text style={styles.detailValue}>${prop.weekendPrice}</Text>
              </View>
            )}

            {prop.cleaningFee && (
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Ionicons name="ellipse" size={8} color="#4CAF50" />
                  <Text style={styles.detailLabel}>Cleaning Fee:</Text>
                </View>
                <Text style={styles.detailValue}>${prop.cleaningFee}</Text>
              </View>
            )}

            {prop.securityDeposit && (
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Ionicons name="ellipse" size={8} color="#4CAF50" />
                  <Text style={styles.detailLabel}>Security Deposit:</Text>
                </View>
                <Text style={styles.detailValue}>${prop.securityDeposit}</Text>
              </View>
            )}
          </View>

          {/* Host Information */}
          <View style={styles.hostSection}>
            <View style={styles.sectionHeader}>
              <Ionicons name="person" size={20} color="#FF9800" />
              <Text style={styles.sectionTitle}>Host Information</Text>
            </View>

            {prop.hostName && (
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Ionicons name="ellipse" size={8} color="#FF9800" />
                  <Text style={styles.detailLabel}>Host:</Text>
                </View>
                <Text style={styles.detailValue}>{prop.hostName}</Text>
              </View>
            )}

            {prop.hostEmail && (
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Ionicons name="ellipse" size={8} color="#FF9800" />
                  <Text style={styles.detailLabel}>Contact:</Text>
                </View>
                <Text style={styles.detailValue}>{prop.hostEmail}</Text>
              </View>
            )}

            {prop.hostPhone && (
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Ionicons name="ellipse" size={8} color="#FF9800" />
                  <Text style={styles.detailLabel}>Phone:</Text>
                </View>
                <Text style={styles.detailValue}>{prop.hostPhone}</Text>
              </View>
            )}
          </View>

          {/* Policies & Rules */}
          <View style={styles.policiesSection}>
            <View style={styles.sectionHeader}>
              <Ionicons name="document-text" size={20} color="#E91E63" />
              <Text style={styles.sectionTitle}>Policies & Rules</Text>
            </View>

            {prop.checkInTime && (
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Ionicons name="ellipse" size={8} color="#E91E63" />
                  <Text style={styles.detailLabel}>Check-in Time:</Text>
                </View>
                <Text style={styles.detailValue}>{prop.checkInTime}</Text>
              </View>
            )}

            {prop.checkOutTime && (
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Ionicons name="ellipse" size={8} color="#E91E63" />
                  <Text style={styles.detailLabel}>Check-out Time:</Text>
                </View>
                <Text style={styles.detailValue}>{prop.checkOutTime}</Text>
              </View>
            )}

            {prop.cancellationPolicy && (
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Ionicons name="ellipse" size={8} color="#E91E63" />
                  <Text style={styles.detailLabel}>Cancellation Policy:</Text>
                </View>
                <Text style={styles.detailValue}>
                  {prop.cancellationPolicy}
                </Text>
              </View>
            )}

            {prop.houseRules && prop.houseRules.length > 0 && (
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Ionicons name="ellipse" size={8} color="#E91E63" />
                  <Text style={styles.detailLabel}>House Rules:</Text>
                </View>
                <Text style={styles.detailValue}>
                  {prop.houseRules.join(", ")}
                </Text>
              </View>
            )}
          </View>

          {/* Additional Details */}
          {(() => {
            const additionalProps = propertiesToDisplay.filter(
              (propertyName) =>
                ![
                  "title",
                  "description",
                  "location",
                  "price",
                  "weekendPrice",
                  "rating",
                  "images",
                  "amenities",
                  "highlights",
                  "propertyType",
                  "bedrooms",
                  "bathrooms",
                  "maxGuests",
                  "squareFootage",
                  "cleaningFee",
                  "securityDeposit",
                  "hostName",
                  "hostEmail",
                  "hostPhone",
                  "checkInTime",
                  "checkOutTime",
                  "cancellationPolicy",
                  "houseRules",
                ].includes(propertyName)
            );

            if (additionalProps.length === 0) return null;

            return (
              <View style={styles.additionalSection}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
                  <Text style={styles.sectionTitle}>Additional Details</Text>
                </View>
                {additionalProps.map((propertyName, index) => (
                  <View key={index} style={styles.detailRow}>
                    <View style={styles.detailLabelContainer}>
                      <Ionicons name="ellipse" size={8} color="#666" />
                      <Text style={styles.detailLabel}>
                        {propertyName.charAt(0).toUpperCase() +
                          propertyName.slice(1)}
                        :
                      </Text>
                    </View>
                    <Text style={styles.detailValue}>
                      {renderPropertyValue(prop[propertyName])}
                    </Text>
                  </View>
                ))}
              </View>
            );
          })()}

          {/* Amenities */}
          {prop.amenities && prop.amenities.length > 0 && (
            <View style={styles.amenitiesSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.sectionTitle}>Amenities</Text>
              </View>
              <View style={styles.amenitiesGrid}>
                {prop.amenities.map((amenity: string, index: number) => (
                  <View key={index} style={styles.amenityItem}>
                    <Ionicons name="checkmark" size={16} color="#4CAF50" />
                    <Text style={styles.amenityText}>{amenity}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Highlights */}
          {prop.highlights && prop.highlights.length > 0 && (
            <View style={styles.highlightsSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="star" size={20} color="#FFD700" />
                <Text style={styles.sectionTitle}>Highlights</Text>
              </View>
              <View style={styles.highlightsGrid}>
                {prop.highlights.map((highlight: string, index: number) => (
                  <View key={index} style={styles.highlightItem}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.highlightText}>{highlight}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.reserveButton}
        onPress={() =>
          router.push({
            pathname: "/screens/ReviewAndContinueScreen",
            params: { item: JSON.stringify(property), type: "reserve" },
          })
        }
      >
        <Text style={styles.reserveButtonText}>Reserve</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f8f9fa",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: "#FF385C",
    textAlign: "center",
  },
  notFoundText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  mainImage: {
    width: "100%",
    height: 300,
    borderRadius: 24,
    marginBottom: 20,
  },
  detailsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 15,
  },
  headerSection: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 20,
    borderRadius: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#222",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  location: {
    fontSize: 16,
    color: "#666",
    marginLeft: 8,
    fontWeight: "500",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    color: "#007AFF",
    marginLeft: 8,
    fontWeight: "700",
  },
  weekendPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  weekendPrice: {
    fontSize: 16,
    color: "#666",
    marginLeft: 8,
    fontStyle: "italic",
  },
  description: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
  },
  ratingSection: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 20,
    borderRadius: 16,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  detailsSection: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 20,
    borderRadius: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 8,
    color: "#222",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  detailLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginLeft: 8,
  },
  detailValue: {
    fontSize: 14,
    color: "#666",
    flex: 2,
    textAlign: "right",
    fontWeight: "500",
  },
  locationSection: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 20,
    borderRadius: 16,
  },
  hostSection: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 20,
    borderRadius: 16,
  },
  policiesSection: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 20,
    borderRadius: 16,
  },
  amenitiesSection: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 20,
    borderRadius: 16,
  },
  amenitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  amenityItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    marginBottom: 8,
  },
  amenityText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  highlightsSection: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 20,
    borderRadius: 16,
  },
  highlightsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  highlightItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff8e1",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    marginBottom: 8,
  },
  highlightText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  bottomSpacer: {
    height: 20,
  },
  additionalSection: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
  },
  reserveButton: {
    backgroundColor: "#222",
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    marginBottom: 60,
  },
  reserveButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  imageIndicators: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeIndicatorDot: {
    backgroundColor: "#007AFF",
  },
});
