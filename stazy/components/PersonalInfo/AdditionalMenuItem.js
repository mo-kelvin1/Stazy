import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AdditionalMenuItem = ({ icon, title, onPress }) => {
  return (
    <TouchableOpacity style={styles.additionalItem} onPress={onPress}>
      <View style={styles.additionalItemLeft}>
        <Ionicons name={icon} size={24} color="#484848" />
        <Text style={styles.additionalItemText}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#B0B0B0" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  additionalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  additionalItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  additionalItemText: {
    fontSize: 16,
    color: "#484848",
    marginLeft: 15,
  },
});

export default AdditionalMenuItem;