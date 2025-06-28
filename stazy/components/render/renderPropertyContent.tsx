import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View, StyleSheet } from "react-native";

interface RenderPropertyContentProps {
  item: any;
}

export const renderPropertyContent = ({ item }: RenderPropertyContentProps) => {
  const prop = item as any;

  // Helper function to render property value
  const renderPropertyValue = (value: any): string => {
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  };

  // Get all properties of the item
  const allProperties = Object.keys(prop);

  // Filter out properties we don't want to display
  const propertiesToDisplay = allProperties.filter((propertyName) => {
    const lowerPropertyName = propertyName.toLowerCase();
    return (
      !lowerPropertyName.includes("image") &&
      !lowerPropertyName.includes("id") &&
      !lowerPropertyName.includes("hostid")
    );
  });

  return (
    <>
      <View style={styles.propertyDetails}>
        <Text style={styles.sectionTitle}>All Properties</Text>
        {propertiesToDisplay.map((propertyName, index) => (
          <View key={index} style={styles.propertyDetailsRow}>
            <Text style={styles.propertyLabel}>
              {propertyName.charAt(0).toUpperCase() + propertyName.slice(1)}:
            </Text>
            <Text style={styles.propertyValue}>
              {renderPropertyValue(prop[propertyName])}
            </Text>
          </View>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  propertyDetails: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    marginBottom: 10,
    paddingLeft: 10,
    marginLeft: 10,
    paddingRight: 10,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
    color: "#222",
  },
  propertyDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
    flexWrap: "wrap",
  },
  propertyLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    flex: 1,
    marginRight: 8,
  },
  propertyValue: {
    fontSize: 14,
    color: "#666",
    flex: 2,
    textAlign: "right",
  },
});
