import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View, StyleSheet } from "react-native";

interface RenderPropertyContentProps {
  item: any;
}

export const renderPropertyContent = ({ item }: RenderPropertyContentProps) => {
  const prop = item as any;
  return (
    <>
      <View style={styles.propertyDetails}>
        <Text style={styles.sectionTitle}>Property Details</Text>
        <View style={styles.propertyDetailsRow}>
          <Text>Type: {prop.propertyType}</Text>
          <Text>Category: {prop.category}</Text>
          <Text>Bedrooms: {prop.bedrooms}</Text>
          <Text>Beds: {prop.beds}</Text>
          <Text>Bathrooms: {prop.bathrooms}</Text>
          <View style={styles.propertyDetailsRow}>
            <Text>Nights: {prop.nights}</Text>
          </View>
          <View style={styles.propertyDetailsRow}>
            <Ionicons name="star" size={24} color="black" />
            <Text>Rating: {prop.rating}</Text>
          </View>
          <View style={styles.propertyDetailsRow}>
            <Text>Price: {prop.price}</Text>
          </View>
          <View style={styles.propertyDetailsRow}>
            <Text>Min Guests: {prop.minGuests}</Text>
          </View>
          <View style={styles.propertyDetailsRow}>
            <Text>Max Guests: {prop.maxGuests}</Text>
          </View>
        </View>
      </View>
      <View style={styles.propertyDetails}>
        <Text style={styles.sectionTitle}>Amenities</Text>
        <Text>{prop.amenities.join("\n")}</Text>
      </View>
      <View style={styles.propertyDetails}>
        <Text style={styles.sectionTitle}>Highlights</Text>
        <Text>{prop.highlights.join("\n")}</Text>
      </View>
      <View style={styles.propertyDetails}>
        <Text style={styles.sectionTitle}>Host</Text>
        <Text>Host ID: {prop.hostId}</Text>
        <Text>Email: {prop.hostEmail}</Text>
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
    flexDirection: "column",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: 10,
  },
});
