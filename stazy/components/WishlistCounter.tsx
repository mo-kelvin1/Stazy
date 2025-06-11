import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const [wishlistCount, setWishlistCount] = useState(0);
const WishlistCounter = () => {
  return (
    <View>
      <TouchableOpacity
        style={styles.wishlistButton}
        onPress={() => {
          // Navigate to wishlist screen
          router.push("/(tabs)/wishlists");
          console.log("Navigate to wishlist");
        }}
      >
        <Ionicons name="heart" size={16} color="white" />
        <Text style={{ color: "white", fontWeight: "bold", marginLeft: 4 }}>
          {wishlistCount}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default WishlistCounter;

const styles = StyleSheet.create({
  wishlistButton: {
    position: "absolute",
    top: 15,
    right: 20,
    backgroundColor: "#FF385C",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
  },
});
