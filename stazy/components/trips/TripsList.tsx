import React from "react";
import { ScrollView, StyleSheet, RefreshControl } from "react-native";
import TripCard from "./TripCard";
import { Booking } from "../../context/actions/refreshBookings";

const TripsList = ({
  bookings,
  onOptions,
  refreshing,
  onRefresh,
}: {
  bookings: Booking[];
  onOptions: (booking: Booking) => void;
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
        onOptions={() => onOptions(booking)}
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
