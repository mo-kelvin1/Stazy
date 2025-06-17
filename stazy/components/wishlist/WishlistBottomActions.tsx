import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface WishlistBottomActionsProps {
  onSharePress?: () => void;
  onPlanTripPress?: () => void;
}

const WishlistBottomActions: React.FC<WishlistBottomActionsProps> = ({
  onSharePress,
  onPlanTripPress,
}) => {
  return (
    <View style={styles.bottomActions}>
      <TouchableOpacity style={styles.shareAllButton} onPress={onSharePress}>
        <Ionicons name="share-outline" size={20} color="#007AFF" />
        <Text style={styles.shareAllText}>Share Wishlist</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.planTripButton} onPress={onPlanTripPress}>
        <Ionicons name="calendar-outline" size={20} color="#fff" />
        <Text style={styles.planTripText}>Plan Trip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomActions: {
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  shareAllButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 10,
  },
  shareAllText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  planTripButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  planTripText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default WishlistBottomActions;
