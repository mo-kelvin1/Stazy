import { useState, useRef, useEffect, useCallback } from "react";
import { Animated } from "react-native";
import { Property } from "../types/Property";
import { Service } from "../types/Service";
import { Experience } from "../types/Experience";
import { SimulatedTokenStore } from "../services/SimulatedTokenStore";
import { useWishlist } from "../hooks/useWishlist";
const tokenStore = new SimulatedTokenStore();

export function useHomeData() {
  const [activeTab, setActiveTab] = useState("home");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [propertiesError, setPropertiesError] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState<string | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [experiencesLoading, setExperiencesLoading] = useState(true);
  const [experiencesError, setExperiencesError] = useState<string | null>(null);
  const [showCategoryListing, setShowCategoryListing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [showingSearchResults, setShowingSearchResults] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [180, 80],
    extrapolate: "clamp",
  });
  const searchBarOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const {
    likedItems,
    wishlistCount,
    handleHeartPress,
    initializeWishlistData,
    checkWishlistStatusForItems,
  } = useWishlist();

  const fetchProperties = useCallback(async () => {
    setPropertiesLoading(true);
    setPropertiesError(null);
    try {
      const { createRefreshPropertiesAction } = await import(
        "../context/actions/refreshProperties"
      );
      const refreshProperties = createRefreshPropertiesAction(tokenStore);
      const result = await refreshProperties();
      if (result.success && result.properties) {
        setProperties(result.properties);
        await checkWishlistStatusForItems(result.properties);
      } else {
        setPropertiesError(result.message || "Failed to fetch properties");
      }
    } catch (err: any) {
      setPropertiesError(err.message || "Failed to fetch properties");
    } finally {
      setPropertiesLoading(false);
    }
  }, [checkWishlistStatusForItems]);

  const fetchServices = useCallback(async () => {
    setServicesLoading(true);
    setServicesError(null);
    try {
      const { createRefreshServicesAction } = await import(
        "../context/actions/refreshServices"
      );
      const refreshServices = createRefreshServicesAction(tokenStore);
      const result = await refreshServices();
      if (result.success && result.services) {
        setServices(result.services);
        await checkWishlistStatusForItems(result.services);
      } else {
        setServicesError(result.message || "Failed to fetch services");
      }
    } catch (err: any) {
      setServicesError(err.message || "Failed to fetch services");
    } finally {
      setServicesLoading(false);
    }
  }, [checkWishlistStatusForItems]);

  const fetchExperiences = useCallback(async () => {
    setExperiencesLoading(true);
    setExperiencesError(null);
    try {
      const { createRefreshExperiencesAction } = await import(
        "../context/actions/refreshExperiences"
      );
      const refreshExperiences = createRefreshExperiencesAction(tokenStore);
      const result = await refreshExperiences();
      if (result.success && result.experiences) {
        setExperiences(result.experiences);
        await checkWishlistStatusForItems(result.experiences);
      } else {
        setExperiencesError(result.message || "Failed to fetch experiences");
      }
    } catch (err: any) {
      setExperiencesError(err.message || "Failed to fetch experiences");
    } finally {
      setExperiencesLoading(false);
    }
  }, [checkWishlistStatusForItems]);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    await Promise.all([
      fetchProperties(),
      fetchServices(),
      fetchExperiences(),
    ]);
    setLoading(false);
  }, [fetchProperties, fetchServices, fetchExperiences]);

  useEffect(() => {
    initializeWishlistData();
    fetchAllData();
  }, [fetchAllData, initializeWishlistData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAllData();
    setRefreshing(false);
  }, [fetchAllData]);

  // Re-run search when activeTab changes and a search is being shown
  useEffect(() => {
    if (showingSearchResults && searchQuery.trim() !== "") {
      searchItems(searchQuery.trim());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const getCurrentData = () => {
    switch (activeTab) {
      case "home":
        return properties;
      case "experience":
        return experiences;
      case "service":
        return services;
      default:
        return properties;
    }
  };
  const getCurrentLoading = () => {
    switch (activeTab) {
      case "home":
        return propertiesLoading;
      case "experience":
        return experiencesLoading;
      case "service":
        return servicesLoading;
      default:
        return propertiesLoading;
    }
  };
  const getCurrentError = () => {
    switch (activeTab) {
      case "home":
        return propertiesError;
      case "experience":
        return experiencesError;
      case "service":
        return servicesError;
      default:
        return propertiesError;
    }
  };
  const getCategorizedData = () => {
    const currentData = getCurrentData();
    const grouped = currentData.reduce((acc, item) => {
      const category = item.category || "Other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {} as Record<string, any[]>);
    // Shuffle the category order
    const categoryKeys = Object.keys(grouped);
    for (let i = categoryKeys.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [categoryKeys[i], categoryKeys[j]] = [categoryKeys[j], categoryKeys[i]];
    }
    // Build a new object with shuffled keys
    const shuffled = {} as Record<string, any[]>;
    for (const key of categoryKeys) {
      shuffled[key] = grouped[key];
    }
    return shuffled;
  };
  const onHeartPress = (item: Property | Experience | Service) => {
    handleHeartPress(item);
  };

  const searchEndpoints: Record<string, string> = {
    home: "/api/properties/search/name",
    service: "/api/service-offers/search/name",
    experience: "/api/experiences/search/name",
  };

  const searchItems = async (query: string) => {
    setSearching(true);
    setShowingSearchResults(false);
    setSearchResults([]);
    try {
      const token = await tokenStore.getToken();
      const endpoint = searchEndpoints[activeTab];
      if (!endpoint) throw new Error("Invalid tab for search");
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL || "http://10.132.119.88:8080"}${endpoint}?name=${encodeURIComponent(query)}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch search results");
      const data = await res.json();
      setSearchResults(data);
      setShowingSearchResults(true);
    } catch (err) {
      setSearchResults([]);
      setShowingSearchResults(true);
    } finally {
      setSearching(false);
    }
  };

  const clearSearchResults = () => {
    setSearchResults([]);
    setShowingSearchResults(false);
  };

  return {
    activeTab,
    setActiveTab,
    loading,
    properties,
    propertiesLoading,
    propertiesError,
    services,
    servicesLoading,
    servicesError,
    experiences,
    experiencesLoading,
    experiencesError,
    showCategoryListing,
    setShowCategoryListing,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    scrollY,
    headerHeight,
    searchBarOpacity,
    likedItems,
    wishlistCount,
    handleHeartPress,
    initializeWishlistData,
    checkWishlistStatusForItems,
    getCurrentData,
    getCurrentLoading,
    getCurrentError,
    getCategorizedData,
    searchResults,
    searching,
    showingSearchResults,
    searchItems,
    clearSearchResults,
    refreshing,
    onRefresh,
  };
} 