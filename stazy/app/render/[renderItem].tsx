import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams, useSegments } from "expo-router";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { mockExperiences } from "../../data/mockExperiences";
import { mockServices } from "../../data/mockServices";
import { Ionicons } from "@expo/vector-icons";
import { renderExperienceContent } from "../../components/render/renderExperienceContent";
import { renderServiceContent } from "../../components/render/renderServiceContent";
import { renderPropertyContent } from "../../components/render/renderPropertyContent";
import { RenderListingContent } from "../../components/render/renderListingContent";
import { Property } from "../../types/Property";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";
import { useRootNavigationState } from "expo-router";
import { useNavigationState } from "@react-navigation/native";

const tokenStore = new SimulatedTokenStore();

export default function UniversalDetailPage() {
  const { renderItem: itemId } = useLocalSearchParams();
  const router = useRouter();
  const segments = useSegments();

  const currentRoute = useNavigationState((state) => {
    const tabIndex = state?.routes?.[0]?.state?.index ?? 0;
    const tabRoutes = state?.routes?.[0]?.state?.routes ?? [];
    return tabRoutes[tabIndex]?.name;
  });
  // Check for the item in all three mock data files
  const experience = mockExperiences.find((e) => e.id === String(itemId));
  const service = mockServices.find((s) => s.id === String(itemId));

  // State for property
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Determine what type of item we found
  let item = null;
  let itemType = "";

  if (experience) {
    item = experience;
    itemType = "experience";
  } else if (service) {
    item = service;
    itemType = "service";
  } else {
    itemType = "property";
  }

  // Fetch property from backend if itemType is property
  useEffect(() => {
    if (itemType === "property" && itemId) {
      setLoading(true);
      setError(null);
      (async () => {
        try {
          const token = await tokenStore.getToken();
          if (!token) throw new Error("No token found. Please log in.");
          const response = await fetch(
            `http://172.20.10.11:8080/api/properties/${itemId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (!response.ok) throw new Error("Failed to fetch property");
          const data = await response.json();
          setProperty(data);
        } catch (err: any) {
          setError(err.message || "Failed to fetch property");
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [itemType, itemId]);

  // Check if user is in the host section
  const isHostSection = () => {
    if (currentRoute === "listings") {
      return true;
    } else {
      return false;
    }
  };

  if (itemType === "property") {
    if (loading) {
      return (
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={{ marginTop: 40 }}
        />
      );
    }
    if (error) {
      return (
        <View style={styles.centered}>
          <Text>{error}</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={24} color="#222" />
            <Text style={{ marginLeft: 8 }}>Back</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (!property) {
      return (
        <View style={styles.centered}>
          <Text>Property not found.</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={24} color="#222" />
            <Text style={{ marginLeft: 8 }}>Back</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        <Image
          source={{ uri: property.images[0] }}
          style={styles.image}
          resizeMode="stretch"
        />
        <View style={styles.details}>
          <Text style={styles.title}>{property.title}</Text>
          <Text style={styles.location}>{property.location}</Text>
          <Text style={styles.price}>${property.price} / night</Text>
          <Text style={styles.description}>{property.description}</Text>
          {isHostSection() ? (
            <RenderListingContent property={property} editable={true} />
          ) : (
            renderPropertyContent({ item: property })
          )}
        </View>
      </ScrollView>
    );
  }

  // Experience or service fallback
  if (!item) {
    return (
      <View style={styles.centered}>
        <Text>Item not found in any data source.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#222" />
          <Text style={{ marginLeft: 8 }}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Get price text based on item type
  const getPriceText = () => {
    if (itemType === "property") {
      return `$${item.price} / night`;
    } else if (itemType === "experience") {
      return `$${item.price} / person`;
    } else if (itemType === "service") {
      return `$${item.price} / hour`;
    }
    return `$${item.price}`;
  };

  // Render type-specific content based on item type
  const renderTypeSpecificContent = () => {
    switch (itemType) {
      case "experience":
        return renderExperienceContent({ item });
      case "service":
        return renderServiceContent({ item });
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: item.images[0] }}
        style={styles.image}
        resizeMode="stretch"
      />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.price}>{getPriceText()}</Text>
        <Text style={styles.description}>{item.description}</Text>
        {renderTypeSpecificContent()}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 310,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  details: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#222",
    alignSelf: "center",
  },
  location: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "700",
    marginTop: 10,
  },
  price: {
    fontSize: 18,
    color: "#007AFF",
    marginBottom: 12,
    alignSelf: "center",
    fontWeight: "700",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#444",
    marginBottom: 16,
    alignSelf: "center",
    textAlign: "center",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
});
