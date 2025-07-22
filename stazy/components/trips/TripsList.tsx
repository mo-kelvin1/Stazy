import React from "react";
import { ScrollView, StyleSheet, RefreshControl, Alert } from "react-native";
import TripCard from "./TripCard";
import { Booking } from "../../context/actions/refreshBookings";

const TripsList = ({
  bookings,
  onCancelBooking,
  onMessageHost,
  refreshing,
  onRefresh,
}: {
  bookings: Booking[];
  onCancelBooking: (booking: Booking) => void;
  onMessageHost: (booking: Booking) => void;
  refreshing: boolean;
  onRefresh: () => void;
}) => (
  <ScrollView
    style={styles.tripsList}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
  >
    {bookings.map((booking) => (
      <TripCard
        key={booking.id}
        booking={booking}
        onCancelBooking={() => {
          Alert.alert(
            "Cancel Booking",
            "Are you sure you want to cancel this booking?",
            [
              { text: "No", style: "cancel" },
              {
                text: "Yes",
                style: "destructive",
                onPress: () => onCancelBooking(booking),
              },
            ]
          );
        }}
        onMessageHost={() => onMessageHost(booking)}
      />
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  tripsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default TripsList;
