import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface TripsModalProps {
  visible: boolean;
  onClose: () => void;
  onCancel: () => void;
  onMessage: () => void;
}

const TripsModal = ({
  visible,
  onClose,
  onCancel,
  onMessage,
}: TripsModalProps) => (
  <Modal
    visible={visible}
    transparent
    animationType="slide"
    onRequestClose={onClose}
  >
    <View style={styles.overlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Booking Options</Text>
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
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    width: "100%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  messageButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  messageButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 16,
  },
  closeButtonText: {
    color: "#007AFF",
  },
});

export default TripsModal;
