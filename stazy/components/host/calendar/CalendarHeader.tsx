import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CalendarHeader = () => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>Calendar</Text>
    <Text style={styles.headerSubtitle}>Your booking schedule</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
});

export default CalendarHeader;
