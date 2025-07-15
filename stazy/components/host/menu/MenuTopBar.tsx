import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface MenuTopBarProps {
  firstInitial: string;
  onNotificationsPress: () => void;
  onProfilePress: () => void;
}

const MenuTopBar = ({
  firstInitial,
  onNotificationsPress,
  onProfilePress,
}: MenuTopBarProps) => (
  <View style={styles.topBar}>
    <Text style={styles.menuTitle}>Menu</Text>
    <View style={styles.topBarIcons}>
      <TouchableOpacity
        style={styles.iconCircle}
        onPress={onNotificationsPress}
      >
        <Ionicons name="notifications-outline" size={22} color="#222" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconCircle} onPress={onProfilePress}>
        <Text style={styles.avatarText}>{firstInitial}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 8,
    backgroundColor: "#fff",
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
  },
  topBarIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});

export default MenuTopBar;
