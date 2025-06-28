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
import { Experience } from "../../types/Experience";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";

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

  useEffect(() => {
    const fetchExperience = async () => {
      setLoading(true);
      setError(null);
      try {
        // For now, we'll use mock data since experiences don't have a backend endpoint yet
        // This can be updated when the backend endpoint is available
        const mockExperiences = [
          {
            id: "1",
            title: "City Walking Tour",
            description:
              "Explore the historic downtown area with our expert guide",
            location: "Downtown",
            price: 25,
            duration: 2,
            rating: 4.8,
            images: [
              "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
            ],
            category: "Cultural",
            maxGuests: 15,
            guide: "Sarah Johnson",
            meetingPoint: "Central Square",
            included: [
              "Professional guide",
              "Historical insights",
              "Photo opportunities",
            ],
            requirements: ["Comfortable walking shoes", "Water bottle"],
            highlights: ["Historic landmarks", "Local stories", "Hidden gems"],
            createdAt: new Date(),
            updatedAt: new Date(),
            isGuestFavorite: true,
          },
          {
            id: "2",
            title: "Cooking Class",
            description: "Learn to cook authentic local cuisine",
            location: "Culinary District",
            price: 75,
            duration: 3,
            rating: 4.9,
            images: [
              "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136",
            ],
            category: "Culinary",
            maxGuests: 8,
            guide: "Chef Maria",
            meetingPoint: "Cooking Studio",
            included: ["All ingredients", "Recipe book", "Meal to enjoy"],
            requirements: [
              "No cooking experience needed",
              "Appetite for learning",
            ],
            highlights: [
              "Hands-on cooking",
              "Local ingredients",
              "Cultural exchange",
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
            isGuestFavorite: true,
          },
        ];

        const foundExperience = mockExperiences.find((e) => e.id === itemId);
        if (foundExperience) {
          setExperience(foundExperience as unknown as Experience);
        } else {
          throw new Error("Experience not found");
        }
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
        <Text style={{ marginTop: 10 }}>Loading experience...</Text>
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

  if (!experience) {
    return (
      <View style={styles.centered}>
        <Text>Experience not found.</Text>
      </View>
    );
  }

  const experienceData = experience as any;

  // Create price text variable
  const priceText = "$" + (experienceData.price || 0);

  return (
    <ScrollView style={styles.container}>
      {/* Main Image */}
      {experienceData.images && experienceData.images.length > 0 && (
        <Image
          source={{ uri: experienceData.images[0] }}
          style={styles.mainImage}
          resizeMode="cover"
        />
      )}

      {/* Basic Information */}
      <View style={styles.basicInfo}>
        <Text style={styles.title}>
          {experienceData.title || "Untitled Experience"}
        </Text>
        <Text style={styles.location}>
          {experienceData.location || "Location not specified"}
        </Text>
        <Text style={styles.price}>{priceText}</Text>
        {experienceData.duration && (
          <Text style={styles.duration}>
            Duration: {experienceData.duration} hours
          </Text>
        )}
        <Text style={styles.description}>
          {experienceData.description || "No description available"}
        </Text>
      </View>

      {/* Rating */}
      {experienceData.rating && (
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{experienceData.rating}/5</Text>
        </View>
      )}

      {/* Experience Details */}
      <View style={styles.experienceDetails}>
        <Text style={styles.sectionTitle}>Experience Details</Text>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Category:</Text>
          <Text style={styles.detailValue}>{experienceData.category}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Guide:</Text>
          <Text style={styles.detailValue}>{experienceData.guide}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Max Guests:</Text>
          <Text style={styles.detailValue}>{experienceData.maxGuests}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Meeting Point:</Text>
          <Text style={styles.detailValue}>{experienceData.meetingPoint}</Text>
        </View>
      </View>

      {/* Highlights */}
      {experienceData.highlights && experienceData.highlights.length > 0 && (
        <View style={styles.highlightsContainer}>
          <Text style={styles.sectionTitle}>Highlights</Text>
          <View style={styles.tagsList}>
            {experienceData.highlights.map(
              (highlight: string, index: number) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{highlight}</Text>
                </View>
              )
            )}
          </View>
        </View>
      )}

      {/* Requirements */}
      {experienceData.requirements &&
        experienceData.requirements.length > 0 && (
          <View style={styles.requirementsContainer}>
            <Text style={styles.sectionTitle}>Requirements</Text>
            <View style={styles.list}>
              {experienceData.requirements.map(
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
      {experienceData.included && experienceData.included.length > 0 && (
        <View style={styles.includedContainer}>
          <Text style={styles.sectionTitle}>What's Included</Text>
          <View style={styles.list}>
            {experienceData.included.map((item: string, index: number) => (
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
  experienceDetails: {
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
  highlightsContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
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
