import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileHeader = ({
  onNotifications,
}: {
  onNotifications: () => void;
}) => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>Profile</Text>
    <TouchableOpacity
      style={styles.notificationButton}
      onPress={onNotifications}
    >
      <Ionicons name="notifications-outline" size={24} color="#484848" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "white",
    marginHorizontal: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "600",
    color: "#222222",
  },
  notificationButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#F7F7F7",
  },
});

export default ProfileHeader;
