import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import FadeInView from "../../components/cards/FadeInView";
import PropertyCard from "../../components/cards/PropertyCard";

// Import broken down components
import WishlistHeader from "../../components/wishlist/WishlistHeader";
import WishlistSearchBar from "../../components/wishlist/WishlistSearchBar";
import WishlistItemComponent from "../../components/wishlist/WishlistItemComponent";
import WishlistEmptyState from "../../components/wishlist/WishlistEmptyState";
import WishlistBottomActions from "../../components/wishlist/WishlistBottomActions";

// Import types and hooks
import { WishlistItem } from "../../types/WishlistTypes";
import { useWishlist } from "../../hooks/UseWishlist";
import { Property } from "../../data/mockProperties";
import { onHeartClicked } from "../../data/wishlistUtils";

// Extend the global object to include wishlistRefreshKey
declare global {
  // eslint-disable-next-line no-var
  var wishlistRefreshKey: number | undefined;
}

// Function to handle explore button press
const exploreButtonPressed = () => {
  router.push("/(tabs)");
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

export default function WishlistScreen() {
  const [searchText, setSearchText] = useState("");
  const {
    wishlistItems,
    removeFromWishlist,
    triggerHaptic,
    loadWishlistItems,
  } = useWishlist();

  // State for PropertyCard modal
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

  // Handle item click to open the PropertyCard modal
  const handleItemClick = (item: WishlistItem) => {
    triggerHaptic();
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
        global.wishlistRefreshKey = Date.now();
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

  // Handler functions for bottom actions
  const handleSharePress = () => {
    // Implement share functionality
    console.log("Share wishlist pressed");
  };

  const handlePlanTripPress = () => {
    // Implement plan trip functionality
    console.log("Plan trip pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <FadeInView style={styles.FadeInView}>
        <WishlistHeader itemCount={wishlistItems.length} />

        <WishlistSearchBar
          searchText={searchText}
          onSearchTextChange={setSearchText}
        />

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
            <WishlistEmptyState
              searchText={searchText}
              onExplorePress={exploreButtonPressed}
            />
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

        <WishlistBottomActions
          onSharePress={handleSharePress}
          onPlanTripPress={handlePlanTripPress}
        />
      </FadeInView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  FadeInView: {
    flex: 1,
  },
  wishlistContainer: {
    flex: 1,
    padding: 20,
  },
});
