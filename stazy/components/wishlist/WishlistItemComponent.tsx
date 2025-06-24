import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WishlistItem } from "../../types/WishlistTypes";

interface WishlistItemComponentProps {
  item: WishlistItem;
  onRemove: () => void;
  onItemClick: () => void;
}

// Helper function to get item type
const getItemType = (item: WishlistItem): string => {
  if ("image" in item && Array.isArray(item.image)) {
    return "property";
  } else if ("isOriginal" in item || "isPopular" in item) {
    return "experience";
  } else {
    return "service";
  }
};

const WishlistItemComponent: React.FC<WishlistItemComponentProps> = ({
  item,
  onRemove,
  onItemClick,
}) => {
  const itemType = getItemType(item);

  return (
    <TouchableOpacity onPress={onItemClick} style={styles.wishlistItem}>
      <View style={styles.itemImage}>
        {itemType === "property" && (
          <Ionicons name="home" size={32} color="#007AFF" />
        )}
        {itemType === "experience" && (
          <Ionicons name="star" size={32} color="#FFD700" />
        )}
        {itemType === "service" && (
          <Ionicons name="briefcase" size={32} color="#34C759" />
        )}
      </View>

      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemLocation}>{item.location}</Text>
        <View style={styles.itemInfo}>
          <View style={styles.infoItem}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
          <Text style={styles.price}>
            ${item.price}/{itemType === "property" ? "night" : "person"}
          </Text>
        </View>
        {item.notes && (
          <Text style={styles.notes} numberOfLines={2}>
            {item.notes}
          </Text>
        )}
        {item.dateAdded && (
          <Text style={styles.dateAdded}>
            Added {item.dateAdded.toLocaleDateString()}
          </Text>
        )}
      </View>

      <View style={styles.itemActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <Ionicons name="heart" size={30} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wishlistItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 4,
  },
  itemLocation: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  itemInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  rating: {
    fontSize: 14,
    color: "#222",
    marginLeft: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
  },
  notes: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  dateAdded: {
    fontSize: 12,
    color: "#999",
  },
  itemActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
});

export default WishlistItemComponent;
