import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const BlankMessages = () => (
  <View style={styles.container}>
    {/* Top bar with 'Messages' title at the top right */}
    <View style={styles.headerRow}>
      <View style={{ flex: 1 }} />
      <Text style={styles.headerTitle}>Messages</Text>
    </View>
    <View style={styles.content}>
      <Ionicons
        name="chatbubble-ellipses-outline"
        size={80}
        color="#B0B8C1"
        style={{ marginBottom: 24 }}
      />
      <Text style={styles.emptyTitle}>No messages yet</Text>
      <Text style={styles.emptySubtitle}>
        When you contact a host or guest, your conversations will show up here.
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: 48,
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    minHeight: 80,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#222",
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#444",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
});

export default BlankMessages;
