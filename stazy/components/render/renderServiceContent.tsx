import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Service } from "../../types/Service";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";

interface RenderServiceContentProps {
  itemId: string;
}

const tokenStore = new SimulatedTokenStore();

export const renderServiceContent = ({ itemId }: RenderServiceContentProps) => {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          `http://100.66.107.9:8080/api/service-offers/${itemId}`,
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
        <Text style={{ marginTop: 10 }}>Loading service...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: "#FF385C", textAlign: "center" }}>{error}</Text>
      </View>
    );
  }

  if (!service) {
    return (
      <View style={styles.centered}>
        <Text>Service not found.</Text>
      </View>
    );
  }

  // Create price text variable
  const priceText = "$" + (service.price || 0);

  return (
    <ScrollView style={styles.container}>
      {/* Main Image */}
      {service.images && service.images.length > 0 && (
        <Image
          source={{ uri: service.images[0] }}
          style={styles.mainImage}
          resizeMode="cover"
        />
      )}

      {/* Basic Information */}
      <View style={styles.basicInfo}>
        <Text style={styles.title}>{service.title || "Untitled Service"}</Text>
        <Text style={styles.location}>
          {service.location || "Location not specified"}
        </Text>
        <Text style={styles.price}>{priceText}</Text>
        {service.duration && (
          <Text style={styles.duration}>
            Duration: {service.duration} hours
          </Text>
        )}
        <Text style={styles.description}>
          {service.description || "No description available"}
        </Text>
      </View>

      {/* Rating */}
      {service.rating && (
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{service.rating}/5</Text>
        </View>
      )}

      {/* Service Details */}
      <View style={styles.serviceDetails}>
        <Text style={styles.sectionTitle}>Service Details</Text>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Category:</Text>
          <Text style={styles.detailValue}>{service.category}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Service Type:</Text>
          <Text style={styles.detailValue}>{service.serviceType}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Max Guests:</Text>
          <Text style={styles.detailValue}>{service.maxGuests}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Provider:</Text>
          <Text style={styles.detailValue}>{service.provider}</Text>
        </View>
      </View>

      {/* Availability */}
      {service.availability && (
        <View style={styles.availabilityContainer}>
          <Text style={styles.sectionTitle}>Availability</Text>

          {service.availability.days &&
            service.availability.days.length > 0 && (
              <View style={styles.availabilitySection}>
                <Text style={styles.subsectionTitle}>Available Days:</Text>
                <View style={styles.tagsList}>
                  {service.availability.days.map(
                    (day: string, index: number) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{day}</Text>
                      </View>
                    )
                  )}
                </View>
              </View>
            )}

          {service.availability.timeSlots &&
            service.availability.timeSlots.length > 0 && (
              <View style={styles.availabilitySection}>
                <Text style={styles.subsectionTitle}>Time Slots:</Text>
                <View style={styles.tagsList}>
                  {service.availability.timeSlots.map(
                    (slot: string, index: number) => (
                      <View key={index} style={styles.tag}>
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
        <View style={styles.requirementsContainer}>
          <Text style={styles.sectionTitle}>Requirements</Text>
          <View style={styles.list}>
            {service.requirements.map((requirement: string, index: number) => (
              <View key={index} style={styles.listItem}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                <Text style={styles.listText}>{requirement}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Included */}
      {service.included && service.included.length > 0 && (
        <View style={styles.includedContainer}>
          <Text style={styles.sectionTitle}>What's Included</Text>
          <View style={styles.list}>
            {service.included.map((item: string, index: number) => (
              <View key={index} style={styles.listItem}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  mainImage: {
    width: "100%",
    height: 300,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  basicInfo: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#222",
  },
  location: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
    fontWeight: "600",
  },
  price: {
    fontSize: 20,
    color: "#007AFF",
    marginBottom: 4,
    fontWeight: "700",
  },
  duration: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
    fontStyle: "italic",
  },
  description: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#f8f9fa",
  },
  rating: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  serviceDetails: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    color: "#222",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  detailValue: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  availabilityContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  availabilitySection: {
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  tagsList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
  },
  requirementsContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  includedContainer: {
    padding: 20,
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 8,
    width: "48%",
  },
  listText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#333",
  },
});
