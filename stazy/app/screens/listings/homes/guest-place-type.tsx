import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { tokenStore } from "../../../../utils/tokenStore";

const PLACE_TYPE_OPTIONS = [
  {
    key: "entire_place",
    title: "An entire place",
    description: "Guests have the whole place to themselves.",
    icon: "home-outline",
  },
  {
    key: "room",
    title: "A room",
    description:
      "Guests have their own room in a home, plus access to shared spaces.",
    icon: "navigate",
  },
  {
    key: "shared_room",
    title: "A shared room in a hostel",
    description:
      "Guests sleep in a shared room in a professionally managed hostel with staff on-site 24/7.",
    icon: "people-outline",
  },
];

const GuestPlaceTypeScreen = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNext = async () => {
    if (!selected) return;

    setLoading(true);
    const token = await tokenStore.getToken();
    if (!token) {
      console.error("No auth token found");
      setLoading(false);
      return;
    }

    const propertyData = {
      propertyType: selected,
    };

    try {
      console.log(
        "[DEBUG] Sending request to create property with type:",
        propertyData
      );
      const response = await fetch("http://10.132.119.88:8080/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(propertyData),
      });

      if (response.ok) {
        const responseText = await response.text();
        console.log("[DEBUG] Raw backend response:", responseText);
        try {
          const responseData = JSON.parse(responseText);
          console.log(
            "[DEBUG] Property created successfully, ID:",
            responseData.propertyId
          );
          router.push({
            pathname: "./home-details",
            params: { propertyId: responseData.propertyId },
          });
        } catch (e) {
          console.error("Failed to parse JSON from response:", e);
        }
      } else {
        const errorData = await response.json();
        console.error("Failed to create property:", errorData);
      }
    } catch (error) {
      console.error("Error sending request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.question}>
          What type of place will guests have?
        </Text>
        <View style={styles.optionsCol}>
          {PLACE_TYPE_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.key}
              style={[
                styles.option,
                selected === opt.key && styles.selectedOption,
              ]}
              onPress={() => setSelected(opt.key)}
              activeOpacity={0.8}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.optionTitle}>{opt.title}</Text>
                <Text style={styles.optionDesc}>{opt.description}</Text>
              </View>
              <Ionicons
                name={opt.icon as any}
                size={28}
                color="#222"
                style={{ marginLeft: 12 }}
              />
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
            (!selected || loading) && styles.nextBtnDisabled,
          ]}
          disabled={!selected || loading}
          onPress={handleNext}
        >
          <Text style={[styles.nextBtnText, !selected && { color: "#bbb" }]}>
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
  question: {
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 24,
  },
  optionsCol: {
    marginHorizontal: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderRadius: 18,
    paddingVertical: 24,
    paddingHorizontal: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#eee",
  },
  selectedOption: {
    borderColor: "#222",
    backgroundColor: "#f0f0f0",
  },
  optionTitle: {
    fontSize: 17,
    color: "#222",
    fontWeight: "600",
    marginBottom: 4,
  },
  optionDesc: {
    fontSize: 14,
    color: "#888",
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

export default GuestPlaceTypeScreen;
