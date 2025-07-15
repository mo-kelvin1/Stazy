import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MenuItem from "./MenuItem";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

interface MenuListProps {
  menuItems: Array<{
    label: string;
    icon: React.ReactNode;
    onPress: () => void;
  }>;
  onLogout: () => void;
}

const MenuList = ({ menuItems, onLogout }: MenuListProps) => (
  <>
    {menuItems.map((item) => (
      <MenuItem
        key={item.label}
        label={item.label}
        icon={item.icon}
        onPress={item.onPress}
      />
    ))}
    <View style={styles.divider} />
    <TouchableOpacity style={styles.menuItem} onPress={onLogout}>
      <MaterialIcons
        name="logout"
        size={24}
        color="#222"
        style={{ marginRight: 2 }}
      />
      <Text style={styles.menuItemText}>Log out</Text>
    </TouchableOpacity>
  </>
);

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 16,
    marginHorizontal: 24,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 24,
    paddingVertical: 18,
    backgroundColor: "#fff",
  },
  menuItemText: {
    fontSize: 16,
    color: "#222",
    marginLeft: 2,
  },
});

export default MenuList;
