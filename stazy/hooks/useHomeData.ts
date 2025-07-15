import { useState, useRef, useEffect } from "react";
import { Animated } from "react-native";
import { Property } from "../types/Property";
import { Service } from "../types/Service";
import { Experience } from "../types/Experience";
import { SimulatedTokenStore } from "../services/SimulatedTokenStore";
import { useWishlist } from "../hooks/useWishlist";

const tokenStore = new SimulatedTokenStore();

export function useHomeData() {
  const [activeTab, setActiveTab] = useState("Homes");
  const [loading, setLoading] = useState(false);
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
  const [refreshKey, setRefreshKey] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        globalThis.tabRefreshKeys &&
        globalThis.tabRefreshKeys.home !== undefined
      ) {
        setRefreshKey(globalThis.tabRefreshKeys.home);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    initializeWishlistData();
  }, [refreshKey]);
  useEffect(() => {
    const fetchProperties = async () => {
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
    };
    fetchProperties();
  }, [checkWishlistStatusForItems]);
  useEffect(() => {
    const fetchServices = async () => {
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
    };
    fetchServices();
  }, [checkWishlistStatusForItems]);
  useEffect(() => {
    const fetchExperiences = async () => {
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
    };
    fetchExperiences();
  }, [checkWishlistStatusForItems]);
  const getCurrentData = () => {
    switch (activeTab) {
      case "Homes":
        return properties;
      case "Experiences":
        return experiences;
      case "Services":
        return services;
      default:
        return properties;
    }
  };
  const getCurrentLoading = () => {
    switch (activeTab) {
      case "Homes":
        return propertiesLoading;
      case "Experiences":
        return experiencesLoading;
      case "Services":
        return servicesLoading;
      default:
        return propertiesLoading;
    }
  };
  const getCurrentError = () => {
    switch (activeTab) {
      case "Homes":
        return propertiesError;
      case "Experiences":
        return experiencesError;
      case "Services":
        return servicesError;
      default:
        return propertiesError;
    }
  };
  const getCategorizedData = () => {
    const currentData = getCurrentData();
    return currentData.reduce((acc, item) => {
      const category = item.category || "Other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {} as Record<string, any[]>);
  };
  const onHeartPress = (item: Property | Experience | Service) => {
    handleHeartPress(item);
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
    refreshKey,
    setRefreshKey,
    getCurrentData,
    getCurrentLoading,
    getCurrentError,
    getCategorizedData,
  };
} 