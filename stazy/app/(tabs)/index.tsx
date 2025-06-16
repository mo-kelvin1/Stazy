import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  Animated,
  Alert,
  View,
  Text,
} from "react-native";
import { Stack } from "expo-router";
import { Property } from "../../data/mockProperties";
import PropertyCard from "../../components/cards/PropertyCard";
import FadeInView from "../../components/cards/FadeInView";
import CategoryListingComponent from "../../components/cards/CategoryListingPage";
import { HomeHeader } from "../../components/home/HomeHeader";
import { CategorySection } from "../../components/home/CategorySection";
import { useHomeData } from "../../hooks/useHomeData";
import { useWishlist } from "../../hooks/useWishlist";
import { homeStyles } from "../../constants/homeStyles";

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
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
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

  const handleItemPress = (item: Property) => {
    console.log("HomePage: Property card clicked for:", item.id);
    setSelectedProperty(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    console.log("HomePage: Closing modal");
    setModalVisible(false);
    setSelectedProperty(null);
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
    handleHeartPress(itemId, properties);
  };

  if (showCategoryListing) {
    const categoryProperties = categorizedProperties[selectedCategory] || [];
    return (
      <CategoryListingComponent
        category={selectedCategory}
        properties={categoryProperties}
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
          ) : (
            Object.entries(categorizedProperties).map(([category, items]) => (
              <CategorySection
                key={category}
                category={category}
                items={items as Property[]}
                likedItems={likedItems}
                onCategoryPress={handleCategoryPress}
                onItemPress={handleItemPress}
                onHeartPress={onHeartPress}
              />
            ))
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
