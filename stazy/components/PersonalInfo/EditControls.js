import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const EditControls = ({ isEditing, onSave, onCancel, onEdit }) => {
  if (!isEditing) return null;

  return (
    <View style={styles.cancelButtonContainer}>
      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cancelButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  cancelButton: {
    backgroundColor: "#F0F0F0",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#007AFF",
  },
});

export default EditControls;