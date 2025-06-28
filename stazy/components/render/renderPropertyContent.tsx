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
          `http://100.66.107.9:8080/api/properties/${itemId}`,
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
        <Text style={{ marginTop: 10 }}>Loading property...</Text>
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

  if (!property) {
    return (
      <View style={styles.centered}>
        <Text>Property not found.</Text>
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
      return JSON.stringify(value).replace(/[{}"]/g, "").replace(/,/g, ", ");
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
    <ScrollView style={styles.container}>
      {/* Main Image */}
      {prop.images && prop.images.length > 0 && (
        <Image
          source={{ uri: prop.images[0] }}
          style={styles.mainImage}
          resizeMode="cover"
        />
      )}

      {/* Basic Information */}
      <View style={styles.basicInfo}>
        <Text style={styles.title}>{prop.title || "Untitled Property"}</Text>
        <Text style={styles.location}>
          {prop.location || "Location not specified"}
        </Text>
        <Text style={styles.price}>{priceText}</Text>
        {prop.weekendPrice && (
          <Text style={styles.weekendPrice}>{weekendPriceText}</Text>
        )}
        <Text style={styles.description}>
          {prop.description || "No description available"}
        </Text>
      </View>

      {/* Rating */}
      {prop.rating && (
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{prop.rating}/5</Text>
        </View>
      )}

      {/* Property Details */}
      <View style={styles.propertyDetails}>
        <Text style={styles.sectionTitle}>Property Details</Text>
        {propertiesToDisplay.map((propertyName, index) => (
          <View key={index} style={styles.propertyDetailsRow}>
            <Text style={styles.propertyLabel}>
              {propertyName.charAt(0).toUpperCase() + propertyName.slice(1)}:
            </Text>
            <Text style={styles.propertyValue}>
              {renderPropertyValue(prop[propertyName])}
            </Text>
          </View>
        ))}
      </View>

      {/* Amenities */}
      {prop.amenities && prop.amenities.length > 0 && (
        <View style={styles.amenitiesContainer}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesList}>
            {prop.amenities.map((amenity: string, index: number) => (
              <View key={index} style={styles.amenityItem}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Highlights */}
      {prop.highlights && prop.highlights.length > 0 && (
        <View style={styles.highlightsContainer}>
          <Text style={styles.sectionTitle}>Highlights</Text>
          <View style={styles.highlightsList}>
            {prop.highlights.map((highlight: string, index: number) => (
              <View key={index} style={styles.highlightItem}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.highlightText}>{highlight}</Text>
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
  weekendPrice: {
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
  propertyDetails: {
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
  propertyDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
    flexWrap: "wrap",
  },
  propertyLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    flex: 1,
  },
  propertyValue: {
    fontSize: 14,
    color: "#666",
    flex: 2,
    textAlign: "right",
  },
  amenitiesContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  amenitiesList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  amenityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 8,
  },
  amenityText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#333",
  },
  highlightsContainer: {
    padding: 20,
  },
  highlightsList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  highlightItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 8,
  },
  highlightText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#333",
  },
});
