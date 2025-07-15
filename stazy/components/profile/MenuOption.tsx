import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type MenuOptionProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
  showChevron?: boolean;
};

const MenuOption: React.FC<MenuOptionProps> = ({
  icon,
  title,
  onPress,
  showChevron = true,
}) => (
  <TouchableOpacity style={styles.menuOption} onPress={onPress}>
    <View style={styles.menuLeft}>
      <View style={styles.menuIconContainer}>
        <Ionicons name={icon} size={24} color="#484848" />
      </View>
      <Text style={styles.menuTitle}>{title}</Text>
    </View>
    {showChevron && (
      <Ionicons name="chevron-forward" size={20} color="#ADADAD" />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  menuOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIconContainer: {
    marginRight: 12,
    backgroundColor: "#F7F7F7",
    borderRadius: 16,
    padding: 6,
  },
  menuTitle: {
    fontSize: 16,
    color: "#222222",
    fontWeight: "500",
  },
});

export default MenuOption;
