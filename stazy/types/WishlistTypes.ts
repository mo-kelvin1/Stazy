// Import your interfaces from the original locations
import { Property } from "../types/Property";
import { Experience } from "../types/Experience";
import { Service } from "../types/Service";

// Union type for wishlist items
export type WishlistItem = (Property | Experience | Service) & {
  dateAdded?: Date;
  notes?: string;
  // Backend response fields
  id?: number;
  itemType?: string;
  entityId?: number;
  hostEmail?: string;
};