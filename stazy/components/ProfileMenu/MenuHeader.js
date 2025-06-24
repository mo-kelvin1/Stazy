import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../shared/AppHeader";

const MenuHeader = ({ onBackPress, onNotificationPress }) => {
  const rightComponent = (
    <View style={styles.headerRight}>
      <TouchableOpacity 
        style={styles.notificationIcon} 
        onPress={onNotificationPress}
      >
        <Ionicons name="notifications-outline" size={24} color="#484848" />
      </TouchableOpacity>
    </View>
  );

  return (
    <AppHeader
      title="Menu"
      onBackPress={onBackPress}
      rightComponent={rightComponent}
    />
  );
};

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationIcon: {
    marginRight: 15,
  },
});

export default MenuHeader;
