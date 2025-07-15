import React from "react";
import { Text, StyleSheet } from "react-native";

const ListingsError = ({ message }: { message: string }) => (
  <Text style={styles.error}>{message}</Text>
);

const styles = StyleSheet.create({
  error: {
    color: "#FF385C",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
});

export default ListingsError;
