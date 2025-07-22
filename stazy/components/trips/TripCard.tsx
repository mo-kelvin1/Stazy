import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Booking } from "../../context/actions/refreshBookings";

const TripCard = ({
  booking,
  onCancelBooking,
  onMessageHost,
}: {
  booking: Booking;
  onCancelBooking: () => void;
  onMessageHost: () => void;
}) => {
  const startDate = new Date(booking.startDate);
  const endDate = new Date(booking.endDate);
  const today = new Date();
  const isUpcoming = startDate > today;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDuration = () => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays > 1 ? "s" : ""}`;
  };

  const getStatusColor = () => {
    switch (booking.status) {
      case "CONFIRMED":
        return "#28a745";
      case "PENDING":
        return "#ffc107";
      case "CANCELLED":
        return "#dc3545";
      case "COMPLETED":
        return "#6c757d";
      default:
        return "#666";
    }
  };

  const getBookingTypeIcon = () => {
    switch (booking.bookingType) {
      case "PROPERTY":
        return "home";
      case "SERVICE":
        return "construct";
      case "EXPERIENCE":
        return "airplane";
      default:
        return "home";
    }
  };

  const getBookingTypeColor = () => {
    switch (booking.bookingType) {
      case "PROPERTY":
        return "#007AFF";
      case "SERVICE":
        return "#FF9500";
      case "EXPERIENCE":
        return "#34C759";
      default:
        return "#007AFF";
    }
  };

  return (
    <View style={styles.tripCard}>
      <View style={styles.tripImageContainer}>
        <View style={styles.tripImage}>
          {booking.entityImages ? (
            <Image
              source={{ uri: booking.entityImages }}
              style={{ width: 60, height: 60, borderRadius: 8 }}
            />
          ) : (
            <Ionicons
              name={getBookingTypeIcon()}
              size={40}
              color={getBookingTypeColor()}
            />
          )}
        </View>
        <View style={styles.tripStatus}>
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {booking.status}
          </Text>
        </View>
      </View>
      <View style={styles.tripDetails}>
        <View style={styles.tripHeader}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Text
              style={styles.tripDestination}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {booking.entityTitle || "Booking"}
            </Text>
            <View style={{ flex: 1 }} />
            <View
              style={[
                styles.bookingTypeBadge,
                {
                  backgroundColor: getBookingTypeColor() + "20",
                  minWidth: 64,
                  alignItems: "center",
                },
              ]}
            >
              <Text
                style={[
                  styles.bookingTypeText,
                  { color: getBookingTypeColor() },
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {booking.bookingType || "PROPERTY"}
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.tripLocation}>
          {booking.entityLocation || "Location not specified"}
        </Text>
        <Text style={styles.tripHost}>
          Host: {booking.hostEmail || "Host information not available"}
        </Text>
        <Text style={styles.tripDates}>
          {formatDate(startDate)} - {formatDate(endDate)}
        </Text>
        <View style={styles.tripInfo}>
          <View style={styles.infoItem}>
            <Ionicons name="calendar-outline" size={16} color="#666" />
            <Text style={styles.infoText}>{getDuration()}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="people-outline" size={16} color="#666" />
            <Text style={styles.infoText}>
              {booking.numberOfGuests} guest
              {booking.numberOfGuests > 1 ? "s" : ""}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="card-outline" size={16} color="#666" />
            <Text style={styles.infoText}>${booking.totalPrice}</Text>
          </View>
        </View>
        {/* Action Buttons for Bookings (always show) */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCancelBooking}
          >
            <Text style={styles.cancelButtonText}>Cancel Booking</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.messageButton}
            onPress={onMessageHost}
          >
            <Text style={styles.messageButtonText}>Message Host</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tripCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tripImageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  tripImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#f0f8ff",
    justifyContent: "center",
    alignItems: "center",
  },
  tripStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#f0f8ff",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  tripDetails: {
    flex: 1,
  },
  tripDestination: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    flexShrink: 1,
    maxWidth: 180,
  },
  tripHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  bookingTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bookingTypeText: {
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  tripLocation: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  tripHost: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
    fontStyle: "italic",
  },
  tripDates: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  tripInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  actionButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#dc3545",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  messageButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 8,
  },
  messageButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default TripCard;
