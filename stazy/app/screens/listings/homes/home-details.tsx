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
import { useRouter, useLocalSearchParams } from "expo-router";
import { tokenStore } from "../../../../utils/tokenStore";

const PLACE_OPTIONS = [
  { key: "house", label: "House", icon: "home-outline" },
  { key: "flat", label: "Flat/apartment", icon: "business-outline" },
  { key: "barn", label: "Barn", icon: "storefront-outline" },
  { key: "bed_breakfast", label: "Bed & breakfast", icon: "cafe-outline" },
  { key: "boat", label: "Boat", icon: "boat-outline" },
  { key: "cabin", label: "Cabin", icon: "home" },
  { key: "campervan", label: "Campervan/\nmotorhome", icon: "car-outline" },
  { key: "casa_particular", label: "Casa particular", icon: "business" },
];

const HomeDetailsScreen = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { propertyId } = useLocalSearchParams();

  console.log("[DEBUG] In home-details.tsx, received propertyId:", propertyId);

  const handleNext = async () => {
    if (!selected || !propertyId) return;

    setLoading(true);
    const token = await tokenStore.getToken();
    if (!token) {
      console.error("No auth token found");
      setLoading(false);
      return;
    }

    const propertyData = {
      category: selected,
    };

    try {
      console.log(
        `[DEBUG] Sending request to update property ${propertyId} with category:`,
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
        const responseData = await response.json();
        console.log("[DEBUG] Property updated successfully:", responseData);
        router.push({
          pathname: "./basics",
          params: { propertyId },
        });
      } else {
        const errorData = await response.json();
        console.error("Failed to update property:", errorData);
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
          Which of these best describes your place?
        </Text>
        <View style={styles.grid}>
          {PLACE_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.key}
              style={[
                styles.option,
                selected === opt.key && styles.selectedOption,
              ]}
              onPress={() => setSelected(opt.key)}
              activeOpacity={0.8}
            >
              <Ionicons
                name={opt.icon as any}
                size={32}
                color="#222"
                style={{ marginBottom: 8 }}
              />
              <Text style={styles.optionLabel}>{opt.label}</Text>
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  option: {
    width: "47%",
    backgroundColor: "#fafafa",
    borderRadius: 18,
    paddingVertical: 24,
    paddingHorizontal: 12,
    marginBottom: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
  selectedOption: {
    borderColor: "#222",
    backgroundColor: "#f0f0f0",
  },
  optionLabel: {
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
    textAlign: "center",
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

export default HomeDetailsScreen;
