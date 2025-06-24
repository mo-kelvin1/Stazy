import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const tabs = ["Offers & Updates", "Account"];

const NotificationScreen = () => {
  const [activeTab, setActiveTab] = useState("Offers & Updates");

  const renderEmptyState = () => {
    switch (activeTab) {
      case "Offers & Updates":
        return "You're all caught up on offers and updates.";
      case "Account":
        return "No account notifications yet.";
      default:
        return "No notifications.";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.emptyText}>{renderEmptyState()}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingTop: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 6,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
  },
  activeTabButton: {
    backgroundColor: "#007AFF",
  },
  tabText: {
    fontSize: 14,
    color: "#555",
  },
  activeTabText: {
    color: "#FFF",
    fontWeight: "600",
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

export default NotificationScreen;
