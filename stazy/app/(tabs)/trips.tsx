import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import FadeInView from "../../components/cards/FadeInView";

const TripCard = ({ trip }: { trip: any }) => (
  <TouchableOpacity style={styles.tripCard}>
    <View style={styles.tripImageContainer}>
      <View style={styles.tripImage}>
        <Ionicons name="airplane" size={40} color="#007AFF" />
      </View>
      <View style={styles.tripStatus}>
        <Text
          style={[
            styles.statusText,
            { color: trip.status === "upcoming" ? "#007AFF" : "#666" },
          ]}
        >
          {trip.status === "upcoming" ? "Upcoming" : "Completed"}
        </Text>
      </View>
    </View>

    <View style={styles.tripDetails}>
      <Text style={styles.tripDestination}>{trip.destination}</Text>
      <Text style={styles.tripDates}>{trip.dates}</Text>
      <View style={styles.tripInfo}>
        <View style={styles.infoItem}>
          <Ionicons name="calendar-outline" size={16} color="#666" />
          <Text style={styles.infoText}>{trip.duration}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="people-outline" size={16} color="#666" />
          <Text style={styles.infoText}>{trip.travelers} travelers</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export default function trips() {
  const [selectedTab, setSelectedTab] = useState("upcoming");

  const trips = {
    upcoming: [
      {
        id: 1,
        destination: "Tokyo, Japan",
        dates: "Dec 15 - Dec 25, 2024",
        duration: "10 days",
        travelers: 2,
        status: "upcoming",
      },
      {
        id: 2,
        destination: "Barcelona, Spain",
        dates: "Jan 20 - Jan 27, 2025",
        duration: "7 days",
        travelers: 1,
        status: "upcoming",
      },
    ],
    past: [
      {
        id: 3,
        destination: "Paris, France",
        dates: "Oct 5 - Oct 12, 2024",
        duration: "7 days",
        travelers: 2,
        status: "completed",
      },
      {
        id: 4,
        destination: "Bali, Indonesia",
        dates: "Aug 15 - Aug 25, 2024",
        duration: "10 days",
        travelers: 3,
        status: "completed",
      },
    ],
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
              Upcoming ({trips.upcoming.length})
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
              Past ({trips.past.length})
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.tripsList}>
          {currentTrips.length > 0 ? (
            currentTrips.map((trip) => <TripCard key={trip.id} trip={trip} />)
          ) : (
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
                <TouchableOpacity style={styles.planTripButton}>
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
  tripCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tripImageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  tripImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#f0f8ff",
    justifyContent: "center",
    alignItems: "center",
  },
  tripStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#f0f8ff",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  tripDetails: {
    flex: 1,
  },
  tripDestination: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  tripDates: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  tripInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
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
  FadeInView: {
    flex: 1,
  },
});
