import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import FadeInView from "../../components/cards/FadeInView";
import * as Haptics from "expo-haptics";

// Import your interfaces
import { Property } from "../../data/mockProperties";
import { Experience } from "../../data/mockExperiences";
import { Service } from "../../data/mockServices";

// Import the existing wishlist utilities instead of creating new ones
import {
  getWishlistItems,
  removeFromWishlist as removeFromWishlistUtil,
  onHeartClicked,
  getWishlistCount,
} from "../../data/wishlistUtils";
import { router } from "expo-router";

// Import the renderProperty function - adjust the path as needed
import PropertyCard from "../../components/cards/PropertyCard"; // Update this path to match your actual file structure

// Function to handle explore button press
const exploreButtonPressed = () => {
  router.push("/(tabs)");
  // Navigate to the explore screen or perform any action you want
};

// Union type for wishlist items
export type WishlistItem = (Property | Experience | Service) & {
  dateAdded?: Date;
  notes?: string;
};

const triggerHaptic = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
};

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

// Helper function to get item image
const getItemImage = (item: WishlistItem): string => {
  if ("image" in item) {
    return Array.isArray(item.image) ? item.image[0] : item.image;
  }
  return "";
};

const WishlistItemComponent = ({
  item,
  onRemove,
  onItemClick,
}: {
  item: WishlistItem;
  onRemove: () => void;
  onItemClick: () => void;
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
            e.stopPropagation(); // Prevent triggering the item click
            // Handle share functionality
          }}
        >
          <Ionicons name="share-outline" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={(e) => {
            e.stopPropagation(); // Prevent triggering the item click
            onRemove();
          }}
        >
          <Ionicons name="heart" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default function WishlistScreen() {
  const [searchText, setSearchText] = useState("");
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [refreshKey, setRefreshKey] = useState(0); // Add refresh key for forcing updates

  // Load wishlist items from the existing wishlist utility
  useEffect(() => {
    loadWishlistItems();
  }, []);

  // Add focus listener to reload wishlist when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      loadWishlistItems();
    }, [])
  );

  const loadWishlistItems = () => {
    // Use the existing wishlist utility function
    const items = getWishlistItems();
    console.log("Loaded wishlist items:", items);
    setWishlistItems(items);
  };

  const removeFromWishlist = async (id: string) => {
    console.log("Removing item from wishlist:", id);

    // Find the item to remove
    const itemToRemove = wishlistItems.find((item) => item.id === id);
    if (!itemToRemove) {
      console.error("Item not found for removal:", id);
      return;
    }

    // Use the existing wishlist utility function
    await onHeartClicked(
      itemToRemove,
      (isNowInWishlist: boolean) => {
        console.log("Item removed from wishlist:", !isNowInWishlist);
        // Reload the wishlist items
        loadWishlistItems();

        // Force a refresh to notify other components
        setRefreshKey((prev) => prev + 1);

        // You could also emit a custom event or use a global state manager here
        // For now, we'll store the refresh key in a way that other screens can access
        // global.wishlistRefreshKey = Date.now();
      },
      (error: string) => {
        console.error("Error removing from wishlist:", error);
      }
    );
  };

  // State for PropertyCard modal
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

  // Handle item click to open the PropertyCard modal
  const handleItemClick = (item: WishlistItem) => {
    triggerHaptic();
    // Log the clicked item
    console.log("Item clicked:", item.title);
    // Only open modal for properties
    if (getItemType(item) === "property") {
      setSelectedProperty(item as Property);
      setModalVisible(true);
    }
  };

  // Close PropertyCard modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedProperty(null);
  };

  // Heart press handler for PropertyCard modal
  const handleHeartPress = async (itemId: string) => {
    // Find the item from wishlistItems
    const item = wishlistItems.find((prop) => prop.id === itemId);
    if (!item) return;
    await onHeartClicked(
      item,
      (isNowInWishlist: boolean) => {
        triggerHaptic();
        // Update likedItems state
        setLikedItems((prev) => {
          const newSet = new Set(prev);
          if (isNowInWishlist) {
            newSet.add(itemId);
          } else {
            newSet.delete(itemId);
          }
          return newSet;
        });
        // Reload wishlist
        loadWishlistItems();
        // global.wishlistRefreshKey = Date.now();
      },
      (error: string) => {
        console.error("Error toggling wishlist:", error);
      }
    );
  };

  // Filtered items based on search text
  const filteredItems: WishlistItem[] = wishlistItems.filter((item) =>
    item.title?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <FadeInView style={styles.FadeInView}>
        <View style={styles.header}>
          <Text style={styles.title}>Wishlist</Text>
          <Text style={styles.subtitle}>
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "item" : "items"}
          </Text>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search wishlist..."
              value={searchText}
              onChangeText={setSearchText}
              autoCorrect={false}
              autoCapitalize="none"
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText("")}>
                <Ionicons name="close-circle" size={20} color="#666" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <ScrollView style={styles.wishlistContainer}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item: WishlistItem) => (
              <WishlistItemComponent
                key={item.id}
                item={item}
                onRemove={() => {
                  triggerHaptic();
                  removeFromWishlist(item.id);
                }}
                onItemClick={() => handleItemClick(item)}
              />
            ))
          ) : (
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
                <TouchableOpacity
                  style={styles.exploreButton}
                  onPress={() => exploreButtonPressed()}
                >
                  <Text style={styles.exploreButtonText}>Start Exploring</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </ScrollView>
        {/* PropertyCard Modal for property items */}
        <PropertyCard
          property={selectedProperty}
          isVisible={modalVisible}
          onClose={closeModal}
          likedItems={likedItems}
          onHeartPress={handleHeartPress}
        />
        <View style={styles.bottomActions}>
          <TouchableOpacity style={styles.shareAllButton}>
            <Ionicons name="share-outline" size={20} color="#007AFF" />
            <Text style={styles.shareAllText}>Share Wishlist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.planTripButton}>
            <Ionicons name="calendar-outline" size={20} color="#fff" />
            <Text style={styles.planTripText}>Plan Trip</Text>
          </TouchableOpacity>
        </View>
      </FadeInView>
    </SafeAreaView>
  );
}
// This is a React Native component for a Wishlist screen in an app.

// Add placeholder styles - you should replace these with your actual styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  FadeInView: {
    flex: 1,
  },
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
  searchContainer: {
    padding: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  wishlistContainer: {
    flex: 1,
    padding: 20,
  },
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
