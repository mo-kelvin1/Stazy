import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { WishlistItem } from "../../types/WishlistTypes";
import WishlistItemComponent from "./WishlistItemComponent";
import WishlistEmptyState from "./WishlistEmptyState";

interface WishlistItemsListProps {
  filteredItems: WishlistItem[];
  searchText: string;
  onRemove: (entityId: number, itemType: string) => void;
  onItemClick: (item: WishlistItem) => void;
  onExplorePress: () => void;
}

const WishlistItemsList: React.FC<WishlistItemsListProps> = ({
  filteredItems,
  searchText,
  onRemove,
  onItemClick,
  onExplorePress,
}) => {
  return (
    <ScrollView style={styles.wishlistContainer}>
      {filteredItems.length > 0 ? (
        filteredItems.map((item: WishlistItem) =>
          item.entityId !== undefined && item.itemType ? (
            <WishlistItemComponent
              key={item.id}
              item={item}
              onRemove={() =>
                onRemove(item.entityId as number, item.itemType as string)
              }
              onItemClick={() => onItemClick(item)}
            />
          ) : null
        )
      ) : (
        <WishlistEmptyState
          searchText={searchText}
          onExplorePress={onExplorePress}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wishlistContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default WishlistItemsList;
