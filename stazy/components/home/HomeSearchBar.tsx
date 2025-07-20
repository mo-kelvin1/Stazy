import React, { useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HomeSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: () => void;
  wishlistCount: number;
  onWishlistPress: () => void;
}

const HomeSearchBar = ({
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  wishlistCount,
  onWishlistPress,
}: HomeSearchBarProps) => {
  const inputRef = useRef<TextInput>(null);
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <Ionicons
          name="search"
          size={20}
          color="#717171"
          style={styles.searchIcon}
        />
        <TextInput
          ref={inputRef}
          style={styles.searchText}
          placeholder="Start your search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={onSearchSubmit}
          returnKeyType="search"
        />
      </View>
      {wishlistCount > 0 && (
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={onWishlistPress}
        >
          <Ionicons name="heart" size={16} color="white" />
          <Text style={styles.wishlistText}>{wishlistCount}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchText: {
    flex: 1,
    fontSize: 16,
    color: "#222",
  },
  wishlistButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF385C",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: 10,
  },
  wishlistText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 4,
  },
});

export default HomeSearchBar;
