import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";

const tokenStore = new SimulatedTokenStore();

const ReviewAndContinueScreen = () => {
  const router = useRouter();
  const { item: itemParam, type } = useLocalSearchParams();
  let item: any = {};
  try {
    item = typeof itemParam === "string" ? JSON.parse(itemParam) : itemParam;
  } catch {
    item = itemParam || {};
  }
  const [payNow, setPayNow] = React.useState(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const title = item.title || "Untitled";
  const image =
    item.images && item.images.length > 0 ? item.images[0] : undefined;
  const rating = item.rating || 0;
  const ratingCount = item.ratingCount || 0;
  const price = item.price || 0;
  const currency = item.currency || "USD";
  const dateRange = item.dateRange || "Select dates";
  const guests = item.guests || 1;
  const freeCancelDate = item.freeCancelDate || "N/A";

  const handleBookNow = async () => {
    if (!startDate || !endDate) {
      Alert.alert("Error", "Please select both start and end dates.");
      return;
    }
    if (endDate <= startDate) {
      Alert.alert("Error", "End date must be after start date.");
      return;
    }
    setLoading(true);
    try {
      const token = await tokenStore.getToken();
      if (!token) {
        Alert.alert("Error", "User not authenticated.");
        setLoading(false);
        return;
      }
      const res = await fetch("http://10.133.134.146:8080/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          entityId: item.id,
          startDate: startDate.toISOString().slice(0, 10),
          endDate: endDate.toISOString().slice(0, 10),
          numberOfGuests: guestCount,
          specialRequests: "",
          bookingType:
            type === "reserve"
              ? "PROPERTY"
              : type === "request"
              ? "EXPERIENCE"
              : type === "service"
              ? "SERVICE"
              : "PROPERTY",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        Alert.alert("Success", "Booking request sent!");
        router.replace("/(tabs)/trips");
      } else {
        Alert.alert(
          "Booking Failed",
          data.message || "Could not book property."
        );
      }
    } catch (e) {
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flexGrow: 1 }}>
        <Text style={styles.header}>Review and continue</Text>
        <View style={styles.card}>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <View style={styles.cardContent}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.rating}>
                {rating.toFixed(2)} ({ratingCount})
              </Text>
            </View>
            <View style={styles.rowBetween}>
              <View>
                <Text style={styles.label}>Trip details</Text>
                <Text style={styles.value}>{dateRange}</Text>
                <Text style={styles.value}>
                  {guests} adult{guests > 1 ? "s" : ""}
                </Text>
              </View>
              <TouchableOpacity style={styles.changeBtn}>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rowBetween}>
              <View>
                <Text style={styles.label}>Total price</Text>
                <Text style={styles.value}>
                  ${price.toFixed(2)} {currency}
                </Text>
              </View>
              <TouchableOpacity style={styles.changeBtn}>
                <Text style={styles.changeText}>Details</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.freeCancel}>Free cancellation</Text>
            <Text style={styles.cancelPolicy}>
              Cancel before {freeCancelDate} for a full refund.{" "}
              <Text style={styles.link}>Full policy</Text>
            </Text>
          </View>
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 16 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8 }}>
            Select your stay dates
          </Text>
          <TouchableOpacity
            onPress={() => setShowStartPicker(true)}
            style={styles.dateInput}
          >
            <Text style={{ color: startDate ? "#222" : "#888" }}>
              {startDate ? startDate.toDateString() : "Select start date"}
            </Text>
          </TouchableOpacity>
          {showStartPicker && (
            <DateTimePicker
              value={startDate || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              minimumDate={new Date()}
              textColor="#000000"
              accentColor="#007AFF"
              onChange={(event: any, date?: Date) => {
                setShowStartPicker(false);
                if (date) setStartDate(date);
              }}
            />
          )}
          <TouchableOpacity
            onPress={() => setShowEndPicker(true)}
            style={styles.dateInput}
          >
            <Text style={{ color: endDate ? "#222" : "#888" }}>
              {endDate ? endDate.toDateString() : "Select end date"}
            </Text>
          </TouchableOpacity>
          {showEndPicker && (
            <DateTimePicker
              value={endDate || startDate || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              minimumDate={startDate || new Date()}
              textColor="#000000"
              accentColor="#007AFF"
              onChange={(event: any, date?: Date) => {
                setShowEndPicker(false);
                if (date) setEndDate(date);
              }}
            />
          )}
          <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 16 }}>
            Guests
          </Text>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}
          >
            <TouchableOpacity
              onPress={() => setGuestCount(Math.max(1, guestCount - 1))}
              style={styles.guestBtn}
            >
              <Text style={{ fontSize: 20 }}>-</Text>
            </TouchableOpacity>
            <Text style={{ marginHorizontal: 16, fontSize: 16 }}>
              {guestCount}
            </Text>
            <TouchableOpacity
              onPress={() => setGuestCount(guestCount + 1)}
              style={styles.guestBtn}
            >
              <Text style={{ fontSize: 20 }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.choosePay}>Choose when to pay</Text>
        <View style={styles.payOptions}>
          <TouchableOpacity
            style={styles.payOption}
            onPress={() => setPayNow(true)}
          >
            <View style={styles.radioCircle}>
              {payNow && <View style={styles.radioDot} />}
            </View>
            <Text style={styles.payText}>Pay ${price.toFixed(2)} now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.payOption}
            onPress={() => setPayNow(false)}
          >
            <View style={styles.radioCircle}>
              {!payNow && <View style={styles.radioDot} />}
            </View>
            <Text style={styles.payText}>Pay $0 now</Text>
            <Text style={styles.paySubText}>
              ${price.toFixed(2)} charged later. No extra fees.{" "}
              <Text style={styles.link}>More info</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[styles.nextBtn, loading && { opacity: 0.5 }]}
        onPress={handleBookNow}
        disabled={loading}
      >
        <Text style={styles.nextBtnText}>
          {loading ? "Booking..." : "Book Now"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", margin: 20 },
  card: {
    backgroundColor: "#fafafa",
    borderRadius: 16,
    margin: 16,
    padding: 0,
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardContent: { padding: 16 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  ratingRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  rating: { marginLeft: 4, fontSize: 14, color: "#444" },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  label: { fontSize: 14, color: "#888" },
  value: { fontSize: 15, color: "#222" },
  changeBtn: { padding: 6 },
  changeText: { color: "#007AFF", fontWeight: "bold" },
  freeCancel: { color: "#008000", fontWeight: "bold", marginTop: 8 },
  cancelPolicy: { color: "#444", fontSize: 13, marginTop: 2 },
  link: { color: "#007AFF", textDecorationLine: "underline" },
  choosePay: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 16,
  },
  payOptions: {
    margin: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 8,
  },
  payOption: { flexDirection: "row", alignItems: "center", padding: 12 },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#222",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  radioDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: "#222" },
  payText: { fontSize: 15, color: "#222" },
  paySubText: { fontSize: 12, color: "#888", marginLeft: 8 },
  nextBtn: {
    backgroundColor: "#222",
    margin: 16,
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
  },
  nextBtnText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  guestBtn: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#f5f5f5",
  },
});

export default ReviewAndContinueScreen;
