import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface TodayHeaderProps {
  title: string;
  subtitle: string;
}

const TodayHeader: React.FC<TodayHeaderProps> = ({ title, subtitle }) => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>{title}</Text>
    <Text style={styles.headerSubtitle}>{subtitle}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    paddingTop: 32,
    marginTop: -32,
    paddingHorizontal: 24,
    paddingBottom: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#888",
    fontWeight: "500",
  },
});

export default TodayHeader;
