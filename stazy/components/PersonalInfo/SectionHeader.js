import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SectionHeader = ({ title }) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#F7F7F7",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#484848",
  },
});

export default SectionHeader;