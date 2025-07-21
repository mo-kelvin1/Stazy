import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { tokenStore } from "../../../../utils/tokenStore";

const PricingScreen = () => {
  const [weekdayPrice, setWeekdayPrice] = useState("35");
  const [weekendPrice, setWeekendPrice] = useState("");
  const [editing, setEditing] = useState(false);
  const [editingWeekend, setEditingWeekend] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { propertyId } = useLocalSearchParams();

  const isValid =
    !!weekdayPrice &&
    !!weekendPrice &&
    !isNaN(Number(weekdayPrice)) &&
    !isNaN(Number(weekendPrice));

  const handleNext = async () => {
    if (!isValid || !propertyId) return;

    setLoading(true);
    const token = await tokenStore.getToken();
    if (!token) {
      console.error("No auth token found");
      setLoading(false);
      return;
    }

    const propertyData = {
      price: Number(weekdayPrice),
      weekendPrice: Number(weekendPrice),
    };

    try {
      console.log(
        `[DEBUG] Sending request to update property ${propertyId} with pricing:`,
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
        console.log("[DEBUG] Property updated successfully with pricing");
        router.push({
          pathname: "./description-location",
          params: { propertyId },
        });
      } else {
        const errorData = await response.json();
        console.error("Failed to update property with pricing:", errorData);
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
        <Text style={styles.header}>Now, set a weekday base price</Text>
        <Text style={styles.subheader}>
          Tip: $35. You'll set a weekend price next.
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.dollar}>$</Text>
          {editing ? (
            <TextInput
              style={styles.priceInput}
              value={weekdayPrice}
              onChangeText={setWeekdayPrice}
              keyboardType="numeric"
              maxLength={5}
              onBlur={() => setEditing(false)}
              autoFocus
            />
          ) : (
            <Text style={styles.priceText}>{weekdayPrice}</Text>
          )}
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => setEditing(true)}
          >
            <Ionicons name="pencil-outline" size={20} color="#222" />
          </TouchableOpacity>
        </View>
        <Text style={styles.header2}>Set a weekend base price</Text>
        <View style={styles.priceRow}>
          <Text style={styles.dollar}>$</Text>
          {editingWeekend ? (
            <TextInput
              style={styles.priceInput}
              value={weekendPrice}
              onChangeText={setWeekendPrice}
              keyboardType="numeric"
              maxLength={5}
              onBlur={() => setEditingWeekend(false)}
              autoFocus
            />
          ) : (
            <Text style={styles.priceText}>{weekendPrice || "--"}</Text>
          )}
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => setEditingWeekend(true)}
          >
            <Ionicons name="pencil-outline" size={20} color="#222" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.bottomRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.nextBtn,
            (!isValid || loading) && styles.nextBtnDisabled,
          ]}
          disabled={!isValid || loading}
          onPress={handleNext}
        >
          <Text style={[styles.nextBtnText, !isValid && { color: "#bbb" }]}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 32,
    marginBottom: 8,
  },
  header2: {
    fontSize: 18,
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
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
  },
  dollar: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#222",
    marginRight: 2,
  },
  priceText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#222",
    marginHorizontal: 4,
  },
  priceInput: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#222",
    marginHorizontal: 4,
    borderBottomWidth: 1,
    borderColor: "#bbb",
    minWidth: 60,
    textAlign: "center",
  },
  editBtn: {
    marginLeft: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    padding: 4,
  },
  guestPrice: {
    textAlign: "center",
    color: "#888",
    fontSize: 15,
    marginBottom: 16,
  },
  similarBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 12,
  },
  similarBtnText: {
    color: "#e11d48",
    fontWeight: "500",
    fontSize: 15,
  },
  learnMore: {
    textAlign: "center",
    color: "#888",
    fontSize: 13,
    textDecorationLine: "underline",
    marginBottom: 24,
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

export default PricingScreen;
