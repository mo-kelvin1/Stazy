import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SwitchToHostingButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity style={styles.hostingButton} onPress={onPress}>
    <Ionicons
      name="repeat-outline"
      size={20}
      color="white"
      style={styles.hostingButtonIcon}
    />
    <Text style={styles.hostingButtonText}>Switch to hosting</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  hostingButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4A90E2",
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginHorizontal: 24,
    marginTop: 16,
    justifyContent: "center",
  },
  hostingButtonIcon: {
    marginRight: 8,
  },
  hostingButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SwitchToHostingButton;
