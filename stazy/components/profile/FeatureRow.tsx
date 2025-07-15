import React from "react";
import { View, StyleSheet, Text } from "react-native";
import FeatureCard from "./FeatureCard";

const FeatureRow = ({
  onPastTrips,
  onConnections,
}: {
  onPastTrips: () => void;
  onConnections: () => void;
}) => (
  <View style={styles.featureRow}>
    <FeatureCard
      title="Past trips"
      isNew={true}
      icon={
        <View style={styles.suitcaseIcon}>
          <Text style={styles.suitcaseEmoji}>🧳</Text>
        </View>
      }
      onPress={onPastTrips}
    />
    <FeatureCard
      title="Connections"
      isNew={true}
      icon={
        <View style={styles.connectionsIcon}>
          <Text style={styles.connectionsEmoji}>👥</Text>
        </View>
      }
      onPress={onConnections}
    />
  </View>
);

const styles = StyleSheet.create({
  featureRow: {
    flexDirection: "row",
    paddingHorizontal: 24,
    marginBottom: 16,
    gap: 12,
  },
  suitcaseIcon: {
    alignItems: "center",
  },
  suitcaseEmoji: {
    fontSize: 40,
  },
  connectionsIcon: {
    alignItems: "center",
  },
  connectionsEmoji: {
    fontSize: 40,
  },
});

export default FeatureRow;
