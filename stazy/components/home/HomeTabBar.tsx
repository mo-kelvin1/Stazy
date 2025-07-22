import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HomeTabBarProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const TABS = [
  { key: "home", label: "Home", emoji: "🏠" },
  { key: "experience", label: "Experience", emoji: "🎈" },
  { key: "service", label: "Service", emoji: "🛎️" },
];

const HomeTabBar = ({ activeTab, onTabPress }: HomeTabBarProps) => (
  <View style={styles.tabContainer}>
    {TABS.map((tab) => (
      <TouchableOpacity
        key={tab.key}
        style={[styles.tab, activeTab === tab.key && styles.activeTab]}
        onPress={() => onTabPress(tab.key)}
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
    marginTop: -15,
    paddingHorizontal: 0,
    marginBottom: 0,
  },
  tab: {
    flex: 1,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 36,
    marginLeft: 12,
  },
});

export default HomeTabBar;
