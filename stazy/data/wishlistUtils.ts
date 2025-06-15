// utils/wishlistUtils.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Property } from './mockProperties';
import { Experience } from './mockExperiences';
import { Service } from './mockServices';

// Union type for wishlist items
export type WishlistItem = (Property | Experience | Service) & {
  dateAdded: Date;
  notes?: string;
};

const WISHLIST_STORAGE_KEY = '@wishlist_items';

// In-memory storage for immediate access
let wishlistCache: WishlistItem[] = [];

// Initialize wishlist from storage
export const initializeWishlist = async (): Promise<void> => {
  try {
    const storedWishlist = await AsyncStorage.getItem(WISHLIST_STORAGE_KEY);
    if (storedWishlist) {
      wishlistCache = JSON.parse(storedWishlist).map((item: any) => ({
        ...item,
        dateAdded: new Date(item.dateAdded),
      }));
    }
  } catch (error) {
    console.error('Error loading wishlist from storage:', error);
  }
};

// Save wishlist to storage
const saveWishlistToStorage = async (wishlist: WishlistItem[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  } catch (error) {
    console.error('Error saving wishlist to storage:', error);
  }
};

// Add item to wishlist
export const addToWishlist = async (item: Property | Experience | Service): Promise<boolean> => {
  try {
    const wishlistItem: WishlistItem = {
      ...item,
      dateAdded: new Date(),
    };
    
    // Check if item already exists
    const existingIndex = wishlistCache.findIndex(existing => existing.id === item.id);
    
    if (existingIndex === -1) {
      wishlistCache.push(wishlistItem);
      await saveWishlistToStorage(wishlistCache);
      return true; // Added successfully
    }
    
    return false; // Already exists
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return false;
  }
};

// Remove item from wishlist
export const removeFromWishlist = async (id: string): Promise<boolean> => {
  try {
    const initialLength = wishlistCache.length;
    wishlistCache = wishlistCache.filter(item => item.id !== id);
    
    if (wishlistCache.length < initialLength) {
      await saveWishlistToStorage(wishlistCache);
      return true; // Removed successfully
    }
    
    return false; // Item not found
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return false;
  }
};

// Check if item is in wishlist
export const isInWishlist = (id: string): boolean => {
  return wishlistCache.some(item => item.id === id);
};

// Get all wishlist items
export const getWishlistItems = (): WishlistItem[] => {
  return [...wishlistCache];
};

// Get wishlist count
export const getWishlistCount = (): number => {
  return wishlistCache.length;
};

// Toggle wishlist status (add if not present, remove if present)
export const toggleWishlist = async (item: Property | Experience | Service): Promise<boolean> => {
  const isCurrentlyInWishlist = isInWishlist(item.id);
  
  if (isCurrentlyInWishlist) {
    await removeFromWishlist(item.id);
    return false; // Removed from wishlist
  } else {
    await addToWishlist(item);
    return true; // Added to wishlist
  }
};

// Heart click handler function for your index page
export const onHeartClicked = async (
  item: Property | Experience | Service,
  onSuccess?: (isInWishlist: boolean) => void,
  onError?: (error: string) => void
): Promise<void> => {
  try {
    const isNowInWishlist = await toggleWishlist(item);
    
    if (onSuccess) {
      onSuccess(isNowInWishlist);
    }
  } catch (error) {
    console.error('Error handling heart click:', error);
    
    if (onError) {
      onError('Failed to update wishlist');
    }
  }
};

// Clear entire wishlist
export const clearWishlist = async (): Promise<void> => {
  try {
    wishlistCache = [];
    await AsyncStorage.removeItem(WISHLIST_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing wishlist:', error);
  }
};

// Get items by category
export const getWishlistItemsByCategory = (category: string): WishlistItem[] => {
  return wishlistCache.filter(item => item.category === category);
};

// Helper function to get item type
export const getItemType = (item: WishlistItem): 'property' | 'experience' | 'service' => {
  if ('image' in item && Array.isArray(item.image)) {
    return 'property';
  } else if ('isOriginal' in item || 'isPopular' in item) {
    return 'experience';
  } else {
    return 'service';
  }
};

// Helper function to get item image
export const getItemImage = (item: WishlistItem): string => {
  if ('image' in item) {
    return Array.isArray(item.image) ? item.image[0] : item.image;
  }
  return '';
};