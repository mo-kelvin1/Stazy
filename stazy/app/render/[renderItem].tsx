import React from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { renderExperienceContent } from "../../components/render/renderExperienceContent";
import { renderServiceContent } from "../../components/render/renderServiceContent";
import { renderPropertyContent } from "../../components/render/renderPropertyContent";
import { renderHostExperienceContent } from "../../components/render/renderHostExperienceContent";
import { renderHostServiceContent } from "../../components/render/renderHostServiceContent";
import { renderListingContent } from "../../components/render/renderListingContent";

export default function UniversalDetailPage() {
  const { renderItem: itemId, pageName, activeTab } = useLocalSearchParams();
  const router = useRouter();

  console.log("🔍 [DEBUG] renderItem.tsx - Initial render");
  console.log("🔍 [DEBUG] itemId:", itemId);
  console.log("🔍 [DEBUG] pageName:", pageName);
  console.log("🔍 [DEBUG] activeTab:", activeTab);

  if (!itemId) {
    console.log("🔍 [DEBUG] No itemId provided");
    return (
      <View style={styles.centered}>
        <Text>No item ID provided.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#222" />
          <Text style={{ marginLeft: 8 }}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Determine which render component to use based on page and tab
  const getRenderComponent = () => {
    console.log("🔍 [DEBUG] getRenderComponent() called");
    console.log("🔍 [DEBUG] pageName:", pageName, "activeTab:", activeTab);

    if (pageName === "index") {
      // Home page - use regular render components
      switch (activeTab) {
        case "Homes":
          console.log("🔍 [DEBUG] Using renderPropertyContent for index/Homes");
          return renderPropertyContent({ itemId: String(itemId) });
        case "Services":
          console.log(
            "🔍 [DEBUG] Using renderServiceContent for index/Services"
          );
          return renderServiceContent({ itemId: String(itemId) });
        case "Experiences":
          console.log(
            "🔍 [DEBUG] Using renderExperienceContent for index/Experiences"
          );
          return renderExperienceContent({ itemId: String(itemId) });
        default:
          console.log(
            "🔍 [DEBUG] Defaulting to renderPropertyContent for index"
          );
          return renderPropertyContent({ itemId: String(itemId) });
      }
    } else if (pageName === "listings") {
      // Listings page - use host render components
      switch (activeTab) {
        case "Homes":
          console.log(
            "🔍 [DEBUG] Using renderListingContent for listings/Homes"
          );
          return renderListingContent({ itemId: String(itemId) });
        case "Services":
          console.log(
            "🔍 [DEBUG] Using renderHostServiceContent for listings/Services"
          );
          return renderHostServiceContent({ itemId: String(itemId) });
        case "Experiences":
          console.log(
            "🔍 [DEBUG] Using renderHostExperienceContent for listings/Experiences"
          );
          return renderHostExperienceContent({ itemId: String(itemId) });
        default:
          console.log(
            "🔍 [DEBUG] Defaulting to renderListingContent for listings"
          );
          return renderListingContent({ itemId: String(itemId) });
      }
    } else {
      console.log(
        "🔍 [DEBUG] Unknown pageName, defaulting to renderPropertyContent"
      );
      return renderPropertyContent({ itemId: String(itemId) });
    }
  };

  console.log("🔍 [DEBUG] About to render content");
  return (
    <ScrollView style={styles.container}>{getRenderComponent()}</ScrollView>
  );
}

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
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
});
