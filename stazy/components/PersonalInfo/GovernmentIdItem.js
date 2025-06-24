import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const GovernmentIdItem = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.governmentIdItem} onPress={onPress}>
      <View style={styles.governmentIdLeft}>
        <Ionicons name="card-outline" size={24} color="#484848" />
        <View style={styles.governmentIdText}>
          <Text style={styles.governmentIdTitle}>Add your ID</Text>
          <Text style={styles.governmentIdSubtext}>
            We'll store your info securely
          </Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#B0B0B0" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  governmentIdItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  governmentIdLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  governmentIdText: {
    marginLeft: 15,
  },
  governmentIdTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#484848",
  },
  governmentIdSubtext: {
    fontSize: 14,
    color: "#B0B0B0",
    marginTop: 2,
  },
});

export default GovernmentIdItem;