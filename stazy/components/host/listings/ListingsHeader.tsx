import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ListingsHeaderProps {
  onSearch: () => void;
  onDocs: () => void;
  onAdd: () => void;
}

const ListingsHeader = ({ onSearch, onDocs, onAdd }: ListingsHeaderProps) => (
  <View style={styles.headerRow}>
    <Text style={styles.header}>Your listings</Text>
    <View style={styles.headerIcons}>
      <TouchableOpacity style={styles.iconButton} onPress={onSearch}>
        <Ionicons name="search" size={24} color="#222" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={onDocs}>
        <Ionicons name="document-text-outline" size={24} color="#222" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={onAdd}>
        <Ionicons name="add" size={24} color="#222" />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconButton: {
    backgroundColor: "#F5F5F5",
    borderRadius: 24,
    padding: 8,
    marginLeft: 8,
  },
});

export default ListingsHeader;
