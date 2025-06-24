import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";

export default function BookingDetails() {
  const route = useRoute();
  const { booking: bookingString } = route.params;
  const booking = JSON.parse(bookingString);

  if (!booking) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>No booking data found.</Text>
      </SafeAreaView>
    );
  }

const handleMessageGuest = () => {
  router.push({
    pathname: `/messages/${booking.guestId}`,
    params: {
      fullName: booking.guestName,
      email: booking.email || "",
      status: booking.status || "Pending",           // or actual field from your data
      bookingTime: booking.time || "Unknown time",   // adjust field name as needed
      placeName: booking.location || "Unknown location",   // adjust field name as needed
      bookingDate: booking.date || "Unknown date",   // adjust field name as needed
      bookingDuration: booking.duration || "Unknown duration", // adjust field name as needed
    },
  });
};


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Booking Details</Text>

        {/* Service Info */}
        <View style={styles.card}>
          <SectionTitle title="Service Info" />
          <Detail label="Service" value={booking.service} />
          <Detail label="Date" value={booking.date} />
          <Detail label="Time" value={booking.time || "N/A"} />
          <Detail label="Duration" value={booking.duration || "N/A"} />
          <Detail label="Status" value={booking.status || "Pending"} />
        </View>

        {/* Guest Info */}
        <View style={styles.card}>
          <View style={styles.guestHeader}>
            <SectionTitle title="Guest Info" />
            <TouchableOpacity onPress={handleMessageGuest} style={styles.messageBtn}>
              <Text style={styles.messageBtnText}>Message Guest</Text>
            </TouchableOpacity>
          </View>
          <Detail label="Guest Name" value={booking.guestName} />
          <Detail label="Email" value={booking.email || "N/A"} />
          <Detail label="Phone Number" value={booking.phoneNumber || "N/A"} />
        </View>

        {/* Additional Info */}
        <View style={styles.card}>
          <SectionTitle title="Additional Details" />
          <Detail label="Location" value={booking.location || "N/A"} />
          <Detail label="Guests" value={booking.numberOfGuests?.toString() || "1"} />
          <Detail label="Special Requests" value={booking.specialRequests || "None"} />
          <Detail label="Notes" value={booking.notes || "None"} />
        </View>

        {/* Payment & Metadata */}
        <View style={styles.card}>
          <SectionTitle title="Payment & Metadata" />
          <Detail
            label="Price"
            value={
              booking.price
                ? `${booking.price} ${booking.currency || ""}`
                : "N/A"
            }
          />
          <Detail label="Booking ID" value={booking.id} />
          <Detail label="Created At" value={booking.createdAt || "N/A"} />
          <Detail label="Updated At" value={booking.updatedAt || "N/A"} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionTitle({ title }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

function Detail({ label, value }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  guestHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  messageBtn: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  messageBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 4,
  },
  detailRow: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: "#888",
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 100,
  },
});
