import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileAvatar = ({ initials, name, onCameraPress }) => {
  return (
    <View style={styles.profileHeader}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <TouchableOpacity style={styles.cameraButton} onPress={onCameraPress}>
          <Ionicons name="camera" size={16} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.profileName}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    marginHorizontal: 16,
    flexDirection: 'column',
    borderRadius: 15,
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: 'white',
    marginBottom: 32,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#5A5A5A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
});

export default ProfileAvatar;