import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ListingsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { label: "Homes", icon: "home" },
  { label: "Experiences", icon: "balloon" },
  { label: "Services", icon: "restaurant" },
];

const ListingsTabs = ({ activeTab, onTabChange }: ListingsTabsProps) => (
  <View style={styles.tabContainer}>
    {TABS.map((tab) => (
      <TouchableOpacity
        key={tab.label}
        style={[styles.tab, activeTab === tab.label && styles.activeTab]}
        onPress={() => onTabChange(tab.label)}
      >
        <View style={styles.tabWithBadge}>
          <Ionicons
            name={tab.icon as any}
            size={20}
            color={activeTab === tab.label ? "#222222" : "#717171"}
          />
        </View>
        <Text
          style={[
            styles.tabText,
            activeTab === tab.label && styles.activeTabText,
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
});

export default ListingsTabs;
