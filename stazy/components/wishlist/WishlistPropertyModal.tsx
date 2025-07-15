import React from "react";
import { Modal, View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { renderPropertyContent } from "../render/renderPropertyContent";

interface WishlistPropertyModalProps {
  visible: boolean;
  onClose: () => void;
  propertyId: string;
}

const WishlistPropertyModal: React.FC<WishlistPropertyModalProps> = ({
  visible,
  onClose,
  propertyId,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
        {renderPropertyContent({ itemId: propertyId })}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: -100,
    marginBottom: -100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 1,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  closeButton: {
    padding: 8,
  },
});

export default WishlistPropertyModal;
