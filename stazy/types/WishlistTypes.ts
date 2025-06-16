// Import your interfaces from the original locations
import { Property } from "../data/mockProperties";
import { Experience } from "../data/mockExperiences";
import { Service } from "../data/mockServices";

// Union type for wishlist items
export type WishlistItem = (Property | Experience | Service) & {
  dateAdded?: Date;
  notes?: string;
};