import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import TodayBookingCard from "./TodayBookingCard";

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

interface TodayBookingListProps {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  onAction: (bookingId: number, action: "confirm" | "reject") => void;
  formatDate: (date: string) => string;
  formatTime: (date: string) => string;
  getBookingTypeIcon: (type?: string) => string;
  getBookingTypeColor: (type?: string) => string;
  onBookingPress?: (booking: Booking) => void;
}

const TodayBookingList: React.FC<TodayBookingListProps> = ({
  bookings,
  loading,
  error,
  onAction,
  formatDate,
  formatTime,
  getBookingTypeIcon,
  getBookingTypeColor,
  onBookingPress,
}) => {
  if (loading) {
    return (
      <View style={styles.stateContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.stateText}>Loading today's bookings...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.stateContainer}>
        <Text style={styles.stateText}>{error}</Text>
      </View>
    );
  }
  if (bookings.length === 0) {
    return (
      <View style={styles.stateContainer}>
        <Text style={styles.stateText}>No bookings for today.</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.list}>
      {bookings.map((booking) => (
        <TodayBookingCard
          key={booking.id}
          booking={booking}
          onAction={onAction}
          formatDate={formatDate}
          formatTime={formatTime}
          getBookingTypeIcon={getBookingTypeIcon}
          getBookingTypeColor={getBookingTypeColor}
          onPress={onBookingPress ? () => onBookingPress(booking) : undefined}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  stateText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 24,
  },
});

export default TodayBookingList;
