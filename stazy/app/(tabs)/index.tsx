import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  Animated,
  Alert,
  View,
  Text,
} from "react-native";
import { router, Stack } from "expo-router";
import { Property } from "../../data/mockProperties";
import PropertyCard from "../../components/cards/PropertyCard";
import FadeInView from "../../components/cards/FadeInView";
import CategoryListingComponent from "../../components/cards/CategoryListingPage";
import { HomeHeader } from "../../components/home/HomeHeader";
import { CategorySection } from "../../components/home/CategorySection";
import { useHomeData, HomeItem } from "../../hooks/useHomeData";
import { useWishlist } from "../../hooks/UseWishlist";
import { homeStyles } from "../../constants/homeStyles";
import { HostProfile } from "@/data/hosts";
import HostProfileCard from "../screens/HostProfileCard";
export default function HomePage() {
  const {
    properties,
    loading,
    activeTab,
    setActiveTab,
    categorizedProperties,
  } = useHomeData();

  const {
    likedItems,
    wishlistCount,
    handleHeartPress,
    initializeWishlistData,
  } = useWishlist();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<HomeItem | null>(
    null
  );
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

  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== "") {
      console.log("Search Submitted:", searchQuery);
    }
  };

  const handleItemPress = (item: any) => {
    // Open modal for any HomeItem type
    setSelectedProperty(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProperty(null);
  };

  const handleTabPress = (tab: string) => {
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
    const propertyItems = properties.filter(
      (item): item is Property & { type: "property" } =>
        item.type === "property"
    );
    handleHeartPress(itemId, propertyItems);
  };

  if (showCategoryListing) {
    const categoryProperties = categorizedProperties[selectedCategory] || [];
    return (
      <CategoryListingComponent
        category={selectedCategory}
        items={categoryProperties}
        onBackPress={handleBackFromCategoryListing}
        likedItems={likedItems}
        onHeartPress={onHeartPress}
      />
    );
  }
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
          {loading ? (
            <View style={homeStyles.loadingContainer}>
              <Text>Loading...</Text>
            </View>
          ) : categorizedProperties &&
            Object.keys(categorizedProperties).length > 0 ? (
            Object.entries(categorizedProperties).map(([category, items]) => (
              <CategorySection
                key={category}
                category={category}
                items={items}
                likedItems={likedItems}
                onCategoryPress={handleCategoryPress}
                onItemPress={handleItemPress}
                onHeartPress={onHeartPress}
              />
            ))
          ) : (
            <View style={homeStyles.loadingContainer}>
              <Text>No properties available.</Text>
            </View>
          )}
        </Animated.ScrollView>

        <PropertyCard
          property={selectedProperty}
          isVisible={modalVisible}
          onClose={closeModal}
          likedItems={likedItems}
          onHeartPress={onHeartPress}
        />
      </FadeInView>
    </SafeAreaView>
  );
}
