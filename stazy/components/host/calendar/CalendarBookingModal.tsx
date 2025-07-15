import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CalendarBookingCard from "./CalendarBookingCard";

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

interface CalendarBookingModalProps {
  visible: boolean;
  onClose: () => void;
  selectedDate: string;
  bookings: Booking[];
}

const CalendarBookingModal = ({
  visible,
  onClose,
  selectedDate,
  bookings,
}: CalendarBookingModalProps) => (
  <Modal
    visible={visible}
    animationType="slide"
    transparent={true}
    onRequestClose={onClose}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Bookings for {selectedDate}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.bookingsList}>
          {bookings.length === 0 ? (
            <View style={styles.noBookings}>
              <Ionicons name="calendar-outline" size={48} color="#ccc" />
              <Text style={styles.noBookingsText}>
                No bookings on this date
              </Text>
            </View>
          ) : (
            bookings.map((booking) => (
              <CalendarBookingCard key={booking.id} booking={booking} />
            ))
          )}
        </ScrollView>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  closeButton: {
    padding: 5,
  },
  bookingsList: {
    padding: 20,
  },
  noBookings: {
    alignItems: "center",
    paddingVertical: 40,
  },
  noBookingsText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
});

export default CalendarBookingModal;
