import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import FadeInView from "../../components/cards/FadeInView";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";

export default function Trips() {
  const params = useLocalSearchParams();
  const defaultTab = params.tab === "past" ? "past" : "upcoming";
  const [selectedTab, setSelectedTab] = useState(defaultTab);

  // ❌ No actual trips
  const trips = {
    upcoming: [],
    past: [],
  };

  const currentTrips = selectedTab === "upcoming" ? trips.upcoming : trips.past;

  return (
    <SafeAreaView style={styles.container}>
      <FadeInView style={styles.FadeInView}>
        <View style={styles.header}>
          <Text style={styles.title}>My Trips</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === "upcoming" && styles.activeTab]}
            onPress={() => setSelectedTab("upcoming")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "upcoming" && styles.activeTabText,
              ]}
            >
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === "past" && styles.activeTab]}
            onPress={() => setSelectedTab("past")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "past" && styles.activeTabText,
              ]}
            >
              Past
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.tripsList}>
          {currentTrips.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="airplane-outline" size={64} color="#ccc" />
              <Text style={styles.emptyTitle}>
                {selectedTab === "upcoming"
                  ? "No upcoming trips"
                  : "No past trips"}
              </Text>
              <Text style={styles.emptySubtitle}>
                {selectedTab === "upcoming"
                  ? "Start planning your next adventure!"
                  : "Your travel history will appear here."}
              </Text>
              {selectedTab === "upcoming" && (
                <TouchableOpacity
                  style={styles.planTripButton}
                  onPress={() => router.push("/(tabs)")}
                >
                  <Text style={styles.planTripText}>Plan a Trip</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </ScrollView>
      </FadeInView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
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
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#007AFF",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  tripsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
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
    color: "#444",
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
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
  FadeInView: {
    flex: 1,
  },
});
