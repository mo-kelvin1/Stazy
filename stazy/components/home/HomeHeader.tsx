import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { homeStyles } from "../../constants/homeStyles";

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

const TABS = [
  { key: "Homes", title: "Homes", icon: "home" },
  { key: "Experiences", title: "Experiences", icon: "balloon" },
  { key: "Services", title: "Services", icon: "restaurant" },
];

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
  const inputRef = useRef<TextInput>(null);
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
        <View style={homeStyles.searchBar}>
          <Ionicons
            name="search"
            size={20}
            color="#717171"
            style={homeStyles.searchIcon}
          />
          <TextInput
            ref={inputRef}
            style={homeStyles.searchText}
            placeholder="Start your search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={onSearchSubmit}
            returnKeyType="search"
          />
        </View>

        {wishlistCount > 0 && (
          <TouchableOpacity
            style={homeStyles.wishlistButton}
            onPress={() => {
              router.push("/wishlist");
              console.log("Navigate to wishlist");
            }}
          >
            <Ionicons name="heart" size={16} color="white" />
            <Text style={{ color: "white", fontWeight: "bold", marginLeft: 4 }}>
              {wishlistCount}
            </Text>
          </TouchableOpacity>
        )}
      </Animated.View>

      <View style={homeStyles.tabContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              homeStyles.tab,
              activeTab === tab.key && homeStyles.activeTab,
            ]}
            onPress={() => handleTabPress(tab.key)}
          >
            <View style={homeStyles.tabWithBadge}>
              <Ionicons
                name={tab.icon as any}
                size={20}
                color={activeTab === tab.key ? "#222222" : "#717171"}
              />
            </View>
            <Text
              style={[
                homeStyles.tabText,
                activeTab === tab.key && homeStyles.activeTabText,
              ]}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );
};
