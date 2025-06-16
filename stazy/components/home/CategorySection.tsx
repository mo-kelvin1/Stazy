import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Property } from "../../data/mockProperties";
import { PropertyItem } from "./PropertyItem";
import { homeStyles } from "../../constants/homeStyles";

interface CategorySectionProps {
  category: string;
  items: Property[];
  likedItems: Set<string>;
  onCategoryPress: (category: string) => void;
  onItemPress: (item: Property) => void;
  onHeartPress: (itemId: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  items,
  likedItems,
  onCategoryPress,
  onItemPress,
  onHeartPress,
}) => {
  const renderProperty = ({ item }: { item: Property }) => (
    <PropertyItem
      item={item}
      likedItems={likedItems}
      onPress={onItemPress}
      onHeartPress={onHeartPress}
    />
  );

  return (
    <View key={category} style={homeStyles.categoryContainer}>
      <TouchableOpacity
        style={homeStyles.categoryHeader}
        onPress={() => {
          onCategoryPress(category);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
      >
        <Text style={homeStyles.categoryTitle}>{category}</Text>
        <Ionicons name="chevron-forward" size={20} color="#222222" />
      </TouchableOpacity>
      <FlatList
        data={items.slice(0, 8)}
        renderItem={renderProperty}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={homeStyles.horizontalList}
      />
    </View>
  );
};
