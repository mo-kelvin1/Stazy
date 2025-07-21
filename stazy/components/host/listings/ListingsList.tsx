import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ListingsCard from "./ListingsCard";

interface ListingsListProps {
  data: any[];
  onItemPress: (item: any) => void;
  onItemLongPress: (item: any) => void;
  keyExtractor: (item: any) => string;
}

const ListingsList = ({
  data,
  onItemPress,
  onItemLongPress,
  keyExtractor,
}: ListingsListProps) => (
  <FlatList
    data={data}
    renderItem={({ item }) => (
      <ListingsCard
        item={item}
        onPress={() => onItemPress(item)}
        onLongPress={() => onItemLongPress(item)}
      />
    )}
    keyExtractor={keyExtractor}
    contentContainerStyle={styles.listContent}
  />
);

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});

export default ListingsList;
