import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Booking } from "../../context/actions/refreshBookings";

interface TripsModalProps {
  visible: boolean;
  onClose: () => void;
  onCancel: () => void;
  onMessage: () => void;
  booking: Booking | null;
}

const TripsModal = ({
  visible,
  onClose,
  onCancel,
  onMessage,
  booking,
}: TripsModalProps) => (
  <Modal
    visible={visible}
    transparent
    animationType="slide"
    onRequestClose={onClose}
    presentationStyle={
      Platform.OS === "android" ? "overFullScreen" : "pageSheet"
    }
  >
    <View style={styles.overlay} pointerEvents="box-none">
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Booking Options</Text>
        {booking && (
          <View style={styles.bookingDetails}>
            <Text style={styles.bookingTitle}>
              {booking.entityTitle || "Booking"}
            </Text>
            <Text style={styles.bookingDates}>
              {booking.startDate
                ? new Date(booking.startDate).toLocaleDateString()
                : "N/A"}{" "}
              -{" "}
              {booking.endDate
                ? new Date(booking.endDate).toLocaleDateString()
                : "N/A"}
            </Text>
            <Text style={styles.bookingStatus}>
              Status: {booking.status || "N/A"}
            </Text>
          </View>
        )}
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancel Booking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.messageButton} onPress={onMessage}>
          <Text style={styles.messageButtonText}>Message Host</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    ...Platform.select({
      android: {
        marginTop: 80,
        width: 360,
        maxWidth: 400,
        justifyContent: "center",
        alignItems: "center",
      },
      ios: {
        width: "85%",
        maxWidth: 340,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
      },
      default: {
        width: 320,
        maxWidth: 340,
        justifyContent: "center",
        alignItems: "center",
      },
    }),
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    ...Platform.select({
      android: {
        padding: 18,
        height: 60,
      },
      default: {
        padding: 12,
      },
    }),
    borderRadius: 8,
    marginBottom: 12,
    width: "100%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 8,
    ...Platform.select({
      android: {
        fontSize: 18,
        height: 30,
        paddingBottom: 10,
      },
      default: {
        fontSize: 16,
      },
    }),
  },
  messageButton: {
    backgroundColor: "#007AFF",
    ...Platform.select({
      android: {
        padding: 18,
        height: 60,
      },
      default: {
        padding: 12,
      },
    }),
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  messageButtonText: {
    color: "#fff",
    fontWeight: "bold",
    ...Platform.select({
      android: {
        fontSize: 18,
      },
      default: {
        fontSize: 16,
      },
    }),
  },
  closeButton: {
    marginTop: 16,
  },
  closeButtonText: {
    color: "#007AFF",
  },
  bookingDetails: {
    marginBottom: 16,
    alignItems: "center",
  },
  bookingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 4,
  },
  bookingDates: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  bookingStatus: {
    fontSize: 14,
    color: "#007AFF",
    marginBottom: 2,
  },
});

export default TripsModal;
