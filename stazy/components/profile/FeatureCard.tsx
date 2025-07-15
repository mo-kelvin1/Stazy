import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type FeatureCardProps = {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  isNew?: boolean;
  onPress: () => void;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  subtitle,
  icon,
  isNew = false,
  onPress,
}) => (
  <TouchableOpacity style={styles.featureCard} onPress={onPress}>
    {isNew && (
      <View style={styles.newBadge}>
        <Text style={styles.newBadgeText}>NEW</Text>
      </View>
    )}
    <View style={styles.featureIcon}>{icon}</View>
    <Text style={styles.featureTitle}>{title}</Text>
    {subtitle && <Text style={styles.featureSubtitle}>{subtitle}</Text>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  featureCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    position: "relative",
  },
  newBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#4A90E2",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  newBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  featureIcon: {
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222222",
    textAlign: "center",
  },
  featureSubtitle: {
    fontSize: 14,
    color: "#717171",
    textAlign: "center",
    marginTop: 4,
  },
});

export default FeatureCard;
