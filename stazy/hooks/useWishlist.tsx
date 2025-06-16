import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
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
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [wishlistCount, setWishlistCount] = useState(0);
  const [lastWishlistRefresh, setLastWishlistRefresh] = useState(0);

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
            if (isNowInWishlist) {
              newSet.add(itemId);
            } else {
              newSet.delete(itemId);
            }
            return newSet;
          });

          setWishlistCount(getWishlistCount());
          (globalThis as any).wishlistRefreshKey = Date.now();

          const message = isNowInWishlist
            ? `${item.title} added to wishlist!`
            : `${item.title} removed from wishlist!`;
          console.log(message);
        },
        (error: string) => {
          console.error("Wishlist error:", error);
        }
      );
    },
    []
  );

  useFocusEffect(
    useCallback(() => {
      const currentRefreshKey = (globalThis as any).wishlistRefreshKey || 0;
      if (currentRefreshKey > lastWishlistRefresh) {
        console.log("Refreshing wishlist state from other screen changes");
        refreshWishlistState();
        setLastWishlistRefresh(currentRefreshKey);
      }
    }, [lastWishlistRefresh, refreshWishlistState])
  );

  return {
    likedItems,
    wishlistCount,
    handleHeartPress,
    initializeWishlistData,
    refreshWishlistState,
  };
};
