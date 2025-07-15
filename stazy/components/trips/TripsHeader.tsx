import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TripsHeader = ({ onAdd }: { onAdd: () => void }) => (
  <View style={styles.header}>
    <Text style={styles.title}>My Trips</Text>
    <TouchableOpacity style={styles.addButton} onPress={onAdd}>
      <Ionicons name="add" size={24} color="#007AFF" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  addButton: {
    padding: 8,
  },
});

export default TripsHeader;
