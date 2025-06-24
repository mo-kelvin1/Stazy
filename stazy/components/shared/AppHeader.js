import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AppHeader = ({ 
  title, 
  onBackPress, 
  rightComponent, 
  showBackButton = true 
}) => {
  return (
    <View style={styles.header}>
      {showBackButton ? (
        <TouchableOpacity onPress={onBackPress}>
          <Ionicons name="arrow-back" size={24} color="#484848" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 24 }} />
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      {rightComponent || <View style={{ width: 24 }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#484848",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default AppHeader;
