import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { WishlistItem } from "../types/WishlistTypes";
import {
  onHeartClicked,
  isInWishlist,
  initializeWishlist,
  getWishlistItems,
  getWishlistCount,
} from "../data/wishlistUtils";
import { mockProperties } from "../data/mockProperties";
import { mockExperiences } from "../data/mockExperiences";
import { mockServices } from "../data/mockServices";
import { Property } from "../data/mockProperties";

export const useWishlist = () => {
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [lastWishlistRefresh, setLastWishlistRefresh] = useState(0);

  const loadWishlistItems = useCallback(() => {
    const items = getWishlistItems();
    setWishlistItems(items);
  }, []);

  const refreshWishlistState = useCallback(() => {
    const count = getWishlistCount();
    setWishlistCount(count);
    loadWishlistItems();

    const updatedLikedItems = new Set<string>();
    [mockProperties, mockExperiences, mockServices].forEach((items) => {
      items.forEach((item) => {
        if (isInWishlist(item.id)) {
          updatedLikedItems.add(item.id);
        }
      });
    });

    setLikedItems(updatedLikedItems);
  }, [loadWishlistItems]);

  const initializeWishlistData = useCallback(async () => {
    await initializeWishlist();
    refreshWishlistState();
  }, [refreshWishlistState]);

  const handleHeartPress = useCallback(
    async (itemId: string, properties: Property[]) => {
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
            if (isNowInWishlist) newSet.add(itemId);
            else newSet.delete(itemId);
            return newSet;
          });

          refreshWishlistState();
          setRefreshKey((prev) => prev + 1);
          (globalThis as any).wishlistRefreshKey = Date.now();

          triggerHaptic();
        },
        (error: string) => {
          console.error("Wishlist error:", error);
        }
      );
    },
    [refreshWishlistState]
  );

  const removeFromWishlist = useCallback(
    async (id: string) => {
      const itemToRemove = wishlistItems.find((item) => item.id === id);
      if (!itemToRemove) {
        console.error("Item not found for removal:", id);
        return;
      }

      await onHeartClicked(
        itemToRemove,
        () => {
          refreshWishlistState();
          setRefreshKey((prev) => prev + 1);
          (globalThis as any).wishlistRefreshKey = Date.now();
          console.log(`${itemToRemove.title} removed from wishlist.`);
        },
        (error: string) => {
          console.error("Error removing from wishlist:", error);
        }
      );
    },
    [wishlistItems, refreshWishlistState]
  );

  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  useEffect(() => {
    initializeWishlistData();
  }, [initializeWishlistData]);

  useFocusEffect(
    useCallback(() => {
      const currentRefreshKey = (globalThis as any).wishlistRefreshKey || 0;
      if (currentRefreshKey > lastWishlistRefresh) {
        refreshWishlistState();
        setLastWishlistRefresh(currentRefreshKey);
      }
    }, [lastWishlistRefresh, refreshWishlistState])
  );

  return {
    likedItems,
    wishlistItems,
    wishlistCount,
    refreshKey,
    handleHeartPress,
    removeFromWishlist,
    initializeWishlistData,
    refreshWishlistState,
    triggerHaptic,
  };
};
