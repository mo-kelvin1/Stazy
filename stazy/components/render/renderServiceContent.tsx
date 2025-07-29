import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Service } from "../../types/Service";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";
import { router } from "expo-router";

interface RenderServiceContentProps {
  itemId: string;
}

const tokenStore = new SimulatedTokenStore();

export const renderServiceContent = ({ itemId }: RenderServiceContentProps) => {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { width } = useWindowDimensions();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await tokenStore.getToken();
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await fetch(
          `http://172.20.10.2:8080/api/service-offers/${itemId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch service");
        }

        const data = await response.json();

        // Transform backend service data to match frontend Service interface
        const transformedService: Service = {
          id: data.id.toString(),
          title: data.title || "",
          description: data.description || "",
          location: data.location || "",
          price: data.price || 0,
          duration: data.duration || 0,
          rating: data.rating || 0,
          images: data.images || [],
          category: data.category || "other",
          serviceType: data.serviceType || "one_time",
          availability: {
            days: data.availabilityDays || [],
            timeSlots: data.availabilityTimeSlots || [],
          },
          requirements: data.requirements || [],
          included: data.included || [],
          maxGuests: data.maxGuests || 1,
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt),
          isGuestFavorite: data.isGuestFavorite || false,
          provider: data.provider || "",
          providerEmail: data.providerEmail || "",
        };

        setService(transformedService);
      } catch (err: any) {
        setError(err.message || "Failed to fetch service");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [itemId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading service details...</Text>
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

  if (!service) {
    return (
      <View style={styles.centered}>
        <Ionicons name="construct-outline" size={48} color="#666" />
        <Text style={styles.notFoundText}>Service not found</Text>
      </View>
    );
  }

  // Create price text variable
  const priceText = "$" + (service.price || 0);

  return (
    <View style={{ flex: 1 }}>
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
            {service.images &&
              service.images.length > 0 &&
              service.images.map((img: string, idx: number) => (
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
            {service.images &&
              service.images.length > 1 &&
              service.images.map((_: string, idx: number) => (
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
              {service.title || "Untitled Service"}
            </Text>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={16} color="#007AFF" />
              <Text style={styles.location}>
                {service.location || "Location not specified"}
              </Text>
            </View>
            <View style={styles.priceRow}>
              <Ionicons name="card" size={20} color="#007AFF" />
              <Text style={styles.price}>{priceText}</Text>
            </View>
            {service.duration && (
              <View style={styles.durationRow}>
                <Ionicons name="time" size={16} color="#666" />
                <Text style={styles.duration}>
                  Duration: {service.duration} hours
                </Text>
              </View>
            )}
            <Text style={styles.description}>
              {service.description || "No description available"}
            </Text>
          </View>

          {/* Rating Section */}
          {service.rating && (
            <View style={styles.ratingSection}>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={20} color="#FFD700" />
                <Text style={styles.rating}>{service.rating}/5</Text>
              </View>
            </View>
          )}

          {/* Service Details */}
          <View style={styles.detailsSection}>
            <View style={styles.sectionHeader}>
              <Ionicons name="information-circle" size={20} color="#007AFF" />
              <Text style={styles.sectionTitle}>Service Details</Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailLabelContainer}>
                <Ionicons name="ellipse" size={8} color="#007AFF" />
                <Text style={styles.detailLabel}>Category:</Text>
              </View>
              <Text style={styles.detailValue}>{service.category}</Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailLabelContainer}>
                <Ionicons name="ellipse" size={8} color="#007AFF" />
                <Text style={styles.detailLabel}>Service Type:</Text>
              </View>
              <Text style={styles.detailValue}>{service.serviceType}</Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailLabelContainer}>
                <Ionicons name="ellipse" size={8} color="#007AFF" />
                <Text style={styles.detailLabel}>Max Guests:</Text>
              </View>
              <Text style={styles.detailValue}>{service.maxGuests}</Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailLabelContainer}>
                <Ionicons name="ellipse" size={8} color="#007AFF" />
                <Text style={styles.detailLabel}>Provider:</Text>
              </View>
              <Text style={styles.detailValue}>{service.provider}</Text>
            </View>
          </View>

          {/* Availability */}
          {service.availability && (
            <View style={styles.availabilitySection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="calendar" size={20} color="#4CAF50" />
                <Text style={styles.sectionTitle}>Availability</Text>
              </View>

              {service.availability.days &&
                service.availability.days.length > 0 && (
                  <View style={styles.availabilitySubsection}>
                    <Text style={styles.subsectionTitle}>Available Days:</Text>
                    <View style={styles.tagsGrid}>
                      {service.availability.days.map(
                        (day: string, index: number) => (
                          <View key={index} style={styles.tag}>
                            <Ionicons
                              name="checkmark"
                              size={12}
                              color="#4CAF50"
                            />
                            <Text style={styles.tagText}>{day}</Text>
                          </View>
                        )
                      )}
                    </View>
                  </View>
                )}

              {service.availability.timeSlots &&
                service.availability.timeSlots.length > 0 && (
                  <View style={styles.availabilitySubsection}>
                    <Text style={styles.subsectionTitle}>Time Slots:</Text>
                    <View style={styles.tagsGrid}>
                      {service.availability.timeSlots.map(
                        (slot: string, index: number) => (
                          <View key={index} style={styles.tag}>
                            <Ionicons name="time" size={12} color="#007AFF" />
                            <Text style={styles.tagText}>{slot}</Text>
                          </View>
                        )
                      )}
                    </View>
                  </View>
                )}
            </View>
          )}

          {/* Requirements */}
          {service.requirements && service.requirements.length > 0 && (
            <View style={styles.requirementsSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="list" size={20} color="#FF9800" />
                <Text style={styles.sectionTitle}>Requirements</Text>
              </View>
              <View style={styles.listGrid}>
                {service.requirements.map(
                  (requirement: string, index: number) => (
                    <View key={index} style={styles.listItem}>
                      <Ionicons
                        name="checkmark-circle"
                        size={16}
                        color="#4CAF50"
                      />
                      <Text style={styles.listText}>{requirement}</Text>
                    </View>
                  )
                )}
              </View>
            </View>
          )}

          {/* Included */}
          {service.included && service.included.length > 0 && (
            <View style={styles.includedSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="gift" size={20} color="#E91E63" />
                <Text style={styles.sectionTitle}>What's Included</Text>
              </View>
              <View style={styles.listGrid}>
                {service.included.map((item: string, index: number) => (
                  <View key={index} style={styles.listItem}>
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color="#4CAF50"
                    />
                    <Text style={styles.listText}>{item}</Text>
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
            params: { item: JSON.stringify(service), type: "service" },
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
    flex: 1,
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
  durationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  duration: {
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
    alignItems: "center",
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
    fontWeight: "600",
  },
  availabilitySection: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 20,
    borderRadius: 16,
  },
  availabilitySubsection: {
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  tagsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    marginBottom: 8,
  },
  tagText: {
    marginLeft: 6,
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
  },
  requirementsSection: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 20,
    borderRadius: 16,
  },
  includedSection: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 20,
    borderRadius: 16,
  },
  listGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    marginBottom: 8,
    minWidth: "45%",
  },
  listText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  bottomSpacer: {
    height: 20,
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
