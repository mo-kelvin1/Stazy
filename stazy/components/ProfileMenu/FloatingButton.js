import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FloatingButton = ({ onPress, text, icon = "swap-horizontal" }) => {
  return (
    <View style={styles.floatingButtonContainer}>
      <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
        <Ionicons name={icon} size={20} color="#007AFF" />
        <Text style={styles.floatingButtonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingButtonContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  floatingButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  floatingButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
});

export default FloatingButton;
