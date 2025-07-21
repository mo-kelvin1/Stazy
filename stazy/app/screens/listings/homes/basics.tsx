import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { tokenStore } from "../../../../utils/tokenStore";

const BasicsScreen = () => {
  const [guests, setGuests] = useState(4);
  const [bedrooms, setBedrooms] = useState(1);
  const [beds, setBeds] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
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
      minGuests: guests,
      maxGuests: guests,
      bedrooms,
      beds,
      bathrooms,
    };

    try {
      console.log(
        `[DEBUG] Sending request to update property ${propertyId} with basics:`,
        propertyData
      );
      const response = await fetch(
        `http://100.66.192.76:8080/api/properties/${propertyId}`,
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
          pathname: "./amenities",
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

  const renderRow = (
    label: string,
    value: number,
    setValue: (v: number) => void,
    min: number = 1
  ) => (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <View style={styles.rowControls}>
        <TouchableOpacity
          style={styles.circleBtn}
          onPress={() => setValue(Math.max(min, value - 1))}
        >
          <Text style={styles.circleBtnText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.rowValue}>{value}</Text>
        <TouchableOpacity
          style={styles.circleBtn}
          onPress={() => setValue(value + 1)}
        >
          <Text style={styles.circleBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.header}>Share some basics about your place</Text>
        <Text style={styles.subheader}>
          You'll add more details later, such as bed types.
        </Text>
        <View style={styles.rowsContainer}>
          {renderRow("Guests", guests, setGuests, 1)}
          {renderRow("Bedrooms", bedrooms, setBedrooms, 1)}
          {renderRow("Beds", beds, setBeds, 1)}
          {renderRow("Bathrooms", bathrooms, setBathrooms, 1)}
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
    marginBottom: 24,
  },
  rowsContainer: {
    marginHorizontal: 20,
    marginTop: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rowLabel: {
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
  },
  rowControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  circleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#bbb",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    backgroundColor: "#fff",
  },
  circleBtnText: {
    fontSize: 22,
    color: "#222",
    fontWeight: "bold",
  },
  rowValue: {
    fontSize: 18,
    color: "#222",
    fontWeight: "500",
    minWidth: 24,
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

export default BasicsScreen;
