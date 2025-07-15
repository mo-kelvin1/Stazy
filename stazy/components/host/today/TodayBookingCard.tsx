import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

interface TodayBookingCardProps {
  booking: Booking;
  onAction: (bookingId: number, action: "confirm" | "reject") => void;
  formatDate: (date: string) => string;
  formatTime: (date: string) => string;
  getBookingTypeIcon: (type?: string) => string;
  getBookingTypeColor: (type?: string) => string;
}

const TodayBookingCard: React.FC<TodayBookingCardProps> = ({
  booking,
  onAction,
  formatDate,
  formatTime,
  getBookingTypeIcon,
  getBookingTypeColor,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={getBookingTypeIcon(booking.bookingType) as any}
            size={28}
            color={getBookingTypeColor(booking.bookingType)}
          />
        </View>
        <Text style={styles.statusText}>{booking.status}</Text>
      </View>
      <Text style={styles.title}>{booking.entityTitle || "Untitled"}</Text>
      <Text style={styles.location}>
        {booking.entityLocation || "No location"}
      </Text>
      <Text style={styles.dates}>
        {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
      </Text>
      <View style={styles.infoRow}>
        <Text style={styles.infoText}>{booking.numberOfGuests} guests</Text>
        <Text style={styles.infoText}>${booking.totalPrice}</Text>
      </View>
      <View style={styles.guestRow}>
        <Text style={styles.guestLabel}>Guest:</Text>
        <Text style={styles.guestName}>
          {booking.userFirstName && booking.userLastName
            ? `${booking.userFirstName} ${booking.userLastName}`
            : booking.userEmail || "Guest info unavailable"}
        </Text>
      </View>
      {booking.status === "PENDING" && (
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.confirmButton]}
            onPress={() => onAction(booking.id, "confirm")}
          >
            <Text style={styles.actionButtonText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.rejectButton]}
            onPress={() => onAction(booking.id, "reject")}
          >
            <Text style={styles.actionButtonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  iconContainer: {
    marginRight: 12,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#222",
  },
  location: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  dates: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
  },
  guestRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  guestLabel: {
    fontSize: 13,
    color: "#888",
    marginRight: 4,
  },
  guestName: {
    fontSize: 13,
    color: "#444",
    fontStyle: "italic",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
    gap: 12,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  confirmButton: {
    backgroundColor: "#28a745",
    marginRight: 8,
  },
  rejectButton: {
    backgroundColor: "#dc3545",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default TodayBookingCard;
