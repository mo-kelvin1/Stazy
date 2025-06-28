import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { homeStyles } from "../../constants/homeStyles";
import { router } from "expo-router";

interface PropertyItemProps {
  item: any;
  likedItems: Set<string>;
  onHeartPress: (itemId: string) => void;
  activeTab: string;
  pageName: string;
}

export const PropertyItem: React.FC<PropertyItemProps> = ({
  item,
  likedItems,
  onHeartPress,
  activeTab,
  pageName,
}) => {
  const handlePress = () => {
    router.push({
      pathname: "/render/[renderItem]",
      params: {
        renderItem: item.id,
        pageName: pageName,
        activeTab: activeTab,
      },
    });
  };

  const priceText =
    "$" +
    item.price +
    (item.nights !== undefined
      ? " for " + item.nights + " night" + (item.nights > 1 ? "s" : "")
      : item.duration !== undefined
      ? " for " + item.duration + " hour" + (item.duration > 1 ? "s" : "")
      : "");

  return (
    <TouchableOpacity style={homeStyles.propertyCard} onPress={handlePress}>
      <View style={homeStyles.imageContainer}>
        <Image
          source={{
            uri: item.images
              ? item.images[0]
              : item.image
              ? item.image[0]
              : undefined,
          }}
          style={homeStyles.propertyImage}
        />
        <TouchableOpacity
          style={homeStyles.heartIcon}
          onPress={() => onHeartPress(item.id)}
        >
          <Ionicons
            name={likedItems.has(item.id) ? "heart" : "heart-outline"}
            size={24}
            color={likedItems.has(item.id) ? "#FF385C" : "white"}
          />
        </TouchableOpacity>
        {item.isGuestFavorite && (
          <View style={homeStyles.guestFavoriteTag}>
            <Text style={homeStyles.guestFavoriteText}>Guest favourite</Text>
          </View>
        )}
      </View>
      <View style={homeStyles.propertyInfo}>
        <Text style={homeStyles.propertyTitle}>{item.title}</Text>
        <View style={homeStyles.ratingContainer}>
          <Ionicons name="star" size={12} color="#007AFF" />
          <Text style={homeStyles.rating}>{item.rating}</Text>
        </View>
        <Text style={homeStyles.price}>{priceText}</Text>
      </View>
    </TouchableOpacity>
  );
};
