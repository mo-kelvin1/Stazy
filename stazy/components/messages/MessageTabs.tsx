import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface MessageTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { key: "hosts", label: "Hosts" },
  { key: "guests", label: "Guests" },
  { key: "help", label: "Help" },
];

const MessageTabs: React.FC<MessageTabsProps> = ({
  activeTab,
  onTabChange,
}) => (
  <View style={styles.tabsContainer}>
    {tabs.map((tab) => (
      <TouchableOpacity
        key={tab.key}
        style={[styles.tab, activeTab === tab.key && styles.activeTab]}
        onPress={() => onTabChange(tab.key)}
      >
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
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f7f7f7",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#222",
  },
  tabText: {
    fontSize: 16,
    color: "#888",
    fontWeight: "600",
  },
  activeTabText: {
    color: "#fff",
  },
});

export default MessageTabs;
