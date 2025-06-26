import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileItem = ({ 
  label, 
  value, 
  field, 
  isEditing, 
  onChangeText, 
  keyboardType = 'default' 
}) => {
  return (
    <View style={styles.profileItem}>
      <Text style={styles.profileLabel}>{label}</Text>
      <View style={styles.profileValueContainer}>
        {isEditing ? (
          <TextInput
            style={styles.profileInput}
            value={value || ''}
            onChangeText={(text) => onChangeText(field, text)}
            keyboardType={keyboardType}
            multiline={field === 'address'}
            placeholder={`Enter ${label.toLowerCase()}`}
            placeholderTextColor="#C7C7CC"
          />
        ) : (
          <Text style={styles.profileValue}>
            {value || 'Not provided'}
          </Text>
        )}
        <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileItem: {
    borderRadius: 10,
    marginBottom: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 16,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  profileLabel: {
    fontSize: 17,
    color: '#000',
    marginBottom: 4,
  },
  profileValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileValue: {
    fontSize: 17,
    color: '#8E8E93',
    flex: 1,
  },
  profileInput: {
    fontSize: 17,
    color: '#000',
    flex: 1,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#007AFF',
  },
});

export default ProfileItem;