import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { tokenStore } from "../../../../utils/tokenStore";

const HIGHLIGHTS = [
  {
    key: "peaceful",
    label: "Peaceful",
    icon: <Ionicons name="leaf-outline" size={20} color="#222" />,
  },
  {
    key: "unique",
    label: "Unique",
    icon: (
      <MaterialCommunityIcons
        name="star-four-points-outline"
        size={20}
        color="#222"
      />
    ),
  },
  {
    key: "family",
    label: "Family-friendly",
    icon: <Ionicons name="people-outline" size={20} color="#222" />,
  },
  {
    key: "stylish",
    label: "Stylish",
    icon: <Ionicons name="shirt-outline" size={20} color="#222" />,
  },
  {
    key: "central",
    label: "Central",
    icon: <Ionicons name="location-outline" size={20} color="#222" />,
  },
  {
    key: "spacious",
    label: "Spacious",
    icon: (
      <MaterialCommunityIcons
        name="account-group-outline"
        size={20}
        color="#222"
      />
    ),
  },
];

const HighlightsScreen = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { propertyId } = useLocalSearchParams();

  const handleNext = async () => {
    if (!propertyId || selected.length !== 2) return;

    setLoading(true);
    const token = await tokenStore.getToken();
    if (!token) {
      console.error("No auth token found");
      setLoading(false);
      return;
    }

    const propertyData = {
      highlights: selected,
    };

    try {
      console.log(
        `[DEBUG] Sending request to update property ${propertyId} with highlights:`,
        propertyData
      );
      const response = await fetch(
        `http://10.132.119.88:8080/api/properties/${propertyId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(propertyData),
        }
      );

      if (response.ok) {
        console.log("[DEBUG] Property updated successfully with highlights");
        router.push({
          pathname: "./title",
          params: { propertyId },
        });
      } else {
        const errorData = await response.json();
        console.error("Failed to update property with highlights:", errorData);
      }
    } catch (error) {
      console.error("Error sending request:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleHighlight = (key: string) => {
    let newSelected;
    if (selected.includes(key)) {
      newSelected = selected.filter((k) => k !== key);
    } else if (selected.length < 2) {
      newSelected = [...selected, key];
    } else {
      newSelected = selected;
    }
    setSelected(newSelected);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.header}>Next, let's describe your house</Text>
        <Text style={styles.subheader}>
          Choose up to 2 highlights. We'll use these to get your description
          started.
        </Text>
        <View style={styles.grid}>
          {HIGHLIGHTS.map((h) => (
            <TouchableOpacity
              key={h.key}
              style={[
                styles.highlight,
                selected.includes(h.key) && styles.selectedHighlight,
              ]}
              onPress={() => toggleHighlight(h.key)}
              activeOpacity={0.8}
              disabled={selected.length === 2 && !selected.includes(h.key)}
            >
              {h.icon}
              <Text style={styles.highlightLabel}>{h.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.bottomRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.nextBtn,
            (selected.length !== 2 || loading) && styles.nextBtnDisabled,
          ]}
          disabled={selected.length !== 2 || loading}
          onPress={handleNext}
        >
          <Text
            style={[
              styles.nextBtnText,
              selected.length !== 2 && { color: "#bbb" },
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    marginBottom: 8,
  },
  topBtn: {
    backgroundColor: "#fafafa",
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#eee",
  },
  topBtnText: {
    color: "#222",
    fontWeight: "500",
    fontSize: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 32,
    marginBottom: 8,
  },
  subheader: {
    fontSize: 15,
    color: "#888",
    marginHorizontal: 20,
    marginBottom: 24,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginHorizontal: 20,
  },
  highlight: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginRight: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  selectedHighlight: {
    borderColor: "#222",
    backgroundColor: "#f0f0f0",
  },
  highlightLabel: {
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
    marginLeft: 8,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 8,
    backgroundColor: "#fff",
  },
  backText: {
    color: "#222",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  nextBtn: {
    backgroundColor: "#222",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: "center",
  },
  nextBtnDisabled: {
    backgroundColor: "#eee",
  },
  nextBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HighlightsScreen;
