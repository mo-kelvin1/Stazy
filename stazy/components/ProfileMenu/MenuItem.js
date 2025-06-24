import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MenuItem = ({ item, showChevron = true }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={item.onPress}>
      <View style={styles.menuItemLeft}>
        <Ionicons
          name={item.icon}
          size={24}
          color="#484848"
        />
        <Text style={styles.menuItemText}>{item.title}</Text>
      </View>
      {showChevron && (
        <Ionicons name="chevron-forward" size={20} color="#B0B0B0" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 16,
    color: "#484848",
    marginLeft: 15,
    fontWeight: "400",
  },
});

export default MenuItem;
