import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useAuth } from "../../hooks/useAuth";
import moment from "moment";
import { router } from "expo-router";
import { Booking } from "../../components/AuthProvider"; // Full interface

export default function TodayScreen() {
  const { getBookings } = useAuth();
  const [selectedTab, setSelectedTab] = useState<"today" | "upcoming">("today");

  const [bookingsToday, setBookingsToday] = useState<Booking[]>([]);
  const [bookingsUpcoming, setBookingsUpcoming] = useState<Booking[]>([]);

  useEffect(() => {
    const allBookings = getBookings();
    const today = moment().format("YYYY-MM-DD");

    setBookingsToday(allBookings.filter((b) => b.date === today));
    setBookingsUpcoming(allBookings.filter((b) => b.date > today));
  }, []);

  const renderBooking = ({ item }: { item: Booking }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "../screens/BookingDetails",
          params: { booking: JSON.stringify(item) },
        })
      }
    >
      <View style={styles.bookingCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.bookingTitle}>{item.service}</Text>
          <Text style={styles.dateText}>
            {moment(item.date).format("MMM D, YYYY")}
          </Text>
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.guestName}>👤 {item.guestName}</Text>
          {item.location && (
            <Text style={styles.detail}>📍 {item.location}</Text>
          )}
          {item.time && <Text style={styles.detail}>⏰ {item.time}</Text>}
          {item.status && (
            <Text
              style={[
                styles.status,
                item.status === "confirmed"
                  ? styles.statusConfirmed
                  : styles.statusPending,
              ]}
            >
              {item.status.toUpperCase()}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const activeBookings =
    selectedTab === "today" ? bookingsToday : bookingsUpcoming;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Bookings</Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "today" && styles.activeTab]}
          onPress={() => setSelectedTab("today")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "today" && styles.activeTabText,
            ]}
          >
            Today
          </Text>
        </TouchableOpacity>
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
      </View>

      {activeBookings.length > 0 ? (
        <FlatList
          data={activeBookings}
          keyExtractor={(item) => item.id}
          renderItem={renderBooking}
          contentContainerStyle={styles.bookingList}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>
            {selectedTab === "today"
              ? "No bookings today"
              : "No upcoming bookings"}
          </Text>
          <Text style={styles.emptySubtitle}>
            Check back later for updates.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    paddingHorizontal: 20,
    paddingVertical: 16,
    color: "#111",
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#007AFF",
  },
  tabText: {
    fontSize: 16,
    color: "#888",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#007AFF",
    fontWeight: "700",
  },
  bookingList: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  bookingCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  bookingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    flexShrink: 1,
  },
  dateText: {
    fontSize: 14,
    color: "#666",
  },
  cardContent: {
    marginTop: 4,
  },
  guestName: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
  },
  detail: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
  },
  status: {
    fontSize: 12,
    marginTop: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  statusConfirmed: {
    backgroundColor: "#D4EDDA",
    color: "#155724",
  },
  statusPending: {
    backgroundColor: "#FFF3CD",
    color: "#856404",
  },
  emptyState: {
    paddingHorizontal: 40,
    paddingTop: 60,
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#555",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
});
