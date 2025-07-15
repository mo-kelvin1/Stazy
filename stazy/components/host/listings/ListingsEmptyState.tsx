import React from "react";
import { Text, StyleSheet } from "react-native";

const ListingsEmptyState = ({ message }: { message: string }) => (
  <Text style={styles.empty}>{message}</Text>
);

const styles = StyleSheet.create({
  empty: {
    color: "#888",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
});

export default ListingsEmptyState;
