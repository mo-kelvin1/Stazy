import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ListingsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { key: "home", label: "Home", emoji: "🏠" },
  { key: "experience", label: "Experience", emoji: "🎈" },
  { key: "service", label: "Service", emoji: "🛎️" },
];

const ListingsTabs = ({ activeTab, onTabChange }: ListingsTabsProps) => (
  <View style={styles.tabContainer}>
    {TABS.map((tab) => (
      <TouchableOpacity
        key={tab.key}
        style={[styles.tab, activeTab === tab.key && styles.activeTab]}
        onPress={() => onTabChange(tab.key)}
      >
        <View style={styles.tabWithBadge}>
          <Text style={styles.emoji}>{tab.emoji}</Text>
        </View>
        <Text
          style={[
            styles.tabText,
            activeTab === tab.key && styles.activeTabText,
          ]}
        >
          {tab.label}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "#f0f0f0",
  },
  tabWithBadge: {
    alignItems: "center",
    marginBottom: 4,
  },
  tabText: {
    fontSize: 12,
    color: "#717171",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#222222",
    fontWeight: "600",
  },
  emoji: {
    fontSize: 24,
    marginBottom: 2,
  },
});

export default ListingsTabs;
