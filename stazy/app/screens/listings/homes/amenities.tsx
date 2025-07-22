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

const AMENITIES = [
  {
    key: "wifi",
    label: "Wifi",
    icon: <Ionicons name="wifi-outline" size={28} color="#222" />,
  },
  {
    key: "tv",
    label: "TV",
    icon: <Ionicons name="tv-outline" size={28} color="#222" />,
  },
  {
    key: "kitchen",
    label: "Kitchen",
    icon: <Ionicons name="restaurant-outline" size={28} color="#222" />,
  },
  {
    key: "washing",
    label: "Washing machine",
    icon: <Ionicons name="water-outline" size={28} color="#222" />,
  },
  {
    key: "free_parking",
    label: "Free parking on premises",
    icon: <Ionicons name="car-outline" size={28} color="#222" />,
  },
  {
    key: "paid_parking",
    label: "Paid parking on premises",
    icon: <MaterialCommunityIcons name="parking" size={28} color="#222" />,
  },
  {
    key: "air_conditioning",
    label: "Air conditioning",
    icon: <Ionicons name="snow-outline" size={28} color="#222" />,
  },
  {
    key: "workspace",
    label: "Dedicated workspace",
    icon: <Ionicons name="desktop-outline" size={28} color="#222" />,
  },
  {
    key: "pool",
    label: "Pool",
    icon: <Ionicons name="water-outline" size={28} color="#222" />,
  },
  {
    key: "hot_tub",
    label: "Hot tub",
    icon: <MaterialCommunityIcons name="hot-tub" size={28} color="#222" />,
  },
  {
    key: "gym",
    label: "Gym",
    icon: <Ionicons name="barbell-outline" size={28} color="#222" />,
  },
  {
    key: "pet_friendly",
    label: "Pet friendly",
    icon: <Ionicons name="paw-outline" size={28} color="#222" />,
  },
];

const AmenitiesScreen = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { propertyId } = useLocalSearchParams();

  const handleNext = async () => {
    if (!propertyId) return;

    setLoading(true);
    const token = await tokenStore.getToken();
    if (!token) {
      console.error("No auth token found");
      setLoading(false);
      return;
    }

    const propertyData = {
      amenities: selected,
    };

    try {
      console.log(
        `[DEBUG] Sending request to update property ${propertyId} with amenities:`,
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
        console.log("[DEBUG] Property updated successfully");
        router.push({
          pathname: "./photos",
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

  const toggleAmenity = (key: string) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.header}>
          Tell guests what your place has to offer
        </Text>
        <Text style={styles.subheader}>
          You can add more amenities after you publish your listing.
        </Text>
        <Text style={styles.favLabel}>What about these guest favourites?</Text>
        <View style={styles.grid}>
          {AMENITIES.map((amenity) => (
            <TouchableOpacity
              key={amenity.key}
              style={[
                styles.amenity,
                selected.includes(amenity.key) && styles.selectedAmenity,
              ]}
              onPress={() => toggleAmenity(amenity.key)}
              activeOpacity={0.8}
            >
              {amenity.icon}
              <Text style={styles.amenityLabel}>{amenity.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.bottomRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nextBtn, loading && styles.nextBtnDisabled]}
          disabled={loading}
          onPress={handleNext}
        >
          <Text style={styles.nextBtnText}>Next</Text>
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
    marginTop: 24,
    marginBottom: 8,
  },
  subheader: {
    fontSize: 15,
    color: "#888",
    marginHorizontal: 20,
    marginBottom: 16,
  },
  favLabel: {
    fontSize: 15,
    color: "#222",
    marginHorizontal: 20,
    marginBottom: 12,
    fontWeight: "500",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  amenity: {
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
  selectedAmenity: {
    borderColor: "#222",
    backgroundColor: "#f0f0f0",
  },
  amenityLabel: {
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
    textAlign: "center",
    marginTop: 8,
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

export default AmenitiesScreen;
