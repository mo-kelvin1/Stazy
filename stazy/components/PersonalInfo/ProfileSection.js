import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileSection = ({ firstName, lastName, onCameraPress, profileImageUri }) => {
  const initials = `${firstName[0]}${lastName[0]}`;

  return (
    <View style={styles.profileSection}>
      <View style={styles.profileImageContainer}>
        <View style={styles.profileImage}>
          {profileImageUri ? (
            <Image source={{ uri: profileImageUri }} style={styles.image} />
          ) : (
            <Text style={styles.profileImageText}>{initials}</Text>
          )}
        </View>
        <TouchableOpacity style={styles.cameraIcon} onPress={onCameraPress}>
          <Ionicons name="camera" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <Text style={styles.profileName}>{firstName} {lastName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileSection: {
    alignItems: "center",
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
  },
  profileImageText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "600",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#484848",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "600",
    color: "#484848",
    marginBottom: 5,
  },
  profileSubtext: {
    fontSize: 16,
    color: "#484848",
    textDecorationLine: "underline",
  },
});

export default ProfileSection;
