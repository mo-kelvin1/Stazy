import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProfileItem from './ProfileItem';

const ProfileSection = ({ 
  title, 
  items, 
  isEditing, 
  onFieldChange,
  showComingSoon = false 
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
        {items.map((item) => (
          <ProfileItem
            key={item.field}
            label={item.label}
            value={item.value}
            field={item.field}
            isEditing={isEditing}
            onChangeText={onFieldChange}
            keyboardType={item.keyboardType}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 15,
    backgroundColor: 'white',
    paddingVertical: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
    marginLeft: 16,
  },
});

export default ProfileSection;