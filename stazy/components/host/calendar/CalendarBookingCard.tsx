import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Booking {
  id: number;
  startDate: string;
  endDate: string;
  numberOfGuests: number;
  totalPrice: number;
  status: string;
  entityTitle?: string;
  entityLocation?: string;
  bookingType?: string;
  hostId?: number;
  userEmail?: string;
  userFirstName?: string;
  userLastName?: string;
}

const CalendarBookingCard = ({ booking }: { booking: Booking }) => (
  <View style={styles.bookingCard}>
    <Text style={styles.bookingTitle}>{booking.entityTitle || "Untitled"}</Text>
    <Text style={styles.bookingLocation}>
      {booking.entityLocation || "No location"}
    </Text>
    <Text style={styles.bookingDetails}>
      {booking.numberOfGuests} guests • ${booking.totalPrice.toFixed(2)}
    </Text>
    <Text style={styles.bookingStatus}>{booking.status}</Text>
    <View style={styles.userInfoContainer}>
      <Text style={styles.userInfoLabel}>Guest:</Text>
      <Text style={styles.userInfoText}>
        {booking.userFirstName && booking.userLastName
          ? `${booking.userFirstName} ${booking.userLastName}`
          : booking.userEmail || "Guest information not available"}
      </Text>
    </View>
    {booking.userEmail && (
      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfoLabel}>Email:</Text>
        <Text style={styles.userInfoText}>{booking.userEmail}</Text>
      </View>
    )}
    <View style={styles.userInfoContainer}>
      <Text style={styles.userInfoLabel}>Dates:</Text>
      <Text style={styles.userInfoText}>
        {new Date(booking.startDate).toLocaleDateString()} -{" "}
        {new Date(booking.endDate).toLocaleDateString()}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  bookingCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  bookingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  bookingLocation: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  bookingDetails: {
    fontSize: 14,
    color: "#000",
    marginBottom: 4,
  },
  bookingStatus: {
    fontSize: 12,
    color: "#007AFF",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  userInfoContainer: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  userInfoLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
    marginRight: 5,
  },
  userInfoText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "400",
  },
});

export default CalendarBookingCard;
