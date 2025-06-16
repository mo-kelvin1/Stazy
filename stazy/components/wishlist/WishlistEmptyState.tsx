import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface WishlistEmptyStateProps {
  searchText: string;
  onExplorePress: () => void;
}

const WishlistEmptyState: React.FC<WishlistEmptyStateProps> = ({
  searchText,
  onExplorePress,
}) => {
  return (
    <View style={styles.emptyState}>
      <Ionicons name="heart-outline" size={64} color="#ccc" />
      <Text style={styles.emptyTitle}>
        {searchText ? "No results found" : "Your wishlist is empty"}
      </Text>
      <Text style={styles.emptySubtitle}>
        {searchText
          ? "Try searching for something else"
          : "Start exploring and save places you love!"}
      </Text>
      {!searchText && (
        <TouchableOpacity style={styles.exploreButton} onPress={onExplorePress}>
          <Text style={styles.exploreButtonText}>Start Exploring</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#222",
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  exploreButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  exploreButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default WishlistEmptyState;
