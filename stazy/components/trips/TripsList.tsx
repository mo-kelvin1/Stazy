import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import TripCard from "./TripCard";
import { Booking } from "../../context/actions/refreshBookings";

const TripsList = ({
  bookings,
  onOptions,
}: {
  bookings: Booking[];
  onOptions: (booking: Booking) => void;
}) => (
  <ScrollView style={styles.tripsList}>
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
