import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { use, useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

interface Props {
  listings: any[];
  category: string;
}

const Listings = ({ listings: items, category }: Props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);
  const renderRow: ListRenderItem<any> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <Text>Go there</Text>
    </Link>
  );
  return (
    <View style={styles.container}>
      <FlatList
        renderItem={renderRow}
        ref={listRef}
        data={loading ? [] : items}
      />
      <Text>{category}</Text>
    </View>
  );
};

export default Listings;

const styles = StyleSheet.create({
  container: {
    marginTop: 190,
    margin: 10,
    flex: 1,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
