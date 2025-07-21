import { useState, useEffect, useCallback } from "react";
import { router } from "expo-router";
import { WishlistItem } from "../types/WishlistTypes";
import { useWishlist } from "../hooks/useWishlist";
import { Property } from "../types/Property";
import { onHeartClicked, removeFromWishlistByEntityId } from "../data/wishlistUtils";

const getItemType = (item: WishlistItem): string => {
  if ("propertyType" in item) {
    return "property";
  } else if ("serviceType" in item) {
    return "service";
  } else if ("experienceType" in item) {
    return "experience";
  }
  return "property";
};

export function useWishlistScreenData() {
  const [searchText, setSearchText] = useState("");
  const {
    wishlistItems,
    removeFromWishlist,
    triggerHaptic,
    loadWishlistItems,
    loading,
  } = useWishlist();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadWishlistItems();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadWishlistItems();
    setRefreshing(false);
  }, [loadWishlistItems]);

  const handleItemClick = (item: WishlistItem) => {
    triggerHaptic();
    if (getItemType(item) === "property" && item.entityId) {
      setSelectedProperty({ ...item, id: item.entityId } as unknown as Property);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProperty(null);
  };

  const handleHeartPress = async (itemId: string) => {
    const item = wishlistItems.find((prop) => {
      let entityIdStr: string | undefined = undefined;
      if (typeof prop.entityId === 'number' || typeof prop.entityId === 'string') {
        entityIdStr = String(prop.entityId);
      }
      let idStr: string | undefined = undefined;
      if (typeof prop.id === 'number' || typeof prop.id === 'string') {
        idStr = String(prop.id);
      }
      return entityIdStr === itemId || idStr === itemId;
    });
    if (!item) return;
    await onHeartClicked(
      item,
      async (isNowInWishlist: boolean) => {
        triggerHaptic();
        setLikedItems((prev) => {
          const newSet = new Set(prev);
          if (isNowInWishlist) {
            newSet.add(itemId);
          } else {
            newSet.delete(itemId);
          }
          return newSet;
        });
        await loadWishlistItems();
        (globalThis as any).wishlistRefreshKey = Date.now();
      },
      (error: string) => {
        console.error("Error toggling wishlist:", error);
      }
    );
  };

  const handleRemove = async (entityId: number, itemType: string) => {
    triggerHaptic();
    await removeFromWishlistByEntityId(entityId.toString(), itemType);
    await loadWishlistItems();
    (globalThis as any).wishlistRefreshKey = Date.now();
  };

  const filteredItems: WishlistItem[] = wishlistItems.filter((item) =>
    item.title?.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSharePress = () => {
    // Implement share functionality
    console.log("Share wishlist pressed");
  };

  const handlePlanTripPress = () => {
    // Implement plan trip functionality
    console.log("Plan trip pressed");
  };

  const handleExplorePress = () => {
    router.push("/(tabs)");
  };

  return {
    searchText,
    setSearchText,
    wishlistItems,
    removeFromWishlist,
    triggerHaptic,
    loadWishlistItems,
    loading,
    selectedProperty,
    setSelectedProperty,
    modalVisible,
    setModalVisible,
    likedItems,
    setLikedItems,
    filteredItems,
    handleItemClick,
    closeModal,
    handleHeartPress,
    handleRemove,
    handleSharePress,
    handlePlanTripPress,
    handleExplorePress,
    refreshing,
    onRefresh,
  };
} 