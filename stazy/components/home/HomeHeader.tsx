import React, { useRef } from "react";
import { Animated } from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { homeStyles } from "../../constants/homeStyles";
import HomeSearchBar from "./HomeSearchBar";
import HomeTabBar from "./HomeTabBar";

interface HomeHeaderProps {
  headerHeight: Animated.AnimatedAddition<number>;
  searchBarOpacity: Animated.AnimatedAddition<number>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  wishlistCount: number;
  activeTab: string;
  onTabPress: (tab: string) => void;
  onSearchSubmit: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  headerHeight,
  searchBarOpacity,
  searchQuery,
  setSearchQuery,
  wishlistCount,
  activeTab,
  onTabPress,
  onSearchSubmit,
}) => {
  const router = useRouter();

  const handleTabPress = (tab: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onTabPress(tab);
  };

  return (
    <Animated.View style={[homeStyles.header, { height: headerHeight }]}>
      <Animated.View
        style={[homeStyles.searchContainer, { opacity: searchBarOpacity }]}
      >
        <HomeSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchSubmit={onSearchSubmit}
          wishlistCount={wishlistCount}
          onWishlistPress={() => router.push("/wishlist")}
        />
      </Animated.View>
      <HomeTabBar activeTab={activeTab} onTabPress={handleTabPress} />
    </Animated.View>
  );
};
