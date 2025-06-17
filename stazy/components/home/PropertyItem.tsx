import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Property } from "../../data/mockProperties";
import { homeStyles } from "../../constants/homeStyles";

interface PropertyItemProps {
  item: Property;
  likedItems: Set<string>;
  onPress: (item: Property) => void;
  onHeartPress: (itemId: string) => void;
}

export const PropertyItem: React.FC<PropertyItemProps> = ({
  item,
  likedItems,
  onPress,
  onHeartPress,
}) => {
  return (
    <TouchableOpacity
      style={homeStyles.propertyCard}
      onPress={() => {
        onPress(item);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }}
    >
      <View style={homeStyles.imageContainer}>
        <Image
          source={{ uri: item.image[0] }}
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
        <Text style={homeStyles.price}>
          ${item.price} for {item.nights} night{item.nights > 1 ? "s" : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
