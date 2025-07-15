import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const ListingsLoading = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#007AFF" />
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});

export default ListingsLoading;
