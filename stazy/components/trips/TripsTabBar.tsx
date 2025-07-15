import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface TripsTabBarProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
  upcomingCount: number;
  pastCount: number;
}

const TripsTabBar = ({
  selectedTab,
  onTabChange,
  upcomingCount,
  pastCount,
}: TripsTabBarProps) => (
  <View style={styles.tabContainer}>
    <TouchableOpacity
      style={[styles.tab, selectedTab === "upcoming" && styles.activeTab]}
      onPress={() => onTabChange("upcoming")}
    >
      <Text
        style={[
          styles.tabText,
          selectedTab === "upcoming" && styles.activeTabText,
        ]}
      >
        Upcoming ({upcomingCount})
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.tab, selectedTab === "past" && styles.activeTab]}
      onPress={() => onTabChange("past")}
    >
      <Text
        style={[styles.tabText, selectedTab === "past" && styles.activeTabText]}
      >
        Past ({pastCount})
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
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
});

export default TripsTabBar;
