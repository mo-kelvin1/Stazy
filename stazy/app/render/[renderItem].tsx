import React from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { mockExperiences } from "../../data/mockExperiences";
import { mockProperties } from "../../data/mockProperties";
import { mockServices } from "../../data/mockServices";
import { Ionicons } from "@expo/vector-icons";
import { renderExperienceContent } from "../../components/render/renderExperienceContent";
import { renderPropertyContent } from "../../components/render/renderPropertyContent";
import { renderServiceContent } from "../../components/render/renderServiceContent";

export default function UniversalDetailPage() {
  const { renderItem: itemId } = useLocalSearchParams();
  const router = useRouter();

  // Check for the item in all three mock data files
  const experience = mockExperiences.find((e) => e.id === String(itemId));
  const property = mockProperties.find((p) => p.id === String(itemId));
  const service = mockServices.find((s) => s.id === String(itemId));

  // Determine what type of item we found
  let item = null;
  let itemType = "";

  if (experience) {
    item = experience;
    itemType = "experience";
  } else if (property) {
    item = property;
    itemType = "property";
  } else if (service) {
    item = service;
    itemType = "service";
  }

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
      case "property":
        return renderPropertyContent({ item });
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

        {/* Render type-specific content */}
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
