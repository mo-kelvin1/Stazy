import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { WishlistItem } from "../types/WishlistTypes";
import {
  getWishlistItems,
  onHeartClicked,
  isInWishlist,
  initializeWishlist,
  getWishlistCount,
  getItemType,
} from "../data/wishlistUtils";
import { Property } from "../types/Property";
import { Experience } from "../types/Experience";
import { Service } from "../types/Service";

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [wishlistCount, setWishlistCount] = useState(0);
  const [lastWishlistRefresh, setLastWishlistRefresh] = useState(0);
  const [loading, setLoading] = useState(false);

  // Load wishlist items for display
  const loadWishlistItems = useCallback(async () => {
    try {
      setLoading(true);
      const items = await getWishlistItems();
      setWishlistItems(items as WishlistItem[]);

      // Update likedItems based on the loaded wishlist items
      // Use entityId (the actual property/service/experience ID) for likedItems
      const newLikedItems = new Set<string>();
      items.forEach((item) => {
        const entityId = (item as any).entityId;
        if (entityId) {
          newLikedItems.add(entityId.toString());
        }
      });
      setLikedItems(newLikedItems);
    } catch (error) {
      console.error("Error loading wishlist items:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Refresh global wishlist state
  const refreshWishlistState = useCallback(async () => {
    try {
      const newWishlistCount = await getWishlistCount();
      setWishlistCount(newWishlistCount);
    } catch (error) {
      console.error("Error refreshing wishlist state:", error);
    }
  }, []);

  const initializeWishlistData = useCallback(async () => {
    await initializeWishlist();
    await refreshWishlistState();
    await loadWishlistItems();
  }, [refreshWishlistState, loadWishlistItems]);

  // Toggle wishlist item (add/remove)
  const handleHeartPress = useCallback(
    async (item: Property | Experience | Service) => {
      console.log("Heart icon clicked for item:", item);
      await onHeartClicked(
        item,
        async (isNowInWishlist: boolean) => {
          setLikedItems((prev) => {
            const newSet = new Set(prev);
            // Use the entity ID (item.id) for likedItems
            if (isNowInWishlist) {
              newSet.add(item.id.toString());
            } else {
              newSet.delete(item.id.toString());
            }
            return newSet;
          });

          await refreshWishlistState();
          await loadWishlistItems(); // update the visual wishlist
          (globalThis as any).wishlistRefreshKey = Date.now();

          console.log(
            isNowInWishlist
              ? `${item.title} added to wishlist!`
              : `${item.title} removed from wishlist!`
          );
        },
        (error: string) => {
          console.error("Wishlist error:", error);
        }
      );
    },
    [loadWishlistItems, refreshWishlistState]
  );

  // Remove item directly by ID from visual wishlist
  const removeFromWishlist = async (id: string) => {
    const itemToRemove = wishlistItems.find((item) => item.id === id);
    if (!itemToRemove) {
      console.error("Item not found for removal:", id);
      return;
    }

    try {
      // Import the removeFromWishlist function directly
      const { removeFromWishlist: removeFromWishlistUtil } = await import(
        "../data/wishlistUtils"
      );
      const success = await removeFromWishlistUtil(id);

      if (success) {
        // Update likedItems state to remove the entity ID
        const entityId = (itemToRemove as any).entityId;
        if (entityId) {
          setLikedItems((prev) => {
            const newSet = new Set(prev);
            newSet.delete(entityId.toString());
            return newSet;
          });
        }

        await loadWishlistItems();
        await refreshWishlistState();
        (globalThis as any).wishlistRefreshKey = Date.now();
        console.log("Item removed from wishlist:", itemToRemove.title);
      } else {
        console.error("Failed to remove item from wishlist");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  // Check if an item is in wishlist
  const checkWishlistStatus = useCallback(
    async (itemId: string, itemType: string) => {
      try {
        const isInWishlistStatus = await isInWishlist(itemId, itemType);
        setLikedItems((prev) => {
          const newSet = new Set(prev);
          if (isInWishlistStatus) {
            newSet.add(itemId);
          } else {
            newSet.delete(itemId);
          }
          return newSet;
        });
        return isInWishlistStatus;
      } catch (error) {
        console.error("Error checking wishlist status:", error);
        return false;
      }
    },
    []
  );

  // Check wishlist status for multiple items
  const checkWishlistStatusForItems = useCallback(
    async (items: (Property | Experience | Service)[]) => {
      try {
        const promises = items.map(async (item) => {
          const itemType = getItemType(item);
          const isInWishlistStatus = await isInWishlist(item.id, itemType);
          return { itemId: item.id, isInWishlist: isInWishlistStatus };
        });

        const results = await Promise.all(promises);

        setLikedItems((prev) => {
          const newSet = new Set(prev);
          results.forEach(({ itemId, isInWishlist }) => {
            if (isInWishlist) {
              newSet.add(itemId);
            } else {
              newSet.delete(itemId);
            }
          });
          return newSet;
        });
      } catch (error) {
        console.error("Error checking wishlist status for items:", error);
      }
    },
    []
  );

  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  // Load on mount
  useEffect(() => {
    initializeWishlistData();
  }, [initializeWishlistData]);

  // Listen to screen focus for refresh
  useFocusEffect(
    useCallback(() => {
      const currentRefreshKey = (globalThis as any).wishlistRefreshKey || 0;
      if (currentRefreshKey > lastWishlistRefresh) {
        refreshWishlistState();
        loadWishlistItems();
        setLastWishlistRefresh(currentRefreshKey);
      }
    }, [lastWishlistRefresh, refreshWishlistState, loadWishlistItems])
  );

  return {
    wishlistItems,
    likedItems,
    wishlistCount,
    loading,
    loadWishlistItems,
    refreshWishlistState,
    initializeWishlistData,
    handleHeartPress,
    removeFromWishlist,
    checkWishlistStatus,
    checkWishlistStatusForItems,
    triggerHaptic,
  };
};
