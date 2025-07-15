import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CalendarLoading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.loadingText}>Loading calendar...</Text>
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
});

export default CalendarLoading;
