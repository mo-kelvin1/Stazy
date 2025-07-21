import React from "react";
import { TouchableOpacity, Image, Text, StyleSheet, View } from "react-native";

interface ListingsCardProps {
  item: any;
  onPress: () => void;
  onLongPress: () => void;
}

const ListingsCard = ({ item, onPress, onLongPress }: ListingsCardProps) => (
  <TouchableOpacity
    style={styles.card}
    onPress={onPress}
    onLongPress={onLongPress}
  >
    <Image
      source={{
        uri: item.images && item.images.length > 0 ? item.images[0] : undefined,
      }}
      style={styles.image}
    />
    <Text style={styles.title} numberOfLines={1}>
      {item.title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#E5E5E7",
    borderRadius: 24,
    marginBottom: 32,
    padding: 0,
    alignItems: "flex-start",
    minHeight: 260,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginBottom: 8,
    backgroundColor: "#ccc",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginTop: 8,
    marginLeft: 16,
    marginBottom: 16,
  },
});

export default ListingsCard;
