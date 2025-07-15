import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const HostCard = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity style={styles.hostCard} onPress={onPress}>
    <View style={styles.hostIcon}>
      <Text style={styles.hostEmoji}>🏠</Text>
    </View>
    <View style={styles.hostText}>
      <Text style={styles.hostTitle}>Become a host</Text>
      <Text style={styles.hostSubtitle}>
        It's easy to start hosting and earn extra income.
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  hostCard: {
    backgroundColor: "white",
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  hostIcon: {
    marginRight: 16,
  },
  hostEmoji: {
    fontSize: 32,
  },
  hostText: {
    flex: 1,
  },
  hostTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222222",
    marginBottom: 4,
  },
  hostSubtitle: {
    fontSize: 14,
    color: "#717171",
    lineHeight: 20,
  },
});

export default HostCard;
