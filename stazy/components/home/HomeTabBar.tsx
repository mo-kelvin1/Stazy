import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HomeTabBarProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const TABS = [
  { key: "Homes", title: "Homes", icon: "home" },
  { key: "Experiences", title: "Experiences", icon: "balloon" },
  { key: "Services", title: "Services", icon: "restaurant" },
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
          <Ionicons
            name={tab.icon as any}
            size={20}
            color={activeTab === tab.key ? "#222222" : "#717171"}
          />
        </View>
        <Text
          style={[
            styles.tabText,
            activeTab === tab.key && styles.activeTabText,
          ]}
        >
          {tab.title}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 0,
    marginBottom: 0,
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

export default HomeTabBar;
