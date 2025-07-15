import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HomeError = ({ message }: { message: string }) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  errorText: {
    color: "#FF385C",
    fontSize: 16,
    textAlign: "center",
  },
});

export default HomeError;
