import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ProfileCard = ({
  avatarLetter,
  firstName,
  status,
  onPress,
}: {
  avatarLetter: string;
  firstName: string;
  status: string;
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.profileCard}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{avatarLetter}</Text>
      </View>
      <Text style={styles.name}>{firstName}</Text>
      <Text style={styles.status}>{status}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: "white",
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: {
    color: "white",
    fontSize: 32,
    fontWeight: "600",
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    color: "#222222",
    marginBottom: 4,
  },
  status: {
    fontSize: 16,
    color: "#717171",
  },
});

export default ProfileCard;
