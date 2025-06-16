import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface WishlistHeaderProps {
  itemCount: number;
}

const WishlistHeader: React.FC<WishlistHeaderProps> = ({ itemCount }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Wishlist</Text>
      <Text style={styles.subtitle}>
        {itemCount} {itemCount === 1 ? "item" : "items"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
});

export default WishlistHeader;
