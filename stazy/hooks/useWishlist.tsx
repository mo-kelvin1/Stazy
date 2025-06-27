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
} from "../data/wishlistUtils";
import { mockProperties } from "../data/mockProperties";
import { mockExperiences } from "../data/mockExperiences";
import { mockServices } from "../data/mockServices";
import { Property } from "../data/mockProperties";

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [wishlistCount, setWishlistCount] = useState(0);
  const [lastWishlistRefresh, setLastWishlistRefresh] = useState(0);

  // Load wishlist items for display
  const loadWishlistItems = useCallback(() => {
    const items = getWishlistItems();
    setWishlistItems(items);
    console.log("Loaded wishlist items:", items);
  }, []);

  // Refresh global wishlist state
  const refreshWishlistState = useCallback(() => {
    const newWishlistCount = getWishlistCount();
    setWishlistCount(newWishlistCount);

    const updatedLikedItems = new Set<string>();
    [mockProperties, mockExperiences, mockServices].forEach((items) => {
      items.forEach((item) => {
        if (isInWishlist(item.id)) {
          updatedLikedItems.add(item.id);
        }
      });
    });

    setLikedItems(updatedLikedItems);
    console.log("Wishlist state refreshed. New count:", newWishlistCount);
  }, []);

  const initializeWishlistData = useCallback(async () => {
    await initializeWishlist();
    refreshWishlistState();
  }, [refreshWishlistState]);

  // Toggle wishlist item (add/remove)
  const handleHeartPress = useCallback(
    async (itemId: string, properties: Property[]) => {
      console.log("Heart icon clicked for itemId:", itemId);
      const item = properties.find((prop) => prop.id === itemId);
      if (!item) {
        console.error("Item not found for id:", itemId);
        return;
      }

      await onHeartClicked(
        item,
        (isNowInWishlist: boolean) => {
          setLikedItems((prev) => {
            const newSet = new Set(prev);
            isNowInWishlist ? newSet.add(itemId) : newSet.delete(itemId);
            return newSet;
          });

          setWishlistCount(getWishlistCount());
          loadWishlistItems(); // update the visual wishlist
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
    [loadWishlistItems]
  );

  // Remove item directly by ID from visual wishlist
  const removeFromWishlist = async (id: string) => {
    const itemToRemove = wishlistItems.find((item) => item.id === id);
    if (!itemToRemove) {
      console.error("Item not found for removal:", id);
      return;
    }

    await onHeartClicked(
      itemToRemove,
      (isNowInWishlist: boolean) => {
        loadWishlistItems();
        refreshWishlistState();
        (globalThis as any).wishlistRefreshKey = Date.now();
        console.log("Item removed from wishlist:", itemToRemove.title);
      },
      (error: string) => {
        console.error("Error removing from wishlist:", error);
      }
    );
  };

  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  // Load on mount
  useEffect(() => {
    loadWishlistItems();
    refreshWishlistState();
  }, [loadWishlistItems, refreshWishlistState]);

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
    loadWishlistItems,
    refreshWishlistState,
    initializeWishlistData,
    handleHeartPress,
    removeFromWishlist,
    triggerHaptic,
  };
};
