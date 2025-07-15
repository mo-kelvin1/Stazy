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

  if (!itemId) {
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

  const getRenderComponent = () => {
    if (pageName === "index") {
      switch (activeTab) {
        case "Homes":
          return renderPropertyContent({ itemId: String(itemId) });
        case "Services":
          return renderServiceContent({ itemId: String(itemId) });
        case "Experiences":
          return renderExperienceContent({ itemId: String(itemId) });
        default:
          return renderPropertyContent({ itemId: String(itemId) });
      }
    } else if (pageName === "listings") {
      switch (activeTab) {
        case "Homes":
          return renderListingContent({ itemId: String(itemId) });
        case "Services":
          return renderHostServiceContent({ itemId: String(itemId) });
        case "Experiences":
          return renderHostExperienceContent({ itemId: String(itemId) });
        default:
          return renderListingContent({ itemId: String(itemId) });
      }
    } else {
      return renderPropertyContent({ itemId: String(itemId) });
    }
  };

  const renderContent = getRenderComponent();

  return <ScrollView style={styles.container}>{renderContent}</ScrollView>;
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
