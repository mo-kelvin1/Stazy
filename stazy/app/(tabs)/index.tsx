import React from "react";
import {
  SafeAreaView,
  StatusBar,
  Animated,
  Platform,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Stack } from "expo-router";
import FadeInView from "../../components/cards/FadeInView";
import CategoryListingComponent from "../../components/cards/CategoryListingPage";
import { HomeHeader } from "../../components/home/HomeHeader";
import { homeStyles } from "../../constants/homeStyles";
import HomeLoading from "../../components/home/HomeLoading";
import HomeError from "../../components/home/HomeError";
import HomeCategoryList from "../../components/home/HomeCategoryList";
import { useHomeData } from "../../hooks/useHomeData";

export default function HomePage() {
  const {
    activeTab,
    setActiveTab,
    loading,
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
    getCurrentLoading,
    getCurrentError,
    getCategorizedData,
    searchResults,
    searching,
    showingSearchResults,
    searchItems,
    clearSearchResults,
  } = useHomeData();

  const handleTabPress = (tab: string) => setActiveTab(tab);
  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
    setShowCategoryListing(true);
  };
  const handleBackFromCategoryListing = () => {
    setShowCategoryListing(false);
    setSelectedCategory("");
  };
  const onHeartPress = (item: any) => {
    handleHeartPress(item);
  };
  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== "") {
      searchItems(searchQuery.trim());
    }
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
        activeTab={activeTab}
        pageName="index"
      />
    );
  }
  const height = StatusBar.currentHeight || 0;
  const final_height = height + 30;
  const categorizedData = getCategorizedData();
  const currentLoading = getCurrentLoading();
  const currentError = getCurrentError();

  return (
    <SafeAreaView
      style={[
        homeStyles.container,
        Platform.OS === "android" && { paddingTop: final_height },
      ]}
    >
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
        {showingSearchResults ? (
          <View style={{ flex: 1, padding: 16 }}>
            <TouchableOpacity
              onPress={clearSearchResults}
              style={{ alignSelf: "flex-end", marginBottom: 8 }}
            >
              <Text style={{ color: "#007AFF", fontWeight: "bold" }}>
                Clear Search
              </Text>
            </TouchableOpacity>
            {searching ? (
              <ActivityIndicator
                size="large"
                color="#007AFF"
                style={{ marginTop: 32 }}
              />
            ) : searchResults.length === 0 ? (
              <Text
                style={{ textAlign: "center", marginTop: 32, color: "#888" }}
              >
                No results found.
              </Text>
            ) : (
              <HomeCategoryList
                categorizedData={{ Search: searchResults }}
                likedItems={likedItems}
                onCategoryPress={handleCategoryPress}
                onHeartPress={onHeartPress}
                activeTab={activeTab}
                pageName="index"
              />
            )}
          </View>
        ) : (
          <Animated.ScrollView
            style={homeStyles.scrollView}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          >
            {loading || currentLoading ? (
              <HomeLoading />
            ) : currentError ? (
              <HomeError message={currentError} />
            ) : (
              <HomeCategoryList
                categorizedData={categorizedData}
                likedItems={likedItems}
                onCategoryPress={handleCategoryPress}
                onHeartPress={onHeartPress}
                activeTab={activeTab}
                pageName="index"
              />
            )}
          </Animated.ScrollView>
        )}
      </FadeInView>
    </SafeAreaView>
  );
}
