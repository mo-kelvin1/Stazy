import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { WishlistItem } from '../types/WishlistTypes';
import {
  getWishlistItems,
  onHeartClicked,
} from '../data/wishlistUtils';
import React from 'react';

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // Load wishlist items from the existing wishlist utility
  const loadWishlistItems = () => {
    const items = getWishlistItems();
    console.log("Loaded wishlist items:", items);
    setWishlistItems(items);
  };

  useEffect(() => {
    loadWishlistItems();
  }, []);

  // Add focus listener to reload wishlist when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      loadWishlistItems();
    }, [])
  );

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

        // Store the refresh key globally
        global.wishlistRefreshKey = Date.now();
      },
      (error: string) => {
        console.error("Error removing from wishlist:", error);
      }
    );
  };

  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return {
    wishlistItems,
    loadWishlistItems,
    removeFromWishlist,
    triggerHaptic,
  };
};