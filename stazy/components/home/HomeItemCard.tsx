import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { HomeItem } from "../../hooks/useHomeData";
import { homeStyles } from "../../constants/homeStyles";

interface HomeItemCardProps {
  item: HomeItem;
  likedItems: Set<string>;
  onPress: (item: HomeItem) => void;
  onHeartPress: (itemId: string) => void;
}

export const HomeItemCard: React.FC<HomeItemCardProps> = ({
  item,
  likedItems,
  onPress,
  onHeartPress,
}) => {
  const firstImage = item.images?.[0];

  return (
    <TouchableOpacity
      style={homeStyles.propertyCard}
      onPress={() => {
        onPress(item);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }}
    >
      <View style={homeStyles.imageContainer}>
        {firstImage && (
          <Image
            source={{ uri: firstImage }}
            style={homeStyles.propertyImage}
          />
        )}
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
      </View>

      <View style={homeStyles.propertyInfo}>
        <Text style={homeStyles.propertyTitle}>{item.title}</Text>

        {item.type === "property" && (
          <>
            <View style={homeStyles.ratingContainer}>
              <Ionicons name="star" size={12} color="#007AFF" />
              <Text style={homeStyles.rating}>{item.rating}</Text>
            </View>
            <Text style={homeStyles.price}>
              ${item.price} for {item.nights} night{item.nights > 1 ? "s" : ""}
            </Text>
          </>
        )}

        {item.type === "experience" && (
          <>
            <Text style={homeStyles.price}>
              Hosted by {item.hostName ?? "Unknown"}
            </Text>
            <Text style={homeStyles.price}>From ${item.price}</Text>
          </>
        )}

        {item.type === "service" && (
          <>
            <Text style={homeStyles.price}>
              Service Provider: {item.provider}
            </Text>
            <Text style={homeStyles.price}>Cost: ${item.price}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};
