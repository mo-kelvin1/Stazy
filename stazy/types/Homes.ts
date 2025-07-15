import { Property } from "./Property";

export interface HomeState {
  properties: Property[];
  loading: boolean;
  activeTab: string;
  likedItems: Set<string>;
  modalVisible: boolean;
  selectedProperty: Property | null;
  showCategoryListing: boolean;
  selectedCategory: string;
  searchQuery: string;
}

export interface TabConfig {
  key: string;
  title: string;
  icon: string;
}