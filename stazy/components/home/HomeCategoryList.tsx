import React from "react";
import { View, StyleSheet } from "react-native";
import { CategorySection } from "./CategorySection";

interface HomeCategoryListProps {
  categorizedData: Record<string, any[]>;
  likedItems: Set<string>;
  onCategoryPress: (category: string) => void;
  onHeartPress: (item: any) => void;
  activeTab: string;
  pageName: string;
}

const HomeCategoryList = ({
  categorizedData,
  likedItems,
  onCategoryPress,
  onHeartPress,
  activeTab,
  pageName,
}: HomeCategoryListProps) => (
  <View style={styles.container}>
    {Object.entries(categorizedData).map(([category, items]) => (
      <CategorySection
        key={category}
        category={category}
        items={items}
        likedItems={likedItems}
        onCategoryPress={onCategoryPress}
        onHeartPress={onHeartPress}
        activeTab={activeTab}
        pageName={pageName}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeCategoryList;
