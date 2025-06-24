import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const InfoItem = ({ 
  label, 
  value, 
  keyName, 
  isEditable = true, 
  isEditing = false,
  onValueChange,
  placeholder
}) => {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      {isEditing && isEditable ? (
        <TextInput
          style={styles.infoInput}
          value={value}
          onChangeText={(text) => onValueChange(keyName, text)}
          placeholder={placeholder || label}
        />
      ) : (
        <Text style={styles.infoValue}>{value}</Text>
      )}
      {!isEditing && (
        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={20} color="#B0B0B0" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  infoLabel: {
    fontSize: 16,
    color: "#484848",
    width: 120,
  },
  infoValue: {
    fontSize: 16,
    color: "#484848",
    flex: 1,
  },
  infoInput: {
    fontSize: 16,
    color: "#484848",
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});

export default InfoItem;