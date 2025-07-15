import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FadeInView from "../../components/cards/FadeInView";

import WishlistHeader from "../../components/wishlist/WishlistHeader";
import WishlistSearchBar from "../../components/wishlist/WishlistSearchBar";
import WishlistLoadingState from "../../components/wishlist/WishlistLoadingState";
import WishlistItemsList from "../../components/wishlist/WishlistItemsList";
import WishlistBottomActions from "../../components/wishlist/WishlistBottomActions";
import WishlistPropertyModal from "../../components/wishlist/WishlistPropertyModal";

import { useWishlistScreenData } from "../../hooks/useWishlistScreenData";

export default function WishlistScreen() {
  const {
    searchText,
    setSearchText,
    wishlistItems,
    loading,
    selectedProperty,
    modalVisible,
    filteredItems,
    handleItemClick,
    closeModal,
    handleSharePress,
    handlePlanTripPress,
    handleExplorePress,
    handleRemove,
  } = useWishlistScreenData();

  return (
    <SafeAreaView style={styles.container}>
      <FadeInView style={styles.FadeInView}>
        <WishlistHeader itemCount={wishlistItems.length} />

        <WishlistSearchBar
          searchText={searchText}
          onSearchTextChange={setSearchText}
        />

        {loading ? (
          <WishlistLoadingState />
        ) : (
          <WishlistItemsList
            filteredItems={filteredItems}
            searchText={searchText}
            onRemove={handleRemove}
            onItemClick={handleItemClick}
            onExplorePress={handleExplorePress}
          />
        )}

        <WishlistBottomActions
          onSharePress={handleSharePress}
          onPlanTripPress={handlePlanTripPress}
        />

        {selectedProperty && (
          <WishlistPropertyModal
            visible={modalVisible}
            onClose={closeModal}
            propertyId={selectedProperty.id}
          />
        )}
      </FadeInView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  FadeInView: {
    flex: 1,
  },
});
