import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  Animated,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { Stack } from "expo-router";
import FadeInView from "../../components/cards/FadeInView";
import CategoryListingComponent from "../../components/cards/CategoryListingPage";
import { HomeHeader } from "../../components/home/HomeHeader";
import { CategorySection } from "../../components/home/CategorySection";
import { useWishlist } from "../../hooks/useWishlist";
import { homeStyles } from "../../constants/homeStyles";
import { mockExperiences } from "../../data/mockExperiences";
import { mockServices } from "../../data/mockServices";
import { Property } from "../../types/Property";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";

const tokenStore = new SimulatedTokenStore();

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("Homes");
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [propertiesError, setPropertiesError] = useState<string | null>(null);

  const {
    likedItems,
    wishlistCount,
    handleHeartPress,
    initializeWishlistData,
  } = useWishlist();

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

  useEffect(() => {
    initializeWishlistData();
  }, [initializeWishlistData]);

  useEffect(() => {
    const fetchProperties = async () => {
      setPropertiesLoading(true);
      setPropertiesError(null);
      try {
        const { createRefreshPropertiesAction } = await import(
          "../../context/actions/refreshProperties"
        );
        const refreshProperties = createRefreshPropertiesAction(tokenStore);
        const result = await refreshProperties();
        if (result.success && result.properties) {
          setProperties(result.properties);
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
  }, []);

  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== "") {
      console.log("Search Submitted:", searchQuery);
    }
  };

  // Get the appropriate data based on active tab
  const getCurrentData = () => {
    switch (activeTab) {
      case "Homes":
        return properties;
      case "Experiences":
        return mockExperiences;
      case "Services":
        return mockServices;
      default:
        return properties;
    }
  };

  // Categorize data based on active tab
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

  const handleTabPress = (tab: string) => {
    console.log("HomePage: Tab pressed:", tab);
    setActiveTab(tab);
  };

  const handleCategoryPress = (category: string) => {
    console.log("HomePage: Category pressed:", category);
    setSelectedCategory(category);
    setShowCategoryListing(true);
  };

  const handleBackFromCategoryListing = () => {
    setShowCategoryListing(false);
    setSelectedCategory("");
  };

  const onHeartPress = (itemId: string) => {
    const currentData = getCurrentData();
    handleHeartPress(itemId, currentData);
  };

  if (showCategoryListing) {
    const categorizedData = getCategorizedData();
    const categoryItems = categorizedData[selectedCategory] || [];
    return (
      <CategoryListingComponent
        category={selectedCategory}
        properties={categoryItems}
        onBackPress={handleBackFromCategoryListing}
        likedItems={likedItems}
        onHeartPress={onHeartPress}
      />
    );
  }

  const categorizedData = getCategorizedData();

  return (
    <SafeAreaView style={homeStyles.container}>
      <FadeInView style={homeStyles.FadeInView}>
        <Stack.Screen options={{ headerShown: false }} />
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        <HomeHeader
          headerHeight={headerHeight}
          searchBarOpacity={searchBarOpacity}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          wishlistCount={wishlistCount}
          activeTab={activeTab}
          onTabPress={handleTabPress}
          onSearchSubmit={handleSearchSubmit}
        />

        <Animated.ScrollView
          style={homeStyles.scrollView}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {loading || propertiesLoading ? (
            <View style={homeStyles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={{ marginTop: 10 }}>Loading...</Text>
            </View>
          ) : propertiesError ? (
            <View style={homeStyles.loadingContainer}>
              <Text style={{ color: "#FF385C" }}>{propertiesError}</Text>
            </View>
          ) : (
            Object.entries(categorizedData).map(([category, items]) => (
              <CategorySection
                key={category}
                category={category}
                items={items}
                likedItems={likedItems}
                onCategoryPress={handleCategoryPress}
                onHeartPress={onHeartPress}
              />
            ))
          )}
        </Animated.ScrollView>
      </FadeInView>
    </SafeAreaView>
  );
}
