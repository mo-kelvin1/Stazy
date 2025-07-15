import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TripsEmptyState = ({ selectedTab }: { selectedTab: string }) => (
  <View style={styles.emptyState}>
    <Ionicons name="airplane-outline" size={64} color="#ccc" />
    <Text style={styles.emptyTitle}>
      {selectedTab === "upcoming" ? "No upcoming trips" : "No past trips"}
    </Text>
    <Text style={styles.emptySubtitle}>
      {selectedTab === "upcoming"
        ? "Start planning your next adventure!"
        : "Your travel history will appear here."}
    </Text>
    {selectedTab === "upcoming" && (
      <TouchableOpacity style={styles.planTripButton}>
        <Text style={styles.planTripText}>Plan a Trip</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  planTripButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  planTripText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default TripsEmptyState;
