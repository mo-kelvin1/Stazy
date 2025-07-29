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
} from "react-native";
import { Experience } from "../../types/Experience";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";
import { useRouter } from "expo-router";
import { useWindowDimensions } from "react-native";

interface RenderExperienceContentProps {
  itemId: string;
}

const tokenStore = new SimulatedTokenStore();

export const renderExperienceContent = ({
  itemId,
}: RenderExperienceContentProps) => {
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchExperience = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await tokenStore.getToken();
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch(
          `http://172.20.10.2:8080/api/experiences/${itemId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`
          );
        }

        const experience = await response.json();

        // Transform the backend data to match the frontend Experience interface
        const transformedExperience: Experience = {
          id: experience.id.toString(),
          title: experience.title || "",
          description: experience.description || "",
          location: experience.location || "",
          price: experience.price || 0,
          duration: experience.duration || 0,
          rating: experience.rating || 0,
          images: experience.images || [],
          hostName: experience.hostName || "",
          hostEmail: experience.hostEmail || "",
          category: experience.category || "adventure",
          experienceType: experience.experienceType || "group",
          difficulty: experience.difficulty || "easy",
          ageRestriction: {
            minimum: experience.minimumAge || 0,
            maximum: experience.maximumAge,
          },
          maxParticipants: experience.maxParticipants || 1,
          included: experience.included || [],
          toBring: experience.toBring || [],
          meetingPoint: experience.meetingPoint || "",
          languages: experience.languages || [],
          availability: {
            days: experience.availabilityDays || [],
            timeSlots: experience.availabilityTimeSlots || [],
          },
          createdAt: new Date(experience.createdAt),
          updatedAt: new Date(experience.updatedAt),
        };

        setExperience(transformedExperience);
      } catch (err: any) {
        setError(err.message || "Failed to fetch experience");
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [itemId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading experience details...</Text>
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

  if (!experience) {
    return (
      <View style={styles.centered}>
        <Ionicons name="compass-outline" size={48} color="#666" />
        <Text style={styles.notFoundText}>Experience not found</Text>
      </View>
    );
  }

  // Create price text variable
  const priceText = "$" + (experience.price || 0);

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
            {experience.images &&
              experience.images.length > 0 &&
              experience.images.map((img: string, idx: number) => (
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
            {experience.images &&
              experience.images.length > 1 &&
              experience.images.map((_: string, idx: number) => (
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
              {experience.title || "Untitled Experience"}
            </Text>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={16} color="#007AFF" />
              <Text style={styles.location}>
                {experience.location || "Location not specified"}
              </Text>
            </View>
            <View style={styles.priceRow}>
              <Ionicons name="card" size={20} color="#007AFF" />
              <Text style={styles.price}>{priceText}</Text>
            </View>
            {experience.duration && (
              <View style={styles.durationRow}>
                <Ionicons name="time" size={16} color="#666" />
                <Text style={styles.duration}>
                  Duration: {experience.duration} hours
                </Text>
              </View>
            )}
            <Text style={styles.description}>
              {experience.description || "No description available"}
            </Text>
          </View>

          {/* Rating Section */}
          {experience.rating && (
            <View style={styles.ratingSection}>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={20} color="#FFD700" />
                <Text style={styles.rating}>{experience.rating}/5</Text>
              </View>
            </View>
          )}

          {/* Experience Details */}
          <View style={styles.detailsSection}>
            <View style={styles.sectionHeader}>
              <Ionicons name="information-circle" size={20} color="#007AFF" />
              <Text style={styles.sectionTitle}>Experience Details</Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailLabelContainer}>
                <Ionicons name="ellipse" size={8} color="#007AFF" />
                <Text style={styles.detailLabel}>Category:</Text>
              </View>
              <Text style={styles.detailValue}>{experience.category}</Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailLabelContainer}>
                <Ionicons name="ellipse" size={8} color="#007AFF" />
                <Text style={styles.detailLabel}>Host:</Text>
              </View>
              <Text style={styles.detailValue}>{experience.hostName}</Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailLabelContainer}>
                <Ionicons name="ellipse" size={8} color="#007AFF" />
                <Text style={styles.detailLabel}>Experience Type:</Text>
              </View>
              <Text style={styles.detailValue}>
                {experience.experienceType}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailLabelContainer}>
                <Ionicons name="ellipse" size={8} color="#007AFF" />
                <Text style={styles.detailLabel}>Difficulty:</Text>
              </View>
              <Text style={styles.detailValue}>{experience.difficulty}</Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailLabelContainer}>
                <Ionicons name="ellipse" size={8} color="#007AFF" />
                <Text style={styles.detailLabel}>Max Participants:</Text>
              </View>
              <Text style={styles.detailValue}>
                {experience.maxParticipants}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailLabelContainer}>
                <Ionicons name="ellipse" size={8} color="#007AFF" />
                <Text style={styles.detailLabel}>Meeting Point:</Text>
              </View>
              <Text style={styles.detailValue}>{experience.meetingPoint}</Text>
            </View>

            {experience.ageRestriction && (
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Ionicons name="ellipse" size={8} color="#007AFF" />
                  <Text style={styles.detailLabel}>Age Range:</Text>
                </View>
                <Text style={styles.detailValue}>
                  {experience.ageRestriction.minimum}+
                  {experience.ageRestriction.maximum
                    ? ` - ${experience.ageRestriction.maximum}`
                    : ""}
                </Text>
              </View>
            )}

            {experience.languages && experience.languages.length > 0 && (
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Ionicons name="ellipse" size={8} color="#007AFF" />
                  <Text style={styles.detailLabel}>Languages:</Text>
                </View>
                <Text style={styles.detailValue}>
                  {experience.languages.join(", ")}
                </Text>
              </View>
            )}
          </View>

          {/* Availability */}
          {experience.availability &&
            experience.availability.days &&
            experience.availability.days.length > 0 && (
              <View style={styles.availabilitySection}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="calendar" size={20} color="#4CAF50" />
                  <Text style={styles.sectionTitle}>Availability</Text>
                </View>
                <View style={styles.availabilityDetails}>
                  <Text style={styles.availabilityLabel}>Days:</Text>
                  <Text style={styles.availabilityValue}>
                    {experience.availability.days.join(", ")}
                  </Text>
                </View>
                {experience.availability.timeSlots &&
                  experience.availability.timeSlots.length > 0 && (
                    <View style={styles.availabilityDetails}>
                      <Text style={styles.availabilityLabel}>Time Slots:</Text>
                      <Text style={styles.availabilityValue}>
                        {experience.availability.timeSlots.join(", ")}
                      </Text>
                    </View>
                  )}
              </View>
            )}

          {/* What to Bring */}
          {experience.toBring && experience.toBring.length > 0 && (
            <View style={styles.requirementsSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="bag" size={20} color="#FF9800" />
                <Text style={styles.sectionTitle}>What to Bring</Text>
              </View>
              <View style={styles.listGrid}>
                {experience.toBring.map((item: string, index: number) => (
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

          {/* Included */}
          {experience.included && experience.included.length > 0 && (
            <View style={styles.includedSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="gift" size={20} color="#E91E63" />
                <Text style={styles.sectionTitle}>What's Included</Text>
              </View>
              <View style={styles.listGrid}>
                {experience.included.map((item: string, index: number) => (
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
        style={styles.requestButton}
        onPress={() =>
          router.push({
            pathname: "/screens/ReviewAndContinueScreen",
            params: { item: JSON.stringify(experience), type: "request" },
          })
        }
      >
        <Text style={styles.requestButtonText}>Request</Text>
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
  availabilityDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  availabilityLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  availabilityValue: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
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
  requestButton: {
    backgroundColor: "#222",
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    marginBottom: 60,
  },
  requestButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
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
