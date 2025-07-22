// utils/wishlistUtils.ts
import { SimulatedTokenStore } from '../services/SimulatedTokenStore';
import { Property } from '../types/Property';
import { Experience } from '../types/Experience';
import { Service } from '../types/Service';

// Union type for wishlist items
export type WishlistItem = (Property | Experience | Service) & {
  dateAdded?: Date;
  notes?: string;
};

const tokenStore = new SimulatedTokenStore();

// Initialize wishlist from backend
export const initializeWishlist = async (): Promise<void> => {
  // This is now handled by the backend, no local initialization needed
  console.log('Wishlist initialized with backend');
};

// Add item to wishlist via backend
export const addToWishlist = async (item: Property | Experience | Service): Promise<boolean> => {
  try {
    const token = await tokenStore.getToken();
    if (!token) {
      throw new Error('User not authenticated');
    }

    const itemType = getItemType(item).toUpperCase();
    
    const response = await fetch('http://10.30.22.161:8080/api/wishlist/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        entityId: item.id,
        itemType: itemType,
        notes: '',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add to wishlist');
    }

    return true;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return false;
  }
};

// Remove item from wishlist by entity ID (for toggling from home page)
export const removeFromWishlistByEntityId = async (entityId: string, itemType: string): Promise<boolean> => {
  try {
    const token = await tokenStore.getToken();
    if (!token) {
      throw new Error('User not authenticated');
    }
    
    const response = await fetch(`http://10.30.22.161:8080/api/wishlist/remove?entityId=${entityId}&itemType=${itemType.toUpperCase()}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to remove from wishlist');
    }

    return true;
  } catch (error) {
    console.error('Error removing from wishlist by entity ID:', error);
    return false;
  }
};

// Remove item from wishlist by wishlist entry ID (for wishlist page)
export const removeFromWishlist = async (wishlistId: string): Promise<boolean> => {
  try {
    const token = await tokenStore.getToken();
    if (!token) {
      throw new Error('User not authenticated');
    }

    // We need to determine the item type from the wishlist items
    const wishlistItems = await getWishlistItems();
    const item = wishlistItems.find(item => item.id === wishlistId);
    
    if (!item) {
      throw new Error('Item not found in wishlist');
    }

    // The backend response has entityId (the actual property/service/experience ID)
    // and itemType from the backend response
    const entityId = (item as any).entityId;
    const itemType = (item as any).itemType || getItemType(item).toUpperCase();
    
    if (!entityId) {
      throw new Error('Entity ID not found for wishlist item');
    }
    
    const response = await fetch(`http://10.30.22.161:8080/api/wishlist/remove?entityId=${entityId}&itemType=${itemType}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to remove from wishlist');
    }

    return true;
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return false;
  }
};

// Check if item is in wishlist via backend
export const isInWishlist = async (id: string, itemType: string): Promise<boolean> => {
  try {
    const token = await tokenStore.getToken();
    if (!token) {
      return false;
    }

    const response = await fetch(`http://10.30.22.161:8080/api/wishlist/check?entityId=${id}&itemType=${itemType.toUpperCase()}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.data || false;
  } catch (error) {
    console.error('Error checking wishlist status:', error);
    return false;
  }
};

// Get all wishlist items from backend
export const getWishlistItems = async (): Promise<WishlistItem[]> => {
  try {
    const token = await tokenStore.getToken();
    if (!token) {
      return [];
    }

    const response = await fetch('http://10.30.22.161:8080/api/wishlist/items', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch wishlist items');
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching wishlist items:', error);
    return [];
  }
};

// Get wishlist count from backend
export const getWishlistCount = async (): Promise<number> => {
  try {
    const token = await tokenStore.getToken();
    if (!token) {
      return 0;
    }

    const response = await fetch('http://10.30.22.161:8080/api/wishlist/count', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return 0;
    }

    const data = await response.json();
    return data.data || 0;
  } catch (error) {
    console.error('Error fetching wishlist count:', error);
    return 0;
  }
};

// Toggle wishlist status (add if not present, remove if present)
export const toggleWishlist = async (item: Property | Experience | Service): Promise<boolean> => {
  const itemType = getItemType(item);
  const isCurrentlyInWishlist = await isInWishlist(item.id, itemType);
  
  if (isCurrentlyInWishlist) {
    await removeFromWishlistByEntityId(item.id, itemType);
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
    const wishlistItems = await getWishlistItems();
    for (const item of wishlistItems) {
      await removeFromWishlist(item.id);
    }
  } catch (error) {
    console.error('Error clearing wishlist:', error);
  }
};

// Helper function to determine item type
export const getItemType = (item: Property | Experience | Service): string => {
  if ('propertyType' in item) {
    return 'property';
  } else if ('serviceType' in item) {
    return 'service';
  } else if ('experienceType' in item) {
    return 'experience';
  }
  return 'property'; // default
};